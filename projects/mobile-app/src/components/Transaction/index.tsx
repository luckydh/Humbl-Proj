import { Avatar } from "components/Avatar/Avatar";
import Chevron from "assets/svgs/Chevron";
import moment from "moment";
import { useTranslation } from "react-i18next";
import React, { FC, MouseEventHandler } from "react";
import ContentLoader from "react-content-loader";

type Destination = {
  image?: string;
  userName?: string;
  displayName: string;
};

interface ITransactionProps {
  onClick?: MouseEventHandler;
  destination?: Destination;
  amount?: string;
  dateOfTransaction?: string;
  transactionType?: string;
}

const Transaction: React.FC<ITransactionProps> = ({
  destination,
  amount = 0,
  dateOfTransaction,
  transactionType,
  onClick,
}) => {
  const { t } = useTranslation();

  const isRefunded = transactionType === "MERCHANT REFUND";

  const formatDate = (date: string | undefined): string => moment(date).format("MMMM DD, YYYY");

  return (
    <div
      className="flex my-4"
      onClick={(e) => {
        if (onClick) onClick(e);
      }}>
      <Avatar src={destination?.image as string} />
      <button className="ml-3 rounded text-left px-2 w-full text-white flex items-center truncate">
        <div className="truncate">
          <h2 className="text-lg leading-tight font-bold truncate">{destination?.displayName}</h2>
          <span className="text-base leading-tight font-medium truncate">@{destination?.userName}</span>
          <span className="block text-left text-sm">{formatDate(dateOfTransaction)}</span>
          <div>
            <span className="block text-left text-sm">{amount}</span>
            {isRefunded && (
              <span className="text-sm font-bold ml-2 px-1 bg-blue-dark rounded-lg">{t("transactions.refunded")}</span>
            )}
          </div>
        </div>
        {onClick && (
          <div className="w-9 h-9 flex-none ml-auto">
            <Chevron />
          </div>
        )}
      </button>
    </div>
  );
};

export default Transaction;

export const TransactionItemSkeleton: FC = () => (
  <ContentLoader
    className="my-4"
    animate={true}
    speed={2}
    width={400}
    height={80}
    viewBox="0 0 400 80"
    backgroundColor="#4cb4dd"
    foregroundColor="#127aa3">
    <circle cx="40" cy="42" r="38" />
    <rect x="103" y="26" rx="3" ry="3" width="171" height="9" />
    <rect x="105" y="48" rx="3" ry="3" width="123" height="8" />
  </ContentLoader>
);
