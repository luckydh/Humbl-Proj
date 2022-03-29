import {
  bankIcon,
  cardIcon,
  cartIcon,
  gearIcon,
  handCreditCardIcon,
  investIcon,
  moneyIcon,
  plusIcon,
  profileIcon,
  qrIcon,
  shoppingBagIcon,
  CryptoWalletIcon,
} from "assets/icons";

import { AccountType } from "generated/graphql";
import { buildPath } from "utils/routes";
import { MenuOptionType } from "./MenuOptionType";

export const useMenuItems = (account: AccountType): MenuOptionType[] => {
  const individualOptions: MenuOptionType[] = [
    {
      text: "component-profile-menu.text.my-profile",
      link: buildPath("profileUpdate"),
      icon: profileIcon,
    },
    {
      text: "component-profile-menu.text.my-qr-code",
      link: "",
      action: "setShowQRModal",
      icon: qrIcon,
    },
    {
      text: "component-profile-menu.text.payment-methods",
      link: buildPath("paymentMethods"),
      icon: cardIcon,
    },
    {
      text: "component-profile-menu.text.transactions",
      link: buildPath("transactions"),
      icon: moneyIcon,
    },
    {
      text: "component-profile-menu.text.crypto-wallet",
      link: buildPath("cryptoWallet"),
      icon: CryptoWalletIcon,
    },
    {
      text: "component-profile-menu.text.blocks-etx",
      link: buildPath("offersBlocks"),
      icon: investIcon,
    },
    {
      text: "component-profile-menu.text.become-merchant",
      link: buildPath("merchantCreate"),
      icon: cartIcon,
    },
    {
      text: "component-profile-menu.text.settings",
      link: buildPath("settings"),
      icon: gearIcon,
    },
  ];

  const merchantOptions: MenuOptionType[] = [
    {
      text: "component-profile-menu.text.my-profile",
      link: buildPath("merchantUpdateProfile"),
      icon: profileIcon,
    },
    {
      text: "component-profile-menu.text.my-qr-code",
      link: "",
      action: "setShowQRModal",
      icon: qrIcon,
    },
    {
      text: "component-profile-menu.text.accept-payments-payouts",
      link: buildPath("merchantOnboarding"),
      icon: handCreditCardIcon,
      hide: account?.merchantProfileDetails?.businessDetails?.hasOnboarded,
    },
    {
      text: "component-profile-menu.text.manage-payouts",
      link: buildPath("payouts"),
      icon: bankIcon,
      hide: !account?.merchantProfileDetails?.businessDetails?.hasOnboarded,
    },
    {
      text: "component-profile-menu.text.payment-methods",
      link: buildPath("paymentMethods"),
      icon: cardIcon,
    },
    {
      text: "component-profile-menu.text.sales",
      link: buildPath("sales"),
      icon: moneyIcon,
    },
    {
      text: "component-profile-menu.text.purchases",
      link: buildPath("transactions"),
      icon: shoppingBagIcon,
    },
    {
      text: "component-profile-menu.text.add-an-account",
      link: buildPath("merchantCreate"),
      icon: plusIcon,
    },
    {
      text: "component-profile-menu.text.settings",
      link: buildPath("settings"),
      icon: gearIcon,
    },
  ];

  return account.isMerchant ? merchantOptions : individualOptions;
};
