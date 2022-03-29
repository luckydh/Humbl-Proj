import React, { useMemo } from "react";
import { MerchantOnboardingChecklist } from "../../../components/MerchantOnboardingChecklist/MerchantOnboardingChecklist";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { ChecklistStatus } from "../../../components/MerchantOnboardingChecklist/ChecklistStatus";
import { RatingDisplay } from "../../../components/Rating/Rating";
import { IonBadge } from "@ionic/react";
import { NoReviewsBalloon } from "../../../assets/svgs/NoReviewsBalloon";
import { ReviewDetailsCard } from "components/ReviewDetailsCard/ReviewDetailsCard";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { Loading } from "components/Loading";
import { useStripeOnboardingStatus } from "utils/hooks/useStripeOnboardingStatus";
import { GovIdRequiredCard } from "components/GovIdRequiredCard/GovIdRequiredCard";

export const MerchantProfileContainer = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { currentAccount, loading } = useGetCurrentAccount();

  const {
    processing: processingStatus,
    restricted,
    restrictedSoon,
    showMerchantOnboardingChecklist,
    showNoRatings,
    showRatings,
    documentVerificationRequiredSoon,
    documentVerificationRequired,
  } = useStripeOnboardingStatus(currentAccount);

  const openZendeskSite = () => {
    window.open("https://humblpay.zendesk.com/hc/en-us", "_blank");
  };

  const hasOnboarded = !!currentAccount?.merchantProfileDetails?.businessDetails?.hasOnboarded;
  const hasBanking = !!currentAccount?.merchantProfileDetails?.businessDetails?.hasBanking;

  const checklistItems = useMemo(() => {
    const bankingStep = hasBanking ? ChecklistStatus.COMPLETE : ChecklistStatus.LOCKED;
    return [
      {
        label: t("merchant.profile"),
        status: ChecklistStatus.COMPLETE,
        onClick: () => {
          history.push("/merchant-onboarding");
        },
      },
      {
        label: t("merchant-profile.business-details"),
        status: hasOnboarded ? ChecklistStatus.PENDING : ChecklistStatus.CURRENT,
        hideIcon: hasOnboarded,
        onClick: () => {
          history.push("/merchant-onboarding");
        },
      },
      {
        label: t("merchant.profile.bank-information"),
        status: bankingStep,
        onClick: () => {
          history.push("/update-bank-info");
        },
      },
    ];
  }, [hasOnboarded, hasBanking, history, t]);

  if (loading || processingStatus) {
    return (
      <div className="flex items-center justify-center">
        <Loading loading={loading} />
      </div>
    );
  }

  return (
    <>
      {showRatings && (
        <>
          <div className="flex flex-row justify-center items-center mt-2 mb-6" aria-label="ratings-container">
            <IonBadge
              color={"primary"}
              className="text-white text"
              style={{ background: "transparent" }}
              aria-label="current-rating">
              {currentAccount?.averageRating?.toFixed(1)}
            </IonBadge>
            <RatingDisplay rating={currentAccount?.averageRating || 0} size="small" className="mt-1 mb-2 mx-2" />
            <IonBadge
              color={"primary"}
              className="text-white text cursor-pointer"
              style={{ background: "#3b5b7b" }}
              onClick={() => {
                history.push(`/account/${currentAccount?.id}/ratings`);
              }}>
              {currentAccount?.reviews?.pageInfo.totalCount}
            </IonBadge>
          </div>
        </>
      )}
      {documentVerificationRequiredSoon && !documentVerificationRequired && !restricted && !restrictedSoon && (
        <div className="px-5">
          <GovIdRequiredCard
            status={"documentVerificationRequiredSoon"}
            onCtaClick={openZendeskSite}
            dueDate={currentAccount?.merchantProfileDetails?.businessDetails?.requirementsDueDate}
          />
        </div>
      )}
      {documentVerificationRequired && !restricted && !restrictedSoon && (
        <div className="px-5">
          <GovIdRequiredCard status={"documentVerificationRequired"} onCtaClick={openZendeskSite} />
        </div>
      )}
      {restricted && (
        <div className="px-5">
          <ReviewDetailsCard status="restricted" onCtaClick={() => history.push("/merchant-onboarding-update")} />
        </div>
      )}
      {restrictedSoon && (
        <div className="px-5">
          <ReviewDetailsCard
            dueDate={currentAccount?.merchantProfileDetails?.businessDetails?.requirementsDueDate}
            status="restrictedSoon"
            onCtaClick={() => history.push("/merchant-onboarding-update")}
          />
        </div>
      )}
      {showMerchantOnboardingChecklist && (
        <>
          <div className="flex flex-col items-center mb-4 text-white">
            <p>{t("profile-view-merchant-page.checklist.text-1")}</p>
            <p>{t("profile-view-merchant-page.checklist.text-2")}</p>
          </div>
          <div className="px-5 my-2">
            <MerchantOnboardingChecklist items={checklistItems} />
          </div>
        </>
      )}

      {showNoRatings && (
        <div className="flex flex-col">
          <div className="flex flex-col text-white items-center px-3 text-center my-10">
            <NoReviewsBalloon />
          </div>
          <div className="flex flex-col text-white items-center px-3 text-center mt-6">
            <span className="mb-2 text-lg">{t("merchant-profile.no-reviews-line-1")}</span>
            <span className="text-sm">{t("merchant-profile.no-reviews-line-2")}</span>
          </div>
        </div>
      )}
    </>
  );
};
