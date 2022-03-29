import React, { useState, useMemo } from "react";
import { WarningModal } from "components/WarningModal/WarningModal";
import { Icon } from "components/Icon/Icon";
import { ApolloError } from "@apollo/client";
import { getErrorMessage } from "graphql/humblGraphqlError";

type HookReturn = {
  warningModal: JSX.Element;
  setWarningModalError: (error: ApolloError) => void;
};
export const useWarningModal = (): HookReturn => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const setWarningModalError = (error: ApolloError) => {
    const message = getErrorMessage(error);
    setErrorMessage(message);
  };

  const warningModal = useMemo(
    () => (
      <WarningModal
        show={!!errorMessage}
        variant="fixed"
        title={<Icon name="bold_danger" color="red" size="md" />}
        message={errorMessage}
        ariaLabel="WARNING_MODAL"
      />
    ),
    [errorMessage]
  );

  return { warningModal, setWarningModalError };
};
