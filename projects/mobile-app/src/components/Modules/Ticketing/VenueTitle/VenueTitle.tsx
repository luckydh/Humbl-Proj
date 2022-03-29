import React from "react";
import { Transition } from "@headlessui/react";
import { useInView } from "react-intersection-observer";
import { AddressType } from "generated/graphql";
import { BackIcon } from "assets/svgs/BackIcon";
import { LocationIcon } from "assets/svgs/LocationIcon";

import "./styles.scss";

export interface VenueTitleProps {
  title: string;
  address: AddressType;
}

export const VenueTitle: React.FC<VenueTitleProps> = ({ title, address }) => {
  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0.9,
  });

  const onClickBack = () => {
    document.querySelector<HTMLIonContentElement>("#scrollable-view")?.scrollToTop(150);
  };

  return (
    <>
      <div ref={ref} data-testid="venue-title-full" className="p-6 -mx-6 bg-gradient">
        <h1 className="text-white text-2xl font-semibold tracking-tight leading-tight mb-3">
          {title}
        </h1>
        <div className="flex items-center">
          <LocationIcon className="mr-2" />
          <h2 className="text-blue-dark text-base font-semibold tracking-tight leading-none">
            {address.street}
            <br />
            {address.city}, {address.region} {address.postal}
          </h2>
        </div>
      </div>
      <Transition
        show={!inView}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed top-0 left-0 right-0 shadow-md z-10"
      >
        <div
          data-testid="venue-title-fixed"
          className="bg-blue py-5 pl-4 pr-6 flex items-center"
        >
          <button
            onClick={onClickBack}
            className="scroll-to-top-button text-white transform rotate-90 flex items-center justify-center"
          >
            <BackIcon />
          </button>
          <h1 className="text-white text-xl font-semibold tracking-tight leading-tight text-center flex-1 mx-4">
            {title}
          </h1>
        </div>
      </Transition>
    </>
  );
};

export default VenueTitle;
VenueTitle.displayName = "VenueTitle";
