import React, { ChangeEvent, FC, useCallback, useState } from "react";

const CloseIcon = () => (
  <svg width="21" height="21" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.39 10.153l7.593-7.593a1.113 1.113 0 000-1.571l-.665-.665a1.113 1.113 0 00-1.571 0l-7.593 7.593L2.561.324a1.113 1.113 0 00-1.57 0L.325.989a1.111 1.111 0 000 1.571l7.593 7.593-7.593 7.593a1.114 1.114 0 000 1.571l.665.667a1.113 1.113 0 001.57 0l7.593-7.593 7.594 7.593a1.1 1.1 0 00.785.324 1.1 1.1 0 00.786-.324l.665-.665a1.114 1.114 0 000-1.571l-7.593-7.595z"
      className="fill-current text-white-faded"
      fillRule="nonzero"
    />
  </svg>
);

CloseIcon.displayName = "CloseIcon";

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={20} height={21} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.085 13.35a7.745 7.745 0 001.51-4.592c0-4.299-3.498-7.797-7.798-7.797C3.498.961 0 4.459 0 8.758c0 4.3 3.498 7.798 7.797 7.798a7.745 7.745 0 004.592-1.51l5.108 5.108 1.696-1.696-5.108-5.108zm-6.288.806A5.404 5.404 0 012.4 8.758 5.404 5.404 0 017.797 3.36a5.404 5.404 0 015.398 5.398 5.404 5.404 0 01-5.398 5.398z"
      fill="#fff"
    />
  </svg>
);

SearchIcon.displayName = "SearchIcon";

export interface SearchInputProps {
  /** Respond to input value change */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Respond to clear button click */
  onClear?: () => void;
  placeholder?: string;
  ariaLabel?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ onChange, onClear, placeholder, ariaLabel }) => {
  const [value, setValue] = useState("");

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.replace(
        /[\uD800-\uDBFF]|[\u2702-\u27B0]|[\uF680-\uF6C0]|[\u24C2-\uF251]/g,
        ""
      );
      onChange?.(event);
      setValue(newValue);
    },
    [onChange]
  );

  const onClearClickHandler = useCallback(() => {
    setValue("");
    onClear?.();
  }, [onClear]);

  return (
    <div
      aria-label={ariaLabel && `${ariaLabel}_SEARCH_FIELD`}
      style={{ minHeight: 48 }}
      className="flex items-center w-full px-2 py-0 border-2 border-white rounded-lg select-none bg-none">
      <SearchIcon />
      <input
        className="w-full ml-3 text-xl text-white bg-transparent placeholder-white-faded"
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
      />
      {value !== "" && (
        <button
          aria-label={ariaLabel && `${ariaLabel}_ERASE_BUTTON`}
          className="flex-none mr-1"
          onClick={onClearClickHandler}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

SearchInput.displayName = "SearchInput";
