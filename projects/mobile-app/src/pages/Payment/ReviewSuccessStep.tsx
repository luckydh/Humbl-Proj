import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProfileLayout } from "components/PageTemplates/ProfileLayout";
import { HomeIcon } from "assets/svgs/HomeIcon";
import CheckMark from "components/CheckMark";
import { useCurrentAccountHomePath } from "hooks/useCurrentAccountHomePath";

export const ReviewSuccessStep: React.FC = () => {
  const { t } = useTranslation();
  const homePath = useCurrentAccountHomePath();
  return (
    <ProfileLayout showBackButton={false}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center flex-col relative w-full mt-12">
          <CheckMark noBackground />
          <div className="flex-1 flex flex-col flex-grow justify-center text-center text-white mt-12">
            <h1 className="font-semibold text-center text-2xl mt-10 text-white px-12">
              {t("payment-page.success.thanks-for-your-review")}
            </h1>
          </div>
        </div>
        <Link to={homePath} className="border-2 border-white border-solid rounded-full self-center my-6">
          <HomeIcon className="w-12 h-12 text-white fill-current" />
        </Link>
      </div>
    </ProfileLayout>
  );
};

export default ReviewSuccessStep;
