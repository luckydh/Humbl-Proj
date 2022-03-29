import { Contacts, Contact } from "@capacitor-community/contacts";
import { Capacitor } from "@capacitor/core";
import { ContactInput } from "generated/graphql";

// Because why would you expect consistent results from plugins?
type AndroidContactsPermissionResult = {
  contacts?: string;
};

export const fetchContacts = async () => {
  const canAccessContacts = await assertConctactsPermission();
  if (!canAccessContacts) {
    return false;
  }

  const contacts = await Contacts.getContacts();

  return contacts;
};

export const transformPhoneContacts = (contacts: Contact[]): ContactInput[] =>
  contacts.map(({ emails, phoneNumbers }: Contact) => ({
    phoneNumbers: phoneNumbers.map(({ number }) => number ?? "").filter(Boolean),
    emails: emails.map(({ address }) => address ?? "").filter(Boolean),
  }));

const assertConctactsPermission = async () => {
  const isNative = Capacitor.getPlatform() !== "web";
  if (!isNative) {
    // Currently no support for non native use. Contacts on the web? waah?
    return false;
  }

  const permissions = await Contacts.getPermissions();

  return permissions.granted || (permissions as AndroidContactsPermissionResult)?.contacts === "granted";
};
