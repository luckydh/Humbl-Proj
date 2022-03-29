import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useGetAccountByIdQuery } from "generated/graphql";
import { Loading } from "components/Loading";
import { MerchantPayment } from "./MerchantPayment";

interface RouteParams {
  id: string;
}

const Payment: React.FC = () => {
  const { id } = useParams<RouteParams>();

  const { loading, data } = useGetAccountByIdQuery({
    variables: { id },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  if (loading) {
    return (
      <div className="flex w-full mt-52 justify-center items-center">
        <Loading loading={loading} />
      </div>
    );
  }

  if (data?.accountById?.isMerchant) {
    return <MerchantPayment account={data?.accountById!} />;
  }

  // We're not allowing non-merchant payments yet
  // so we redirect the user back to the profile
  return <Redirect to={`/account/${id}`} />;
};

export default Payment;
