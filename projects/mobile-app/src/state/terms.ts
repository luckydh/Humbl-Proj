import { Storage } from "@capacitor/storage";

// This value should be updated anytime TOS needs to be updated.
// TODO: eventually this should be a server interaction so that
// a user agrees to TOS once accross all platforms.
export const TOS_VERSION = "1.0";
const ACCEPTED_TOS_VERSION_STORAGE_KEY = "AcceptedTOSVersion";

export const shouldShowToS = async () => {
  const acceptedVersion = await getAcceptedToSVersion();
  return acceptedVersion !== TOS_VERSION;
};

export const getAcceptedToSVersion = async () => {
  const { value } = await Storage.get({ key: ACCEPTED_TOS_VERSION_STORAGE_KEY });
  return value;
};

export const setAcceptedToSVersion = async (version = "") => {
  await Storage.migrate();
  await Storage.set({
    key: ACCEPTED_TOS_VERSION_STORAGE_KEY,
    // For some reason this value was not persisting until template literal was used 🤷
    value: `${version}`,
  });
};
