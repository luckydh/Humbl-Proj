import { IonSlide, IonSlides } from "@ionic/react";
import React, { useMemo, useRef, useState } from "react";
import "./style.scss";
import Button from "components/Button/Button";
import OnboardingOneIcon from "assets/images/OnboardingOneIcon.png";
import OnboardingTwoIcon from "assets/images/OnboardingTwoIcon.png";
import OnboardingThreeIcon from "assets/images/OnboardingThreeIcon.png";
import OnboardingFourIcon from "assets/images/OnboardingFourIcon.png";
import OnboardingFiveIcon from "assets/images/OnboardingFiveIcon.png";
import { useTranslation } from "react-i18next";
import { LayoutPrimary } from "components/PageTemplates/LayoutPrimary";
import cx from "classnames";
import { times } from "lodash";
import { useFeatureFlag } from "utils/Feature";

export interface OnboardingProps {
  setShouldShowOnBoardingBoolean: (val: boolean) => void;
}

const onboardingImageList = [
  OnboardingOneIcon,
  OnboardingTwoIcon,
  OnboardingThreeIcon,
  OnboardingFourIcon,
  OnboardingFiveIcon,
];

const numToWords = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"];
const testIdObject = {
  image: "CARD_IMAGE",
  title: "CARD_TITLE_LABEL",
  body: "CARD_BODY_LABEL",
};

export const Onboarding: React.FC<OnboardingProps> = ({ setShouldShowOnBoardingBoolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  const ionSlides = useRef<HTMLIonSlidesElement>(null);
  const gainInterestFeatureEnabled = useFeatureFlag("humblPay-interestgaining-temp-091221");

  // Ionic doesn't really provide a event for this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getIndex = async (event: any) => {
    const index = await event.target.getActiveIndex();
    setCurrentIndex(index);
  };

  const slidesList = useMemo(() => {
    const list = [
      {
        title: t("crypto-wallet.onboarding.title.introduction-to-humbl"),
        description: t("crypto-wallet.onboarding.description.learn-about"),
      },
      {
        title: t("crypto-wallet.onboarding.title.buy-sell-crypto"),
        description: t("crypto-wallet.onboarding.description.easy-access"),
      },
      {
        title: t("crypto-wallet.onboarding.title.peg-to-stablecoin"),
        description: t("crypto-wallet.onboarding.description.a-void-the-markets"),
      },
      {
        title: t("crypto-wallet.onboarding.title.send-receive"),
        description: t("crypto-wallet.onboarding.description.this-wallet-powers"),
      },
    ];

    // If gain feature is enabled lets add interest
    // slide data to list at the right position.
    if (gainInterestFeatureEnabled) {
      list.splice(2, 0, {
        title: t("crypto-wallet.onboarding.title.earn-interest"),
        description: t("crypto-wallet.onboarding.description.purchase-interest"),
      });
    }

    return list;
  }, [gainInterestFeatureEnabled, t]);

  const lastSlideIndex = slidesList.length - 1;

  const onNextButtonClick = () => {
    if (currentIndex === lastSlideIndex) {
      setShouldShowOnBoardingBoolean(false);
    } else {
      ionSlides.current?.slideNext();
    }
  };

  return (
    <LayoutPrimary background="bg-profiles" hideFooter>
      <div className="safe-area-top fixed right-2.5 sm:right-5 top-6">
        <button
          aria-label="ONBOARDING_SKIP_BUTTON"
          className="justify-center text-white text-blue-dark text-base"
          onClick={() => {
            setShouldShowOnBoardingBoolean(false);
          }}>
          {t("crypto-wallet.onboarding.skip")}
        </button>
      </div>
      <div className="bg-onboardingBackground bg-cover absolute bottom-0 w-full" style={{ height: "52vh" }} />
      <div className="h-full">
        <div className="flex flex-col h-full w-full">
          {/* We pass in the list length as a key to force a re-render when the list size changes */}
          <IonSlides
            key={slidesList.length}
            onIonSlideDidChange={getIndex}
            pager={false}
            ref={ionSlides}
            options={{
              centeredSlides: true,
              spaceBetween: 10,
              slidesPerView: 1.5,
            }}>
            {slidesList.map((slide, idx) => (
              <IonSlide className="flex flex-col items-center justify-center" key={slide.title}>
                <OnBoardingScreens
                  testIdImage={`${numToWords[idx]}${testIdObject.image}`}
                  testIdTitle={`${numToWords[idx]}${testIdObject.title}`}
                  testIdBody={`${numToWords[idx]}${testIdObject.body}`}
                  totalItems={slidesList.length}
                  image={onboardingImageList[idx]}
                  title={slide.title}
                  description={slide.description}
                  currentIndex={currentIndex}
                />
              </IonSlide>
            ))}
          </IonSlides>
          <div className="mt-auto mx-8 items-center mb-8 btn-onboarding relative">
            <Button ariaLabel="CARD_NEXT_BUTTON" type="submit" onClick={onNextButtonClick}>
              {currentIndex === lastSlideIndex
                ? t("crypto-wallet.onboarding.button-label.done")
                : t("crypto-wallet.onboarding.button-label.next")}
            </Button>
          </div>
        </div>
      </div>
    </LayoutPrimary>
  );
};

interface OnBoardingScreensItems {
  title: string;
  description: string;
  currentIndex: number;
  image: string;
  totalItems: number;
  testIdImage: string;
  testIdTitle: string;
  testIdBody: string;
}
const OnBoardingScreens: React.FC<OnBoardingScreensItems> = ({
  image,
  title,
  description,
  currentIndex,
  totalItems,
  testIdImage,
  testIdTitle,
  testIdBody,
}) => (
  <>
    <img aria-label={testIdImage} className="!max-h-[65%]" src={image} alt="test" />
    <div
      aria-label="ONBOARDING_5STEP_CAROUSEL"
      className="swiper-pagination swiper-pagination-bullets static leading-[0]">
      {times(totalItems, (i) => (
        <span
          key={i}
          className={cx("swiper-pagination-bullet", {
            "swiper-pagination-bullet-active": currentIndex === i,
          })}
        />
      ))}
    </div>
    <div className="pt-2 min-w-[12rem] max-w-sm h-36">
      <p aria-label={testIdTitle} className="font-semibold text-blue-dark text-center text-xl">
        {title}
      </p>
      <p aria-label={testIdBody} className="flex font-normal justify-center text-base text-blue-dark text-center">
        {description}
      </p>
    </div>
  </>
);
