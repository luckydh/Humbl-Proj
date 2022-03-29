import moment from "moment";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

type RefReturn =
  | string
  | ((instance: HTMLSelectElement | null) => void)
  | React.RefObject<HTMLSelectElement>
  | null;

export type TicketItemProps = {
  name: string;
  register: RefReturn;
  title: string;
  description?: string;
  price: string;
  min: number;
  max: number;
  saleEndDate?: Date;
  ticketId?: string;
  badge?: {
    label: string;
    type: string;
  };
};

interface OptionProps {
  name: string;
  register: RefReturn;
  max: number;
  min: number;
}
const Options: FC<OptionProps> = (props) => {
  const optionList = [];
  if (props.min > 0) {
    optionList.push(<option key={0}>0</option>);
  }
  for (let index = props.min; index <= props.max; index+=1) {
    optionList.push(<option key={index}>{index}</option>);
  }
  return (
    <select
      name={props.name}
      ref={props.register}
      style={{ height: 47, fontSize: 20, minWidth: 84 }}
      className="py-2 px-4 w-full rounded-lg font-semibold bg-blue border-white border-1 outline-none text-white placeholder-white-faded text-xl block focus:ring-indigo-500 focus:border-white focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder-transparent"
    >
      {optionList}
    </select>
  );
};

export const TicketItem: FC<TicketItemProps> = ({
  name,
  register,
  title,
  description,
  price,
  min,
  max,
  badge,
  saleEndDate,
}) => {
  const { t } = useTranslation();

  const [showMore, setShowMore] = useState(false);
  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="border-b border-gray-200 mb-6 pb-6 text-white">
      <div>
        <div className="flex w-full justify-between">
          <div className="mr-4" style={{ maxWidth: "13rem" }}>
            <h3 className="font-bold text-xl"> {title}</h3>
            <h4 className="text-lg my-1">{price}</h4>
            {saleEndDate && (
              <p className="text-base">
                {t("ticketing.component.ticket_item.sales_end_on")}{" "}
                {moment(saleEndDate).format("dddd, MMM D, YYYY")}
              </p>
            )}
            <div>
              {!!badge && badge.type === "ticketWarning" && (
                <span className="text-red text-sm">{badge.label}</span>
              )}
            </div>
          </div>
          <div>
            {!!badge && badge.type === "warning" && (
              <span className="inline-flex items-center px-4 py-1 rounded-full text-base font-medium bg-red-light text-red">
                {badge.label}
              </span>
            )}
            {(!badge || (!!badge && badge.type !== "warning")) && (
              <Options
                min={min}
                max={max}
                name={name}
                register={register}
              />
            )}
          </div>
        </div>
        <div>
          {description && (
            <>
              {showMore && <p className="my-2">{description}</p>}
              <button
                className="text-base text-blue-dark font-bold underline mt-2"
                onClick={toggleDescription}
              >
                {!showMore
                  ? t("ticketing.component.ticket_item.see-more")
                  : t("ticketing.component.ticket_item.see_less")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
TicketItem.displayName = "TicketItem";
