import React from "react";
import { LayoutPrimary } from "components/PageTemplates/LayoutPrimary";
import { useHistory } from "react-router";

const StripeConfirm: React.FC = () => {
  const history = useHistory();

  return (
    <LayoutPrimary
      showBackButton={true}
      hideFooter={true}
      onClickBackHandler={() => {
        history.replace("/home");
      }}
    />
  );
};

export default StripeConfirm;
