import withPadding from "../../utils/withPadding";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { IonMenuToggle, IonPage } from "@ionic/react";
import MenuDrawer from "./MenuDrawer";
import { AccountType } from "generated/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { VersionObject } from "utils/env";

export default {
  title: "Components/Menu",
  component: MenuDrawer,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const testingVersionObject: VersionObject = { major: "2", minor: "0", build: "2110" };

export const IndividualMenu: Story = () => {
  const accountMock = {
    city: "randomUser.location.city",
    country: "AnyCountry",
    displayName: "Foo Man",
    id: "1234",
    phone: "1234567891",
    image: "https://place-hold.it/300.png",
    userName: "randomUser.login@username.com",
    isMerchant: false,
  };
  return (
    <MockedProvider>
      <IonPage>
        <MenuDrawer testingVersionObject={testingVersionObject} accountProp={accountMock as AccountType} />
        <IonMenuToggle>VIEW MENU</IonMenuToggle>
        <div id="main_content" />
      </IonPage>
    </MockedProvider>
  );
};

export const IndividualMenuWithMultipleAccounts: Story = () => {
  const accountMock = {
    city: "randomUser.location.city",
    country: "AnyCountry",
    displayName: "Foo Man",
    id: "1234",
    phone: "1234567891",
    image: "https://place-hold.it/300.png",
    userName: "randomUser.login@username.com",
    isMerchant: false,
    hasMultipleAccounts: true,
  };

  return (
    <MockedProvider>
      <IonPage>
        <MenuDrawer testingVersionObject={testingVersionObject} accountProp={accountMock as AccountType} />
        <IonMenuToggle>VIEW MENU</IonMenuToggle>
        <div id="main_content" />
      </IonPage>
    </MockedProvider>
  );
};

export const MerchantMenuNotOnboarded: Story = () => {
  const accountMock = {
    displayName: "Not onboarded merchant",
    id: "1",
    userName: "test",
    image: "https://place-hold.it/300.png",
    isMerchant: true,
    hasMultipleAccounts: true,
    merchantProfileDetails: { payoutsEnabled: false, id: "notonboarded" },
  };

  return (
    <MockedProvider>
      <IonPage>
        <MenuDrawer testingVersionObject={testingVersionObject} accountProp={accountMock as AccountType} />
        <IonMenuToggle>VIEW MENU</IonMenuToggle>
        <div id="main_content" />
      </IonPage>
    </MockedProvider>
  );
};

export const MerchantMenuOnboarded: Story = () => {
  const accountMock = {
    displayName: "Onboarded Merchant",
    isMerchant: true,
    hasMultipleAccounts: true,
    id: "1",
    userName: "test",
    image: "https://place-hold.it/300.png",
    merchantProfileDetails: { payoutsEnabled: true, id: "onboarded" },
  };

  return (
    <MockedProvider>
      <IonPage>
        <MenuDrawer testingVersionObject={testingVersionObject} accountProp={accountMock as AccountType} />
        <IonMenuToggle>VIEW MENU</IonMenuToggle>
        <div id="main_content" />
      </IonPage>
    </MockedProvider>
  );
};
