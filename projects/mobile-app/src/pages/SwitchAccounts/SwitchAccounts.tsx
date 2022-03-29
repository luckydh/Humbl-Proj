import { UserItem, UserItemSkeleton } from "components/UserItem/UserItem";
import { useMyAccountsQuery } from "generated/graphql";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { setCurrentAccountId, useCurrentAccountId } from "state/cache";
import { Loading } from "components/Loading";
import { IonIcon } from "@ionic/react";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { useTranslation } from "react-i18next";
import { plusPaddedIcon } from "assets/icons";
import { useGetCurrentAccount } from "../../hooks/useGetCurrentAccount";
import { trackEvent } from "utils/analytics/Segment";
import { buildPath } from "utils/routes";
import EVENTS from "utils/analytics/AnalyticEvents";
import { Link } from "react-router-dom";

const SwitchAccounts: React.FC = () => {
  const currentAccountId = useCurrentAccountId();
  const { data, loading } = useMyAccountsQuery();
  const history = useHistory();
  const { t } = useTranslation();
  const { refetch } = useGetCurrentAccount();
  const [clickable, setClickable] = useState(true);
  const { currentAccount } = useGetCurrentAccount();
  const accounts = data?.accounts?.filter((item) => item.id !== currentAccountId) || [];

  const currentUser = data?.accounts?.find((item) => item.id === currentAccountId);

  const handleOnClick = (id: string) => () => {
    trackEvent(EVENTS.IS_MERCHANT_INDIVIDUAL, {
      status: !currentAccount?.isMerchant,
      userId: id,
    });
    if (clickable) {
      setCurrentAccountId(id)
        .then(() => refetch())
        .then(() => {
          setClickable(false);
          if (!currentAccount?.isMerchant) {
            history.push(buildPath("home"));
          } else {
            history.push(buildPath("cryptoWallet"));
          }
        });
    }
  };

  if (loading) {
    return (
      <div className="flex w-full mt-52 justify-center items-center">
        <Loading loading />
      </div>
    );
  }

  return (
    <LayoutModal title={t("pages-switch-account.title.switch-accounts")}>
      <div className="pb-6  border-b-2 border-blue-light">
        <UserItem
          name={currentUser?.displayName || ""}
          userName={currentUser?.userName || ""}
          src={currentUser?.image || ""}
        />
      </div>
      <div className="flex-grow overflow-scroll">
        <ul className="flex flex-col flex-grow my-4">
          {loading && (
            <li>
              <UserItemSkeleton />
              <UserItemSkeleton />
            </li>
          )}
          {accounts.map((account) => (
            <li key={account.id} className="block flex-1 my-4">
              <UserItem
                onClick={handleOnClick(account.id)}
                name={account.displayName}
                userName={account.userName}
                src={account.image}
              />
            </li>
          ))}
          <li className="block flex-1 my-4">
            <Link to="/merchantcreate">
              <div className="flex-1">
                <div className="flex justify-between border-t border-blue-light pt-8 ml-3 rounded text-left px-2 w-full text-white truncate align-middle items-center">
                  <div className="truncate">
                    <h4 className="text-lg leading-tight font-bold">
                      {t("pages-switch-account.button.create-new-account")}
                    </h4>
                  </div>
                  <IonIcon icon={plusPaddedIcon} style={{ width: 37, height: 37 }} />
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </LayoutModal>
  );
};

export default SwitchAccounts;
