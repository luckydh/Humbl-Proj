import CheckMark from "components/CheckMark";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isEditing?: boolean;
}

const CardAddedStep: React.FC<Props> = ({ isEditing }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <CheckMark noBackground />
      <h1 className="mt-20 text-4xl font-semibold text-white">
        {isEditing
          ? t("page-card-added-step.text.card-updated")
          : t("page-card-added-step.text.card-added")}
        !
      </h1>
    </div>
  );
};

export default CardAddedStep;
