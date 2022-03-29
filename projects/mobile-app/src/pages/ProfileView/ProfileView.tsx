import Button from "components/Button/Button";
import React, { ReactElement } from "react";
import { ProfileAvatar } from "../../components/Avatar/Avatar";
import { ProfileLayout } from "../../components/PageTemplates/ProfileLayout";
import { AccountType } from "../../generated/graphql";
import { useTranslation } from "react-i18next";

type ProfileIndividualViewProps = {
  account: AccountType;
};

const ProfileIndividualView = ({ account }: ProfileIndividualViewProps): ReactElement => {
  const { t } = useTranslation();
  return (
    <ProfileLayout>
      <div className="flex flex-col flex-grow justify-center pt-24 overflow-y-auto">
        <div className="-mt-16">
          <ProfileAvatar
            size="large"
            username={account.userName}
            src={account.image || ""}
            name={account.displayName || ""}
          />
        </div>
        <div>
          <div className="text-white text-center flex items-center relative flex-col mt-2 mb-2 overlap">
            {t("profile-view.text.curious-about-what-youll-be-able-to-do-with-user-profile")}
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={() => { window.location.href = "https://www.humblpay.com/mobile-pay/peer-to-peer" }}>
              {t("profile-view.button.learn-more")}
            </Button>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileIndividualView;
