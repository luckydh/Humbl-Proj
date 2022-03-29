import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProfileAvatar } from "components/Avatar/Avatar";
import { Loading } from "components/Loading";
import { TransactionType, useCreateRefundCardTransactionMutation, useGetTransactionQuery } from "generated/graphql";
import moment from "moment";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { presentToast } from "utils/toast";
import { formatCurrency } from "utils/currency";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { captureException } from "ErrorLogger";

interface RouteParams {
  id: string;
}

const SalesDetails: React.FC = () => {
  const [showConfirmRefund, setShowConfirmRefund] = useState(false);

  const { t } = useTranslation();
  const { id: saleId } = useParams<RouteParams>();
  const [transaction, setTransaction] = useState<TransactionType | undefined>(undefined);

  const { loading, error } = useGetTransactionQuery({
    variables: { id: saleId },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setTransaction(data?.transaction);
    },
  });

  const [createRefund, { loading: refundMutationLoading }] = useCreateRefundCardTransactionMutation({
    onCompleted: (data) => {
      setTransaction(data.createRefundCardTransaction);
      presentToast(t("sales-page.sales-refund-success"), 2000, "success");
    },
    onError: (error) => {
      presentToast(t("sales-page.sales-refund-error"), 2000, "danger");
      captureException(error);
    },
  });

  const handleRefundSale = async () => {
    setShowConfirmRefund(false);

    try {
      await createRefund({
        variables: {
          txDetailId: transaction?.txDetail,
          transaction: transaction?.id,
          destinationAccountTag: transaction?.receiver?.id,
          notes: "Refund",
          amount: transaction?.total?.value,
        },
      });
    } catch (error) {
      captureException(error);
    }
  };

  if (loading || refundMutationLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <span className="relative bottom-40">
          <Loading loading={true} />
        </span>
      </div>
    );
  }

  if (error) {
    return <p className="text-2xl text-center mt-14 text-red">{t("sales-page.error.sales-details")}</p>;
  }

  if (showConfirmRefund) {
    return (
      <LayoutModal title={""} leftClickIcon={<span />}>
        <div className="flex flex-col h-full items-center justify-center">
          <p className="text-2xl font-medium text-center mb-16">{t("sales-page.text.refund-confirmation")}</p>
          <button
            className="rounded-full text-center text-white mt-12 py-2 px-8 w-min bg-blue-dark text-xl font-medium"
            onClick={() => handleRefundSale()}>
            {t("sales-page.text.refund")}
          </button>
          <button
            className="text-center mt-3 py-1 px-20 w-min text-xl text-white font-medium"
            onClick={() => setShowConfirmRefund(false)}>
            {t("sales-page.text.cancel")}
          </button>
        </div>
      </LayoutModal>
    );
  }

  return (
    <LayoutModal title={t("sales-page.title.individual-sale")}>
      <div className="relative flex flex-col items-center justify-between h-full pt-14">
        <ProfileAvatar
          src={transaction?.sender?.image || ""}
          name={transaction?.sender?.displayName || ""}
          username={transaction?.sender?.userName || ""}
          size="medium"
        />
        <div className="relative mt-20">
          <p className="text-center font-semibold text-2xl">{`$ ${formatCurrency(
            transaction?.total?.value || 0
          )} ${transaction?.currency?.toUpperCase()}`}</p>
          <p className="text-center text-sm">{moment(transaction?.dateOfTransaction).format("MMMM Do, YYYY")}</p>
        </div>
        <button
          className={classNames(
            "relative rounded-full text-white text-center mt-12 w-min bg-blue-dark py-2 px-8 font-medium text-xl bottom-10",
            { "opacity-60": transaction?.isRefunded }
          )}
          disabled={transaction?.isRefunded}
          onClick={() => setShowConfirmRefund(true)}>
          {transaction?.isRefunded ? t("sales-page.text.refunded") : t("sales-page.text.refund")}
        </button>
      </div>
    </LayoutModal>
  );
};

export default SalesDetails;
