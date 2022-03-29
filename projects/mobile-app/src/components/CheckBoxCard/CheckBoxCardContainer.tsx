import React, { FC, useEffect, useRef } from "react";
import cx from "classnames";
import { IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonIcon } from "@ionic/react";
import { Icon } from "components/Icon/Icon";
import "./styles.scss";
import { useTranslation } from "react-i18next";

export interface CheckBoxCardContainerProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  icon?: string | React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  autoSwipe?: boolean;
  id?: string;
  ariaLabel?: string;
  onDelete?: (id: string) => void;
  onEdit?: (cardId: string) => void;
}

export const CheckBoxCardContainer: FC<CheckBoxCardContainerProps> = ({
  title,
  icon,
  subtitle,
  selected = false,
  disabled = false,
  onClick,
  className,
  children,
  autoSwipe,
  id,
  ariaLabel,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();
  const swipe = !!onDelete || !!onEdit;
  const classes = cx(
    "flex flex-col rounded-lg py-3 px-4 w-full overflow-hidden",
    disabled ? "opacity-60" : "",
    selected ? "bg-white" : "bg-blue-lightest",
    className
  );
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  useEffect(() => {
    if (!autoSwipe) {
      return;
    }

    slidingRef.current?.open(undefined);

    const timeout = setTimeout(() => {
      slidingRef.current?.close();
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [autoSwipe]);

  const handleOpen = () => {
    if (swipe) {
      slidingRef.current?.open(undefined);
    }
  };

  const handleClose = () => {
    slidingRef.current?.close();
  };

  return (
    <IonItemSliding ref={slidingRef} disabled={!swipe}>
      <IonItem onClick={handleOpen} lines="none">
        <div className={classes} aria-label={ariaLabel || "CHECKBOX_CARD_CONTAINER"}>
          <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            aria-label={ariaLabel && `${ariaLabel}_CARD_BUTTON`}
            className="flex flex-wrap items-center w-full text-left text-white truncate rounded outline-none overflow-hidden">
            <div className="flex flex-1 items-center flex-grow mr-3 truncate">
              <div aria-label={ariaLabel && `${ariaLabel}_CARDLOGO_IMAGE`} className="mr-2 flex items-center">
                {typeof icon !== "string" ? icon : <IonIcon src={icon} className="w-6 h-6" color="dark" />}
              </div>
              <div className="flex flex-col truncate">
                <div
                  aria-label={ariaLabel && `${ariaLabel}_CARD_LABEL`}
                  className="text-sm font-normal line-clamp-1 text-blue-dark whitespace-normal truncate">
                  {title}
                </div>
                <div className="text-xs font-normal text-blue-dark truncate">{subtitle}</div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </IonItem>
      <IonItemOptions onClick={handleClose} className="rounded-lg mr-6" side="end">
        <div className="background-dark-blue-1 flex flex-row rounded-lg ml-3 mb-2">
          {!!onEdit && !!id && (
            <IonItemOption
              className={cx("w-20 rounded-l-lg background-dark-blue-1", { "rounded-r-lg": !onDelete })}
              onClick={() => onEdit(id)}>
              <div className="flex flex-col items-center pt-1">
                <div>
                  <Icon name="bold_pencil" size="xs" />
                </div>
                <div className="swipeIconText mt-1.5">{t("component-checkbox-card-container.text.edit")}</div>
              </div>
            </IonItemOption>
          )}
          {!!onEdit && !!onDelete && <div className="line my-2" />}
          {!!onDelete && !!id && (
            <IonItemOption
              className={cx("w-20 rounded-r-lg background-dark-blue-1", { "rounded-l-lg": !onEdit })}
              onClick={() => onDelete(id)}>
              <div className="flex flex-col items-center pt-1">
                <div>
                  <Icon name="bold_trash" size="xs" />
                </div>
                <div className="swipeIconText mt-1.5">{t("component-checkbox-card-container.text.delete")}</div>
              </div>
            </IonItemOption>
          )}
        </div>
      </IonItemOptions>
    </IonItemSliding>
  );
};
