import { LabelContainer } from "components/Input/Input";
import React from "react";
import { useTranslation } from "react-i18next";
import useMerchantTypeOptions from "utils/merchantTypeOptions";
import _ from "lodash";

type RefReturn =
  | string
  | ((instance: HTMLSelectElement | null) => void)
  | React.RefObject<HTMLSelectElement>
  | null
  | undefined;

interface Props {
  label: string;
  name: string;
  register: RefReturn;
}

export const MerchantTypeSelect: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const merchantTypeOptions = useMerchantTypeOptions();

  return (
    <div className="mb-2">
      <LabelContainer label={props.label} />
      <select
        name={props.name}
        ref={props.register}
        style={{ height: 52, fontSize: 20 }}
        className="py-2 px-4 w-full rounded-lg bg-blue border-white border-2 outline-none text-white placeholder-white-faded text-xl block focus:ring-indigo-500 focus:border-white focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder-transparent"
      >
        <option value="" key="">
          {t("merchant-create-page.option.select-a-business-type")}
        </option>
        {_.sortBy(merchantTypeOptions, ["label"]).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
