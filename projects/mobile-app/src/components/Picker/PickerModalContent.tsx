import React from "react";

interface Props {
  title?: string;
}

export const PickerModalContent: React.FC<Props> = ({ children, title }) => (
    <div className="px-8 flex flex-col justify-center h-full">
      <div
        className="bg-blue rounded-lg text-left overflow-hidden shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-blue pt-5">
          <div className="text-center sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-white pb-4 text-center w-full"
              id="modal-headline"
            >
              {title}
            </h3>
            <div className="flex flex-col">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
