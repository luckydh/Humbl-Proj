import React, { useState, useEffect } from "react";
import { LayerComponentProps } from "components/Layers/common";
import { PlaidWrapper } from "components/Plaid/PlaidWrapper";
import { getAndClearStoredPlaidToken } from "state/cache";
import { useLocation, useHistory } from "react-router";
import { Loading } from "components/Loading";

/**
 * * Since the Plaid OAuth is a bit tricky to follow.
 * ? Frak has generously created diagram for the OAuth flow on Figma to help visualizing it.
 * * Figma Link: https://www.figma.com/file/zP6LsulgfXel3LStK9jcuW/Plaid-OAuth-Flow?node-id=0%3A1
 */

const PLAID_TRIGGER_TIMEOUT = 1000;

export const PlaidOAuth: React.FC<LayerComponentProps<"plaidOAuth">> = ({
  closeExistingPlaid,
  plaidOptions,
  onClose,
}) => {
  const [token, setToken] = useState<string>();
  const { state: redirectUri } = useLocation<string>();
  const history = useHistory();

  useEffect(() => {
    if (token || !redirectUri) {
      return;
    }

    async function getToken() {
      const storedToken = await getAndClearStoredPlaidToken();
      setToken(storedToken);
    }

    closeExistingPlaid?.();
    setTimeout(getToken, PLAID_TRIGGER_TIMEOUT);
  }, [redirectUri, closeExistingPlaid, token]);

  /**
   * this handle processing is a hack to trigger to close out the layer but still let the processing happen.
   * we likely want to be able to tap into that a little more cleanly
   */
  const handleProcessing = (isProcessing: boolean) => {
    if (!isProcessing || !plaidOptions) {
      return;
    }

    plaidOptions.onProcessing?.(isProcessing);
    history.replace({ ...history.location, state: undefined });
    onClose?.();
  };

  const wrapperPlaidOptions = {
    ...plaidOptions,
    onProcessing: handleProcessing,
    onExit() {
      onClose?.();
    },
  };

  return (
    <div className="flex h-full w-full flex-grow justify-center items-center">
      <PlaidWrapper {...wrapperPlaidOptions} oAuthOptions={{ token, redirectUri }}>
        <Loading loading />
      </PlaidWrapper>
    </div>
  );
};

export default PlaidOAuth;
