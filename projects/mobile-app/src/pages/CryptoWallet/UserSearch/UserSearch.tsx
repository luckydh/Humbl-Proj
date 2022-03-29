import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IonPage, IonIcon } from "@ionic/react";
import {
  useSearchAccountsLazyQuery,
  AccountType,
  useSearchForUserContactsLazyQuery,
  ContactInput,
  useGetRecentlyTransactedWithQuery,
} from "generated/graphql";
import { SearchInput } from "components/SearchInput/SearchInput";
import { ListItem } from "components/ListItem/ListItem";
import CryptoCurrencyListSkeleton from "components/Modules/CryptoWallet/CryptoCurrencyList/CryptoCurrencyListSkeleton";
import { ApolloError } from "@apollo/client";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import { Icon } from "components/Icon/Icon";
import { useDebouncedSearch } from "utils/hooks/useDebouncedSearch";
import { sendFlowCurrentState } from "../SendFlow/sendFlowUtils";
import { KeyboardAwareView } from "components/common";
import { chevronBackOutline } from "ionicons/icons";
import { fetchContacts, transformPhoneContacts } from "AccessContacts/ContactAccess";
import { RecentItems } from "components/ListItem/RecentItems";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useFlowActions } from "../Flow";
import { accessNativeSetting } from "AccessSettings/AccessSettings";
import BottomAction from "components/Modules/Ticketing/BottomAction/BottomAction";
import { chevronForwardIcon } from "assets/icons";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

const MAX_LENGTH = 10;

enum AccessSettingRequest {
  NONE = "none",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export interface UserSelectInterface {
  id: string;
  image: string;
  displayName: string;
}

const emptyUserSelectObject = {
  id: "",
  image: "",
  displayName: "",
};

export type UserSearchProps = {
  title?: string;
};

export const UserSearch: React.FC<UserSearchProps> = ({ title }) => {
  const { t } = useTranslation();
  const { currency } = useRecoilValue(sendFlowCurrentState);
  const setCurrentState = useSetRecoilState(sendFlowCurrentState);
  const headerTitle = title || t("user.search.title");
  const { forward, back } = useFlowActions();
  const [doSearch, { data, loading }] = useSearchAccountsLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const [contactSearch, { data: contactsData, loading: contactsLoading }] = useSearchForUserContactsLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const [filterableContacts, setFilterableContacts] = useState<AccountType[] | undefined>([]);
  const [contactsRequested, setContactsRequested] = useState(false);
  const [contactsRequestDenied, setContactsRequestDenied] = useState(false);
  const [accessSettingRequest, setAccessSettingRequest] = useState<AccessSettingRequest>(AccessSettingRequest.NONE);

  const handleSettingClick = () => {
    if (Capacitor.getPlatform() === "android") {
      setAccessSettingRequest(AccessSettingRequest.IN_PROGRESS);
    } else if (Capacitor.getPlatform() === "ios") {
      accessNativeSetting();
    }
  };

  useEffect(() => {
    setFilterableContacts(contactsData?.searchForUserContacts);
  }, [contactsData]);

  const getContact = useCallback(async () => {
    const contactListObj = await fetchContacts();
    setContactsRequested(true);
    if (contactListObj === false) {
      setContactsRequestDenied(true);
    } else {
      const converted: ContactInput[] = transformPhoneContacts(contactListObj ? contactListObj.contacts : []);
      await contactSearch({ variables: { contacts: converted } });
    }
  }, [contactSearch]);

  const openAccessSetting = useCallback(() => {
    if (accessSettingRequest === AccessSettingRequest.IN_PROGRESS) {
      const appListener = App.addListener("appStateChange", async ({ isActive }) => {
        if (isActive) {
          setAccessSettingRequest(AccessSettingRequest.DONE);
          appListener.remove();
        }
      });
      accessNativeSetting();
    }
    if (accessSettingRequest === AccessSettingRequest.DONE) {
      getContact();
      setAccessSettingRequest(AccessSettingRequest.NONE);
    }
  }, [accessSettingRequest, getContact]);

  useEffect(() => {
    openAccessSetting();
    if (!contactsRequested) {
      getContact();
    }
  }, [getContact, openAccessSetting, contactsRequested]);

  const setSearchTerm = useDebouncedSearch((searchTerm) => {
    doSearch({ variables: { search: searchTerm, isMerchant: false } });
    filterContacts(searchTerm);
  });
  const userDetail = useGetRecentlyTransactedWithQuery({
    fetchPolicy: "cache-and-network",
  });

  const handleClickItem = (userObject: UserSelectInterface = emptyUserSelectObject) => {
    setCurrentState((state) => ({
      ...state,
      user: userObject,
      currency,
    }));
    forward();
  };

  const filterContacts = (filterTerm: string) => {
    const thereAreContacts =
      !contactsLoading && contactsData?.searchForUserContacts && contactsData?.searchForUserContacts.length > 0;
    if (thereAreContacts) {
      setFilterableContacts(
        contactsData?.searchForUserContacts?.filter((contact) =>
          contact.displayName.toLocaleLowerCase().includes(filterTerm.toLocaleLowerCase())
        )
      );
    }
  };

  const handleBackClick = () => {
    back();
  };

  return (
    <IonPage className="safe-area-top bg-lines">
      <KeyboardAwareView>
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap items-center w-full px-6 py-5">
            <button
              aria-label="SEARCHFORUSER_BACK_BUTTON"
              className="justify-center inline-flex text-white"
              type="button"
              onClick={handleBackClick}
              title="Go back"
            >
              <IonIcon icon={chevronBackOutline} className="text-3xl" />
            </button>
            <div className="flex-1 mr-7">
              <h1
                aria-label="SEARCHFORUSER_TITLE_LABEL"
                className="text-xl capitalize border-white font-medium text-center text-white m-auto"
              >
                {headerTitle}
              </h1>
            </div>
          </div>
          <div className="mb-5 px-6">
            <SearchInput
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value.trim())}
              ariaLabel="SEARCHFORUSER"
              placeholder={t("component-search-input.placeholder.search")}
              onClear={() => {
                setSearchTerm("");
              }}
            />
          </div>

          {userDetail?.data?.me?.recentlyTransactedWith && userDetail?.data?.me?.recentlyTransactedWith.length > 0 && (
            <div className="bg-white p-2" aria-label="SEARCHFORUSER_RECENTTRANSACTIONS_SECTION">
              <div className="font-semibold pb-2 px-6 text-blue-dark2 text-sm">
                {t("component-search.recent-transactions.title")}
              </div>
              <div className="flex overflow-hidden">
                {userDetail?.data?.me?.recentlyTransactedWith.map((user) => {
                  const [firstName] = user.displayName.split(" ");
                  const userName = firstName.length > MAX_LENGTH ? `${firstName.substring(0, 7)}...` : firstName;
                  return (
                    <RecentItems
                      key={user.userName}
                      userName={userName}
                      image={user.image}
                      onClick={() => handleClickItem(user)}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <UserSearchList
            loading={loading || contactsLoading}
            humblCommunityUsers={data?.searchAccounts}
            userHumblContacts={filterableContacts}
            onClick={handleClickItem}
            handleSettingClick={handleSettingClick}
            contactsRequested={contactsRequested}
            contactsRequestDenied={contactsRequestDenied}
          />
        </div>
      </KeyboardAwareView>
    </IonPage>
  );
};

export interface UserSearchListProps {
  loading: boolean;
  humblCommunityUsers?: AccountType[];
  userHumblContacts?: AccountType[];
  error?: ApolloError;
  contactsRequested: boolean;
  contactsRequestDenied: boolean;
  onClick: (userObject?: UserSelectInterface) => void;
  handleSettingClick: () => void;
}
export const UserSearchList: React.FC<UserSearchListProps> = ({
  loading,
  humblCommunityUsers = [],
  userHumblContacts = [],
  error,
  contactsRequested,
  contactsRequestDenied,
  onClick,
  handleSettingClick,
}) => {
  const { t } = useTranslation();
  if (error) {
    return (
      <WidgetContainer ariaLabel="USER_SEARCH_WIDGET_CONTAINER">
        <div className="mx-6 my-10 text-sm text-black">{t("widget.error.generic-loading-error")}</div>
      </WidgetContainer>
    );
  }

  if (loading) {
    return <CryptoCurrencyListSkeleton rows={10} />;
  }

  const isThereHumblAccountForUserContacts = userHumblContacts.length === 0;
  const isThereHumblUsers = humblCommunityUsers.length === 0;

  if (isThereHumblUsers && isThereHumblAccountForUserContacts) {
    return (
      <div className="flex flex-col flex-1 items-center h-full bg-blue-lightest px-6 pt-9">
        <div
          className="flex text-blue-dark flex-col items-center text-center bg-white w-full py-8 px-6 rounded-lg"
          data-testid="crypto-currency-list-empty"
        >
          <div className="flex pb-5">
            <div className="flex justify-center align-middle items-center bg-blue-lightest h-14 w-14 rounded-full">
              <div
                aria-label="SEARCHFORUSER_PERMISSIONLOGO_IMAGE"
                className="flex justify-center align-middle items-center bg-blue h-11 w-11 rounded-full"
              >
                <Icon name="bold_user" />
              </div>
            </div>
          </div>

          {!contactsRequested || contactsRequestDenied ? (
            <>
              <div aria-label="SEARCHFORUSER_PERMISSIONTITLE_LABEL" className="text-xl font-semibold">
                {t("send-user-flow-search-for-contacts")}
              </div>
              <div aria-label="SEARCHFORUSER_PERMISSIONBODY_LABEL" className="py-2">
                {t("send-user-flow-search-for-contacts-text")}
              </div>
              {contactsRequestDenied && (
                <BottomAction backgroundColor="bg-white">
                  <div className="flex -mx-1 pb-3">
                    <div className="pr-3 pt-0.5">
                      <Icon name="bold_users" color="blue-dark2" size="xs" />
                    </div>
                    <div className="text-left">
                      <div className="text-blue-dark2 font-semibold text-sm">{t("send-user-flow-setting-text")}</div>
                      <div className="text-blue text-sm font-semibold flex">
                        <span onClick={handleSettingClick}>{t("send-user-flow-go-to-setting")}</span>
                        <IonIcon
                          className="text-xs text-blue py-1 px-1.5"
                          icon={chevronForwardIcon}
                          onClick={handleSettingClick}
                        />
                      </div>
                    </div>
                  </div>
                </BottomAction>
              )}
            </>
          ) : (
            <>
              <div aria-label="SEARCHFORUSER_PERMISSIONTITLE_LABEL" className="text-xl font-semibold">
                {t("send-user-flow-no-contacts-found")}
              </div>
              <div aria-label="SEARCHFORUSER_PERMISSIONBODY_LABEL" className="py-2">
                {t("send-user-flow-no-contacts-found-text")}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-scroll bg-blue-lightest2">
      <ContactList
        title="user-list-user-contacts"
        contacts={userHumblContacts}
        onContactClick={onClick}
        ariaLabelTitle="SEARCHFORUSER_MYCONTACTS_LABEL"
        ariaLabelList="SEARCHFORUSER_CONTACTLIST_SECTION"
      />
      <ContactList
        title="user-list-humbl-contacts"
        contacts={humblCommunityUsers}
        onContactClick={onClick}
        ariaLabelTitle="SEARCHFORUSER_HUMBLCOMMUNITY_LABEL"
        ariaLabelList="SEARCHFORUSER_HUMBLCOMMUNITYLIST_SECTION"
      />
    </div>
  );
};

interface ContactListProps {
  contacts: AccountType[];
  onContactClick: (userObject?: UserSelectInterface) => void;
  title: string;
  ariaLabelTitle: string;
  ariaLabelList: string;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  title,
  ariaLabelTitle,
  ariaLabelList,
  onContactClick,
}) => {
  const { t } = useTranslation();

  if (contacts.length <= 0) {
    return null;
  }

  return (
    <>
      <div className="bg-blue-lightest text-blue-dark px-6 font-semibold" aria-label={ariaLabelTitle}>
        {t(title)}
      </div>
      <ul aria-label={ariaLabelList} className="divide-y divide-white">
        {contacts?.map((user) => (
          <ListItem
            key={user.userName}
            ariaLabel="SEARCHFORUSER"
            onClick={() => onContactClick(user)}
            mainText={user.displayName}
            subText={`@${user.userName}`}
            image={<img src={user.image} className="w-full" alt={user.displayName} />}
          />
        ))}
      </ul>
    </>
  );
};
