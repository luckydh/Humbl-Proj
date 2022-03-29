import moment from "moment";
import { orderBy } from "lodash";
import { TransactionSectionProps } from "./TransactionSection";
import { useTranslation } from "react-i18next";
import { AssetTransactionType } from "generated/graphql";
import { useMemo } from "react";

/**
 *  This hook splits transactions into sections by month.
 */
export const useTransactionsSectioner = (transactions: AssetTransactionType[]): Array<TransactionSectionProps> => {
  const { t } = useTranslation();

  const sections = useMemo(() => {
    const today = moment();
    const sections: Record<string, AssetTransactionType[]> = {};

    const orderedTransactions = orderBy(transactions, "date", ["desc"]);

    const sectionKeys = new Set<string>();

    orderedTransactions.forEach((transaction) => {
      const date = moment(transaction.date);
      const section = `${date.year()}-${date.format("MMMM")}`;

      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(transaction);

      if (!sectionKeys.has(section)) {
        sectionKeys.add(section);
      }
    });

    const result: Array<TransactionSectionProps> = [];

    sectionKeys.forEach((sectionKey) => {
      const [sectionYear, sectionMonth] = sectionKey.split("-");
      let sectionName = "";

      if (today.format("MMMM") === sectionMonth && today.format("YYYY") === sectionYear) {
        sectionName = t("month.full-name.this-month");
      } else {
        sectionName = `${sectionMonth} ${sectionYear}`;
      }

      result.push({
        title: `${sectionName} `,
        items: sections[sectionKey],
      });
    });

    return result;
  }, [t, transactions]);

  return sections;
};
