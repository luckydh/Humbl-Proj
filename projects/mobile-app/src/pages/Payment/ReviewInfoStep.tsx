import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useCreateReviewMutation, AccountType } from "generated/graphql";
import { Message } from "components/Message/Message";
import { TextArea } from "components/TextArea/TextArea";
import { ProfileAvatar } from "components/Avatar/Avatar";
import { Button } from "components/Button/Button";
import { Rating } from "components/Rating/Rating";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { close } from "ionicons/icons";
import { useHistory } from "react-router";

interface ReviewFields {
  details: string;
  rating: number;
}

interface Props {
  account: AccountType;
  transactionId: string;
  onComplete: () => void;
}

export const ReviewInfoStep: React.FC<Props> = ({ account, transactionId, onComplete }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [rating, setRating] = useState<number>(0);
  const [createReview, { loading, error }] = useCreateReviewMutation();

  const { register, handleSubmit, setValue, errors, trigger } = useForm<ReviewFields>({
    mode: "onChange",
    defaultValues: { details: "" },
  });

  const submitReview = async (values: ReviewFields) => {
    try {
      await createReview({
        variables: {
          rating,
          details: values.details,
          merchantId: account.id,
          relatedTransaction: transactionId,
        },
      });

      onComplete();
    } catch (e) {
      // this catch block prevents "Unexpected promise rejection"
      // the error is being treated in the "error" prop of the mutation hook
    }
  };

  const updateRating = (val: number) => {
    setRating(val);
    setValue("rating", val);
    trigger("rating");
  };
  const handleDismissReview = () => {
    history.replace(`/account/${account.id}`);
  };

  return (
    <LayoutModal
      title={t("payment-page.title.write-a-review")}
      onClickBack={handleDismissReview}
      leftClickIcon={<IonIcon icon={close} className="text-3xl" />}
    >
      <div className="flex flex-col h-full">
        <div className="mt-5 mb-8">
          <ProfileAvatar size="medium" username={account.userName} src={account.image} name={account.displayName} />
        </div>
        <form onSubmit={handleSubmit(submitReview)} className="flex flex-col flex-grow justify-between">
          <div className="mb-10 flex-col flex justify-center items-center">
            <Rating value={rating} onChange={updateRating} />
            <input
              type="hidden"
              name="rating"
              ref={register({
                required: {
                  value: true,
                  message: t("page-review.rating.error.required.select-a-rating"),
                },
              })}
            />
            {errors.rating?.message && (
              <div className="mt-4">
                <div className="text-white text-lg">{errors.rating?.message}</div>
              </div>
            )}
          </div>
          <TextArea
            name="details"
            placeholder={t("payment-page.input.placeholder.write-a-review")}
            register={register({
              maxLength: {
                value: 280,
                message: t("payment-page.input.details.error.details-max-length-280"),
              },
            })}
          />
          {errors.details?.message && (
            <div className="mt-4">
              <Message variant="error">{errors.details?.message}</Message>
            </div>
          )}
          {error && (
            <div className="mt-4">
              <Message variant="error">{t("payment-page.error.error-submitting-review")}</Message>
            </div>
          )}
          <div className="relative bottom-0 flex py-4 flex-col mb-10">
            <Button type="submit" isDisabled={loading}>
              {!loading ? t("payment-page.action.submit") : t("payment-page.message.please-wait")}
            </Button>
          </div>
        </form>
      </div>
    </LayoutModal>
  );
};

export default ReviewInfoStep;
