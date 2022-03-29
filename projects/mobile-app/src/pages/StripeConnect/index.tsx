import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { useGetAvailablePaymentProvidersQuery } from "generated/graphql";
import ContentLoader from "react-content-loader";

export const TransactionItemSkeleton: React.FC = () => {
  const classes = cx(
    "bg-blue shadow-sm mt-8 flex w-full align-middle items-center my-4 border border-white rounded-md p-6"
  );
  return (
    <div className={classes}>
      <ContentLoader
        animate={true}
        speed={2}
        width={400}
        height={30}
        viewBox="0 0 400 30"
        backgroundColor="#4cb4dd"
        foregroundColor="#127aa3">
        <rect x="0" y="0" rx="3" ry="3" width="280" height="38" />
      </ContentLoader>
    </div>
  );
};

const StripeConnect: React.FC = () => {
  const { t } = useTranslation();
  const STRIPE_CLIENT = process.env.REACT_APP_STRIPE_CLIENT_ID;
  function connectToStripe() {
    window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${STRIPE_CLIENT}&scope=read_write`;
  }

  const classes = cx(
    "bg-blue shadow-sm mt-8 flex w-full align-middle items-center my-4 border border-white rounded-md p-6"
  );

  const { loading, data } = useGetAvailablePaymentProvidersQuery({
    fetchPolicy: "cache-and-network",
  });

  const [paymentProviders, setPaymentProviders] = useState<any>({});
  useEffect(() => {
    const paymentProviderDictionary: any = {};

    data?.availableProviders?.forEach((providerItem) => {
      paymentProviderDictionary[providerItem.provider || ""] = providerItem;
    });
    setPaymentProviders(paymentProviderDictionary);
  }, [data]);
  // Create a dictionary from returned results

  return (
    <>
      <div className="mt-8 flex items-center justify-center flex-shink-0">
        <p className="leading-tight">{t("pages-accept-cards.stripe-details")}</p>
      </div>

      {loading && (
        <div>
          <TransactionItemSkeleton />
          <TransactionItemSkeleton />
        </div>
      )}
      {paymentProviders?.stripe?.available && (
        <div className={classes}>
          <div>
            <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" width="60" height="25">
              <title>Stripe logo</title>
              <path
                fill="#fff"
                d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-none ml-auto">
            <button onClick={connectToStripe} className="rounded-full w-40 bg-blue-dark block h-8 text-white text-xs">
              Connect with Stripe
            </button>
          </div>
        </div>
      )}
      {paymentProviders?.braintree && (
        <div className={classes}>
          <div>
            <img src="https://www.braintreepayments.com/images/b_logo-white.svg" width={90} alt="Braintree Logo" />
          </div>
          <div className="flex-none ml-auto">
            {paymentProviders.braintree.available && (
              <img
                width={200}
                alt="Connect to Braintree"
                src="https://s3-us-west-1.amazonaws.com/bt-partner-assets/connect-braintree.png"
              />
            )}
            {!paymentProviders.braintree.available && (
              <button disabled={true} className="rounded-full w-40 bg-blue-light block h-8 text-white text-xs">
                Coming Soon
              </button>
            )}
          </div>
        </div>
      )}
      {paymentProviders?.humblWallet && (
        <div className={`${classes} shadow-lg`}>
          <div>
            <div className="w-12">
              <svg width="90" viewBox="0 0 143 31" xmlns="http://www.w3.org/2000/svg">
                <g fill="#FFF" fillRule="nonzero">
                  <path d="M18.418 1v11.484H7.151V1H0v29.794h7.151V18.335h11.267v12.459h7.259V1zM37.594 1v17.118a7.15 7.15 0 001.3 4.55 4.659 4.659 0 003.9 1.517 5.092 5.092 0 003.9-1.517 6.934 6.934 0 001.3-4.55V1h7.151v17.118c.09 2.45-.47 4.88-1.625 7.042a11.376 11.376 0 01-4.442 4.334 13.543 13.543 0 01-6.392 1.406c-2.18.06-4.339-.423-6.284-1.408a10.4 10.4 0 01-4.334-4.334 14.518 14.518 0 01-1.517-7.148V1h7.043zM93.39 1.217v29.577h-7.151V12.376l-6.392 18.527h-6.175L67.28 12.376v18.527h-7.151V1.217h8.776l8.017 20.585 7.907-20.585zM120.475 18.118a6.934 6.934 0 011.625 4.55 7.476 7.476 0 01-2.492 5.959 11.159 11.159 0 01-7.259 2.167H98.482V.998h13.543c2.5-.159 4.98.528 7.042 1.95a6.934 6.934 0 012.492 5.634 6.609 6.609 0 01-1.408 4.442 6.934 6.934 0 01-3.792 2.384 8.884 8.884 0 014.117 2.709m-14.952-4.875h4.767c2.492 0 3.792-1.083 3.792-3.25s-1.3-3.25-3.792-3.25h-4.658l-.109 6.5zm9.209 8.451a2.817 2.817 0 00-1.083-2.492 4.225 4.225 0 00-3.034-.867h-5.092v6.609h5.092c2.709 0 4.117-1.083 4.117-3.25M133.044 25.268h9.642v5.525h-16.793V1h7.151zM140.519 1a2.167 2.167 0 110 4.334 2.167 2.167 0 010-4.334m0 4.117a1.95 1.95 0 10-1.95-1.95 1.95 1.95 0 001.95 1.95m-.758-3.25h.975c.542 0 .867.217.867.758a.65.65 0 01-.65.65l.758 1.192h-.217l-.758-1.192h-.65v1.192h-.325v-2.6zm.217 1.192h.65c.433 0 .65-.108.65-.433s-.217-.542-.65-.542h-.65v.975z" />
                </g>
              </svg>
            </div>
          </div>
          <div className="flex-none ml-auto">
            <button disabled={true} className="rounded-full w-40 bg-blue-light block h-8 text-white text-xs">
              Coming Soon
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StripeConnect;
