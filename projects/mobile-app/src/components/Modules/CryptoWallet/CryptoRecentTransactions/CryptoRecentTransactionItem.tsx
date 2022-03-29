import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { AccountType, AssetTransactionCategory, AssetTransactionStatus, AssetType } from "generated/graphql";
import { decimalPrecision } from "utils/decimalPrecision";
import { Icon, IconProps, IconSize, ImageIcon } from "components/Icon/Icon";

type IconRules = {
  name: IconProps["name"];
  color: IconProps["color"];
};

const CATEGORIES_WITH_SUBICON = [
  AssetTransactionCategory.Purchase,
  AssetTransactionCategory.Receipt,
  AssetTransactionCategory.Deposit,
];

const TRANSACTION_ICON_RULES: Record<AssetTransactionCategory, Record<AssetTransactionStatus, IconRules>> = {
  [AssetTransactionCategory.Purchase]: {
    [AssetTransactionStatus.Pending]: { name: "circle_warning", color: "yellow" },
    [AssetTransactionStatus.Processed]: { name: "circle_plus", color: "green" },
    [AssetTransactionStatus.Failed]: { name: "circle_warning", color: "red" },
    [AssetTransactionStatus.RequiresAction]: { name: "circle_warning", color: "red" },
  },
  [AssetTransactionCategory.Receipt]: {
    [AssetTransactionStatus.Pending]: { name: "circle_receive", color: "yellow" },
    [AssetTransactionStatus.Processed]: { name: "circle_receive", color: "blue" },
    [AssetTransactionStatus.Failed]: { name: "circle_receive", color: "red" },
    [AssetTransactionStatus.RequiresAction]: { name: "circle_receive", color: "red" },
  },
  [AssetTransactionCategory.Deposit]: {
    [AssetTransactionStatus.Pending]: { name: "circle_warning", color: "yellow" },
    [AssetTransactionStatus.Processed]: { name: "circle_send", color: "blue" },
    [AssetTransactionStatus.Failed]: { name: "circle_warning", color: "red" },
    [AssetTransactionStatus.RequiresAction]: { name: "circle_send", color: "red" },
  },
  [AssetTransactionCategory.Interest]: {
    [AssetTransactionStatus.Pending]: { name: "circle_interest", color: "yellow" },
    [AssetTransactionStatus.Processed]: { name: "circle_interest", color: "blue" },
    [AssetTransactionStatus.Failed]: { name: "circle_interest", color: "red" },
    [AssetTransactionStatus.RequiresAction]: { name: "circle_interest", color: "red" },
  },
  [AssetTransactionCategory.Swap]: {
    [AssetTransactionStatus.Pending]: { name: "circle_swap", color: "yellow" },
    [AssetTransactionStatus.Processed]: { name: "circle_swap", color: "blue" },
    [AssetTransactionStatus.Failed]: { name: "circle_swap", color: "red" },
    [AssetTransactionStatus.RequiresAction]: { name: "circle_swap", color: "red" },
  },
  [AssetTransactionCategory.EtxTransferIn]: {
    [AssetTransactionStatus.Pending]: { name: "circle_plus", color: "yellow" },
    [AssetTransactionStatus.Processed]: { name: "circle_plus", color: "blue" },
    [AssetTransactionStatus.Failed]: { name: "circle_plus", color: "red" },
    [AssetTransactionStatus.RequiresAction]: { name: "circle_plus", color: "red" },
  },
  [AssetTransactionCategory.EtxTransferOut]: {
    [AssetTransactionStatus.Pending]: { name: "circle_interest", color: "yellow" },
    [AssetTransactionStatus.Processed]: { name: "circle_interest", color: "blue" },
    [AssetTransactionStatus.Failed]: { name: "circle_interest", color: "red" },
    [AssetTransactionStatus.RequiresAction]: { name: "circle_interest", color: "red" },
  },
};

interface TransactionIconProps {
  category: AssetTransactionCategory;
  status: AssetTransactionStatus;
  size: IconSize;
}

/**
 * Given a status and category, returns the icon to use
 * @param status AssetTransactionStatus
 * @param category AssetTransactionCategory
 * @param size  IconSize
 * @returns <TransactionIcon />
 */
const TransactionIcon: React.FC<TransactionIconProps> = ({ category, status, size = "sm" }) => {
  const icon = TRANSACTION_ICON_RULES[category][status];

  if (!icon) {
    // Generic Fallback icon if no icon matching the rule is found
    return <Icon name="circle_info" color="blue" size={size} />;
  }
  return <Icon name={icon.name} color={icon.color} size={size} />;
};

interface IconWithSubIconProps {
  primary: JSX.Element;
  secondary: JSX.Element;
}

const IconWithSubIcon: React.FC<IconWithSubIconProps> = ({ primary, secondary }) => (
  <div className="pr-2 relative">
    {primary}
    <div className="flex h-4 w-4 absolute right-1 bottom-0 border-black rounded-full justify-center items-center">
      {secondary}
    </div>
  </div>
);

interface CryptoTransactionIconProps {
  category: AssetTransactionCategory;
  status: AssetTransactionStatus;
  coinImage: string;
  senderImage?: string;
  receiverImage?: string;
}

const CryptoTransactionIcon: React.FC<CryptoTransactionIconProps> = ({
  category,
  coinImage,
  senderImage,
  receiverImage,
  status,
}) => {
  if (CATEGORIES_WITH_SUBICON.includes(category)) {
    let image = coinImage;
    if (senderImage && category === AssetTransactionCategory.Receipt) {
      image = senderImage;
    } else if (receiverImage && category === AssetTransactionCategory.Deposit) {
      image = receiverImage;
    }

    return (
      <IconWithSubIcon
        primary={<ImageIcon size="lg" src={image} label={category} />}
        secondary={<TransactionIcon category={category} status={status} size="xs" />}
      />
    );
  }

  return (
    <div className="pr-2">
      <TransactionIcon category={category} status={status} size="lg" />
    </div>
  );
};

export interface CryptoRecentTransactionItemProps {
  transactionCategory?: AssetTransactionCategory;
  coin?: string;
  asset?: AssetType;
  assetName?: string;
  cryptoCurrency?: string;
  fiatCurrency?: string;
  date?: string;
  amount?: number;
  fiatAmount?: string;
  swappedAsset?: string;
  isLastIndex?: boolean;
  status?: AssetTransactionStatus;
  sender?: AccountType;
  receiver?: AccountType;
}

export const CryptoRecentTransactionItem = ({
  transactionCategory,
  amount = 0,
  assetName,
  asset,
  coin,
  cryptoCurrency,
  fiatCurrency,
  date,
  fiatAmount,
  swappedAsset,
  isLastIndex,
  status,
  sender,
  receiver,
}: CryptoRecentTransactionItemProps) => {
  const isEtx =
    transactionCategory === AssetTransactionCategory.EtxTransferIn ||
    transactionCategory === AssetTransactionCategory.EtxTransferOut;
  const { t } = useTranslation();
  return (
    <li>
      <div
        className={cx("flex flex-row px-4 py-5 bg-white items-center", {
          "border-b border-b-[--blue-lightest2] border-solid": !isLastIndex,
        })}>
        <div className="flex flex-row">
          <div className="pr-6">
            <CryptoTransactionIcon
              senderImage={sender?.image}
              receiverImage={receiver?.image}
              category={transactionCategory || AssetTransactionCategory.Purchase}
              coinImage={asset?.logoImage || ""}
              status={status || AssetTransactionStatus.Pending}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between text-dark-blue-1">
          <div className="flex flex-row">
            <div className="flex flex-row justify-between w-full">
              {date && (
                <>
                  <span className="font-semibold text-sm app_sm:text-sm app_md:text-base">
                    {transactionCategory === AssetTransactionCategory.Swap &&
                      t("crypto-transactions.transaction.swap", { swappedAsset, asset: coin })}

                    {transactionCategory === AssetTransactionCategory.Interest &&
                      t("crypto-transactions.transaction.interest-on-asset")}

                    {transactionCategory === AssetTransactionCategory.Deposit &&
                      t("crypto-transactions.transaction.deposit-to-receiver-name", {
                        asset: coin,
                        receiverName: receiver?.displayName || t("crypto-transactions.transaction.external.wallet"),
                      })}
                    {transactionCategory === AssetTransactionCategory.Purchase &&
                      (status === AssetTransactionStatus.Pending
                        ? t("crypto-transactions.transaction.purchase-pending", { asset: coin })
                        : t("crypto-transactions.transaction.purchase", { asset: coin }))}
                    {transactionCategory === AssetTransactionCategory.Receipt &&
                      t("crypto-transactions.transaction.receipt-from-sender-name", {
                        asset: coin,
                        senderName: sender?.displayName || t("crypto-transactions.transaction.external.wallet"),
                      })}
                    {transactionCategory === AssetTransactionCategory.EtxTransferIn &&
                      t("crypto-transactions.transaction.invested")}
                    {transactionCategory === AssetTransactionCategory.EtxTransferOut &&
                      t("crypto-transactions.transaction.withdraw")}
                  </span>
                  <span className="font-semibold text-sm app_sm:text-sm app_md:text-base text-right tabular-nums">
                    {decimalPrecision(amount, 8)} {cryptoCurrency}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-row text-right justify-between w-full">
            <div className="flex flex-col text-left">
              <div className="flex flex-row flex-wrap">
                {isEtx && <span className="font-semibold text-xs mr-1">{`${assetName} |`}</span>}
                <span className="font-semibold text-xs">{moment(date).format("MMM DD, YYYY")}</span>
              </div>
              <div
                className={cx("font-semibold text-xs italic lowercase first-letter:uppercase", {
                  "text-yellow": status === AssetTransactionStatus.Pending,
                  "text-green-500": status === AssetTransactionStatus.Processed,
                  "text-red-failed": status === AssetTransactionStatus.Failed,
                })}>
                {status}
              </div>
            </div>
            <span className="font-semibold text-sm app_sm:text-sm app_md:text-base">
              {fiatAmount} {fiatCurrency}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
