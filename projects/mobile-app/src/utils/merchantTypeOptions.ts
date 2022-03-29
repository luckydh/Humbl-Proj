import { useTranslation } from "react-i18next";

const useMerchantTypeOptions = () => {
  const { t } = useTranslation();
  return [
    { value: "RESTAURANTS", label: t("merchant-dropdown.typeof.restaurants") },
    { value: "SHOPPING", label: t("merchant-dropdown.typeof.shopping") },
    { value: "BEAUTY_SPAS", label: t("merchant-dropdown.typeof.beauty-and-spa") },
    { value: "AUTOMOTIVE", label: t("merchant-dropdown.typeof.automotive") },
    { value: "HOME_SERVICES", label: t("merchant-dropdown.typeof.home-services") },
    { value: "HOTELS_TRAVEL", label: t("merchant-dropdown.typeof.hotels-travel") },
    { value: "ARTS_ENTERTAINMENT", label: t("merchant-dropdown.typeof.arts-and-entertainment") },
    { value: "HEALTH_MEDICAL", label: t("merchant-dropdown.typeof.health-and-medical") },
    { value: "PUBLIC_SERVICES", label: t("merchant-dropdown.typeof.public-services") },
    { value: "PETS", label: t("merchant-dropdown.typeof.pets") },
    { value: "OTHER", label: t("merchant-dropdown.typeof.other") },
  ];
};

export default useMerchantTypeOptions;
