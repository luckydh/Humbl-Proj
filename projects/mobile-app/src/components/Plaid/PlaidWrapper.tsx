import React, { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  PlaidLinkOptionsWithLinkToken,
  usePlaidLink,
  PlaidLinkError,
} from "react-plaid-link";
import { ApolloError } from "@apollo/client";
import { PaymentMethodType, useCreateAchPaymentMethodMutation, useGetPlaidTokenQuery } from "generated/graphql";
import { captureException } from "ErrorLogger";
import { setStoredPlaidToken } from "state/cache";
import { useExpiringCacheFetchPolicy } from "hooks/useExpiringCacheQuery";
import { useLayerManager } from "components/Layers/hooks";
import { useTranslation } from "react-i18next";
import { ConfirmationDrawer } from "components/ConfirmationDrawer/ConfirmationDrawer";

const PLAID_ENABLED_PRODUCTS = ["auth", "identity"];

export interface PlaidWrapperProps {
  onSuccess?: (paymentMethod: PaymentMethodType) => void;
  onExit?: () => void;
  onProcessing?: (isProcessing: boolean) => void;
  onError?: (error: ApolloError) => void;
  oAuthOptions?: { redirectUri?: string; token?: string };
  children: JSX.Element;
}

export const PlaidWrapper: React.FC<PlaidWrapperProps> = ({
  children,
  onSuccess,
  onExit,
  onProcessing,
  onError,
  oAuthOptions,
}) => {
  const layerManager = useLayerManager();

  const plaidFetchPolicy = useExpiringCacheFetchPolicy("PlaidToken");

  const { data: plaidQuery } = useGetPlaidTokenQuery({
    fetchPolicy: plaidFetchPolicy,
    skip: !!oAuthOptions,
  });

  const token = plaidQuery?.getToken ?? oAuthOptions?.token;

  const handleOauth = () => {
    layerManager.open("plaidOAuth", {
      closeExistingPlaid: onExit,
      plaidOptions: {
        onSuccess,
        onExit,
        onProcessing,
        onError,
      },
    });
  };

  if (!token) {
    // disabled style since plaid cannot be initiated without token
    return <div className="disabled">{children}</div>;
  }

  return (
    <Plaid
      token={token}
      onAddPaymentSuccess={onSuccess}
      onExit={onExit}
      onOAuth={handleOauth}
      redirectUri={oAuthOptions?.redirectUri}>
      {children}
    </Plaid>
  );
};

interface PlaidProps {
  onAddPaymentSuccess?: (paymentMethod: PaymentMethodType) => void;
  onError?: (err: ApolloError) => void;
  onExit?: () => void;
  children: JSX.Element;
  redirectUri?: string;
  onOAuth?: () => void;
}

export const Plaid: React.FC<PlaidProps & { token: string }> = ({
  onAddPaymentSuccess,
  onExit,
  onError,
  onOAuth,
  token,
  children,
  redirectUri,
}) => {
  const { t } = useTranslation();
  const [createACHPaymentMethod] = useCreateAchPaymentMethodMutation();
  const [showLimitationsDrawer, setShowLimitationsDrawer] = useState(false);

  const handleExit = (error: null | PlaidLinkError) => {
    if (error) {
      const sentryError = new Error();
      sentryError.name = `Plaid | ${error.error_code}`;
      sentryError.message = error.error_message;
      captureException(sentryError, error as unknown as Record<string, string>);
    }

    onExit?.();
  };

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (publicToken, metadata) => {
      try {
        const account = metadata.accounts[0];

        const { data } = await createACHPaymentMethod({
          variables: {
            publicToken,
            plaidBankId: account.id,
          },
        });

        const paymentMethod = data?.createACHPayMethod!;

        // TODO: ach remove this when BE properly sends back display value.
        if (!paymentMethod.cardBrand?.display) {
          paymentMethod.cardBrand!.display = metadata.institution?.name;
        }

        onAddPaymentSuccess?.(paymentMethod);
      } catch (error) {
        onError?.(error as ApolloError);
      } finally {
        onExit?.();
      }
    },
    [createACHPaymentMethod, onAddPaymentSuccess, onError, onExit]
  );

  const plaidLinkOptions: PlaidLinkOptionsWithLinkToken & PlaidLinkOptions = {
    product: PLAID_ENABLED_PRODUCTS,
    token,
    onSuccess,
    onExit: handleExit,
    onEvent: (event) => {
      if (event === "OPEN_OAUTH") {
        onOAuth?.();
      }
    },
  };

  const isPlaidOauth = !!redirectUri;

  if (isPlaidOauth) {
    // Add receivedRedirectUri config for handling OAuth redirect
    plaidLinkOptions.receivedRedirectUri = redirectUri;
  }

  const { open, ready } = usePlaidLink(plaidLinkOptions);

  useEffect(() => {
    const reinitializePlaidLink = ready && isPlaidOauth;

    if (reinitializePlaidLink) {
      open();
    } else if (ready) {
      setStoredPlaidToken(token);
    }
  }, [ready, isPlaidOauth, open, token]);

  const handleClick = () => {
    setShowLimitationsDrawer(true);
  };

  const handleConfirm = () => {
    setShowLimitationsDrawer(false);
    open();
  };

  const clonedChild = React.cloneElement(children, {
    onClick: handleClick,
  });

  return (
    <>
      {clonedChild}
      <ConfirmationDrawer
        title={t("payment-limitations.drawer.ach.title")}
        subtitle={t("payment-limitations.drawer.ach.subtitle")}
        open={showLimitationsDrawer}
        onConfirm={handleConfirm}
        ariaLabel="BANKLIMITATIONS"
        onClose={() => setShowLimitationsDrawer(false)}
      />
    </>
  );
};
