import React from "react";
import cx from "classnames";

export interface SelectorRowOption {
  label: string;
  value: any;
  ariaLabel: string;
}

export interface SelectorRowProps {
  options: SelectorRowOption[];
  onOptionsSelected: Function;
  selectedOption: string;
}

export const SelectorRow = ({ options, onOptionsSelected, selectedOption }: SelectorRowProps) => (
  <div className="flex flex-row justify-around background-dark-blue-3 py-4 text-white">
    {options.map((option: SelectorRowOption) => {
      const buttonClassName = cx("p-2", option.value === selectedOption && "background-light-blue-1 rounded-md");
      return (
        <button
          aria-label={option.ariaLabel}
          key={option.label}
          onClick={() => {
            onOptionsSelected(option.value);
          }}
          className={buttonClassName}>
          {option.label}
        </button>
      );
    })}
  </div>
);
