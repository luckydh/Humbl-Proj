import React, { ReactElement } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ProfileAvatar } from "components/Avatar/Avatar";
import { ProfileLayout } from "components/PageTemplates/ProfileLayout";
import { AccountType } from "generated/graphql";
import { Button } from "components/Button/Button";
import { useTranslation } from "react-i18next";

type ProfileViewMerchantProps = {
  account: AccountType;
};

const ProfileViewMerchant = ({ account }: ProfileViewMerchantProps): ReactElement => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  return (
    <ProfileLayout>
      <div className="flex flex-grow justify-between flex-col pt-20 overflow-y-auto">
        <ProfileAvatar
          size="large"
          username={account.userName}
          src={account.image}
          name={account.displayName}
          street={account.merchantProfileDetails?.address?.street}
          city={account.city}
          region={account.merchantProfileDetails?.address?.region}
          country={account.merchantProfileDetails?.country?.name}
          postal={account.merchantProfileDetails?.address?.postal}
          rating={account.averageRating}
          totalRatings={account.reviews?.pageInfo?.totalCount}
        />
        <div className="leading-4 flex-none text-white items-center relative flex-col my-8 text-center">
          {!account.merchantProfileDetails?.acceptsPayments && (
            <div className="text-md leading-4 flex-none text-white flex items-center relative flex-col mb-4 ">
              {t("profile-view-merchant-page.text.this-merchant-is-not-yet-accepting-payments")}
            </div>
          )}
          {!account.merchantProfileDetails?.acceptsPayments && (
            <Button isDisabled={true} type="button">
              {t("page-profile-view-merchant.button.pay-merchant")}
            </Button>
          )}
          {account.merchantProfileDetails?.acceptsPayments && (
            <Link to={`${url}/pay`}>
              <Button type="button">{t("page-profile-view-merchant.button.pay-merchant")}</Button>
            </Link>
          )}
          {account.creationMethod === "MERCHANT_IMPORT" && (
            <div className="mt-8 w-full">
              <p className="leading-4 text-white text-center">
                {t("profile-view-merchant-page.text.learn-more-about-merchant-account-updates")} -{" "}
                <a
                  className="text-blue-dark font-semibold underline"
                  href="https://humblpay.zendesk.com/hc/en-us/requests/new?ticket_form_id=360001649631"
                  target="_blank"
                  rel="noreferrer">
                  {t("profile-view-merchant-page.link.account-updates.text")}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileViewMerchant;
