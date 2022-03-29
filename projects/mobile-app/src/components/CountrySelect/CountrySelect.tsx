import { LabelContainer } from "components/Input/Input";

import React from "react";
import { useTranslation } from "react-i18next";
import { countryOptions } from "utils/countryOptions";
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
  ariaLabel?: string;
}

export const CountrySelect: React.FC<Props> = ({ ariaLabel, name, label, register }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-2">
      <LabelContainer ariaLabel={ariaLabel && `${ariaLabel}_LABEL`} label={label} />
      <select
        aria-label={ariaLabel && `${ariaLabel}_FIELD`}
        name={name}
        ref={register}
        style={{ height: 52, fontSize: 20 }}
        className="py-2 px-4 w-full rounded-lg bg-blue border-white border-2 outline-none text-white placeholder-white-faded text-xl block focus:ring-indigo-500 focus:border-white focus:outline-none focus:ring-0 focus:placeholder-transparent">
        <option value="" key="">
          {t("merchant-create-page.option.select-a-country")}
        </option>
        {_.sortBy(countryOptions, ["label"]).map(({ value, label: countryLabel }) => (
          <option
            key={value}
            value={value}
            aria-label={ariaLabel ? `${ariaLabel}_${value.toUpperCase()}` : `${value.toUpperCase()}`}>
            {countryLabel}
          </option>
        ))}
      </select>
    </div>
  );
};
