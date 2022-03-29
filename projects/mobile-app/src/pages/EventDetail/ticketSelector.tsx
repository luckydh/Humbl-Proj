import React from "react";
import { useTranslation } from "react-i18next";
import TicketItem from "components/Modules/Ticketing/TicketItem";
import { TicketDetailsType, TicketStatus } from "generated/graphql";
import BottomAction from "components/Modules/Ticketing/BottomAction/BottomAction";
import Button from "components/LoaderButton/LoaderButton";
import { useForm } from "react-hook-form";
import TickeriLogoSmall from "assets/svgs/TickeriLogoSmall";

export interface TicketOrderType {
  id: string;
  quantity: number;
}

export interface TicketSelectorProps {
  ticketDetails: TicketDetailsType[] | undefined;
  startTicketOrder(tickets: TicketOrderType[]): void;
}

const TicketSelector: React.FC<TicketSelectorProps> = ({ ticketDetails, startTicketOrder }) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({ mode: "onBlur" });

  const onSubmit = (data: any) => {
    const idArray = Object.keys(data);

    // Need to push into ticketsArray objects that look like {id:value}
    const tickets = idArray.reduce((ticketArr, ticketId: string) => {
      //convert string to int.
      const quantity = parseInt(data[ticketId], 10);

      // only add the quantities that are there.
      if (!isNaN(quantity) && quantity > 0) {
        ticketArr.push({ id: ticketId, quantity });
      }
      return ticketArr;
    }, [] as TicketOrderType[]);

    startTicketOrder(tickets);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
      <div className="px-6">
        <ul>
          {ticketDetails?.map((ticketItem) => {
            const { type = "", minimumPerOrder = 0, maximumPerOrder = 0, id = "", saleEnd } = ticketItem;
            const badge =
              ticketItem.status === TicketStatus.SoldOut
                ? { label: t("sold-out"), type: "warning" }
                : ticketItem.status === TicketStatus.SellingFast
                ? {
                    label: t("badge-text-tickets-remaining", { numberAvailable: maximumPerOrder }),
                    type: "ticketWarning",
                  }
                : undefined;
            const price =
              ticketItem.price?.value && ticketItem.price?.value > 0
                ? ticketItem.price.display + ""
                : t("event-details.text.free");
            return (
              <li key={id}>
                <TicketItem
                  {...ticketItem}
                  name={id}
                  register={register}
                  title={type}
                  min={minimumPerOrder}
                  max={maximumPerOrder}
                  ticketId={id}
                  price={price}
                  badge={badge}
                  saleEndDate={saleEnd}
                />
              </li>
            );
          })}
        </ul>

        <BottomAction platformLogo={<TickeriLogoSmall />}>
          <Button text={t("button-text-checkout")} type="submit" />
        </BottomAction>
      </div>
    </form>
  );
};

export default TicketSelector;
