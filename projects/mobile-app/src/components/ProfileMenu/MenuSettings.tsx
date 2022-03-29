import { IonIcon } from "@ionic/react";
import { chevronForwardIcon, documentIcon, padlockIcon, questionIcon } from "assets/icons";
import { LanguagePicker } from "components/Language/LanguagePicker";
import { Logout } from "components/Logout/Logout";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";

const MenuSettings = (): React.ReactElement => {
  const { currentAccount } = useGetCurrentAccount();
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const { t } = useTranslation();
  const options = [
    {
      text: "component-profile-menu.text.security-and-login",
      link: "/update-security",
      icon: padlockIcon,
    },
    {
      text: "component-profile-menu.text.legal-and-terms",
      link: {
        pathname: "https://www.humblpay.com/legal-docs/mobile-pay-terms-and-conditions",
      },
      target: "_blank",
      icon: documentIcon,
    },
    {
      text: "component-profile-menu.text.merchant-agreement",
      link: { pathname: "http://www.humblpay.com/legal-docs/merchant-agreement" },
      target: "_blank",
      icon: documentIcon,
      hide: !currentAccount?.isMerchant,
    },
    {
      text: "component-profile-menu.text.fees",
      link: { pathname: "http://www.humblpay.com/legal-docs/fee-structure" },
      target: "_blank",
      icon: documentIcon,
      hide: !currentAccount?.isMerchant,
    },

    {
      text: "component-profile-menu.text.faq",
      link: { pathname: "https://www.humblpay.com/mobile-pay-faqs" },
      target: "_blank",
      icon: questionIcon,
    },
  ];

  return (
    <LayoutModal title={t("pages-settings.title.my-settings")}>
      <div>
        {options.map((option, index) => {
          if (option.hide) return null;
          return (
            <Link
              key={index}
              to={option.link}
              className="justify-between text-white group flex items-center px-0 py-2 text-lg font-medium rounded-md"
              target={option.target || "_self"}>
              <div className="flex items-center align-middle">
                <IonIcon className="text-white mr-4 h-6 w-6" icon={option.icon} />
                <h2 className="text-white">{t(option.text)}</h2>
              </div>
              <IonIcon className="text-xl text-white" icon={chevronForwardIcon} />
            </Link>
          );
        })}
      </div>
      <Logout />
      <div
        className=" absolute bottom-4 mx-auto flex content-center inset-x-0 "
        onClick={(e) => {
          setIsLanguagePickerOpen(true);
          e.stopPropagation();
        }}>
        <LanguagePicker
          isOpen={isLanguagePickerOpen}
          onClose={() => {
            setIsLanguagePickerOpen(false);
          }}
        />
      </div>
    </LayoutModal>
  );
};
export default MenuSettings;
