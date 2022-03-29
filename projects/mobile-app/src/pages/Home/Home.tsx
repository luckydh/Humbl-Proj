import React from "react";
import "./styles.scss";

import ConsumerHome from "components/HomePage/ConsumerHomePage";

import MerchantPayHome from "components/HomePage/MerchantHomePage";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";

const Home: React.FC = () => {
  const { currentAccount } = useGetCurrentAccount();

  if (!currentAccount) {
    return null;
  }
  return (
    <div className="flex flex-1 align-center flex-col flew-grow">
      <div className="flex flex-grow flex-col">
        {currentAccount.isMerchant ? <MerchantPayHome currentAccount={currentAccount} /> : <ConsumerHome />}
      </div>
    </div>
  );
};

export default Home;
