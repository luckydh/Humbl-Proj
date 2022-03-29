import React, { useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import { useMeLazyQuery, useUpdateAccountImageMutation, useUpdateMerchantProfileMutation } from "generated/graphql";
import { ProfileAvatarSkeleton } from "../../components/Avatar/Avatar";
import { useTranslation } from "react-i18next";
import { presentToast } from "utils/toast";
import { Rect } from "self-define-app";
import { IMerchantFormInputs, MerchantForm } from "components/CreateMerchantForm/CreateMerchantForm";
import { setCurrentAccount } from "state/cache";
import { joiResolver } from "@hookform/resolvers/joi";
import ImageEditSelector from "components/imageUploader/ImageSelector";
import { useMerchantFormSchema } from "hooks/useMerchantFormSchema";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { captureException } from "ErrorLogger";

interface IFormInputs extends IMerchantFormInputs {
  image?: string;
}

const MerchantProfileUpdate: React.FC = () => {
  const { currentAccount } = useGetCurrentAccount();
  const [updateAccountImageMutation] = useUpdateAccountImageMutation();
  const history = useHistory();

  const { t } = useTranslation();
  const schema = useMerchantFormSchema();

  const defaultValues = {
    displayName: currentAccount?.displayName,
    currency: currentAccount?.merchantProfileDetails?.currency,
    phoneNumber: currentAccount?.phone,
    merchantType: currentAccount?.merchantProfileDetails?.merchantType,
    hasAddress: !!currentAccount?.merchantProfileDetails?.address?.city,
    location: {
      city: currentAccount?.merchantProfileDetails?.address?.city,
      street: currentAccount?.merchantProfileDetails?.address?.street,
      additional: currentAccount?.merchantProfileDetails?.address?.streetAdditional,
      region: currentAccount?.merchantProfileDetails?.address?.region,
      postal: currentAccount?.merchantProfileDetails?.address?.postal,
      country: currentAccount?.country?.alpha2,
    },
  };

  const form = useForm<IFormInputs>({
    defaultValues,
    shouldFocusError: false,
    shouldUnregister: false,
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
      stripUnknown: true,
    }),
  });

  const goToProfile = () => {
    history.goBack();
  };

  const { handleSubmit, reset } = form;
  const [image, setImage] = useState<string | undefined>();
  // mutations work as this returns a function that I can pass values into later.
  const [updateMerchantProfileMutation, { loading: updateLoading }] = useUpdateMerchantProfileMutation({
    onCompleted: () => {
      getAccount();
      presentToast(t("profile.edit.form.success"), 2000, "success");
    },
    onError: (error) => {
      if (error.message === "Address entered was not found.") {
        presentToast(t("profile.edit.form.address-error"), 2000, "danger");
      }
      presentToast(t("profile.edit.form.error"), 2000, "danger");
      captureException(error);
    },
  });

  const [getAccount] = useMeLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      reset({
        displayName: data.me?.displayName,
        currency: data.me?.merchantProfileDetails?.currency,
        phoneNumber: data.me?.phone,
        merchantType: data.me?.merchantProfileDetails?.merchantType,
        hasAddress: !!data?.me?.merchantProfileDetails?.address?.city,
        location: {
          city: data.me?.merchantProfileDetails?.address?.city,
          street: data.me?.merchantProfileDetails?.address?.street,
          additional: data.me?.merchantProfileDetails?.address?.streetAdditional,
          region: data.me?.merchantProfileDetails?.address?.region,
          postal: data.me?.merchantProfileDetails?.address?.postal,
          country: data.me?.merchantProfileDetails?.countryCode,
        },
      });
      setCurrentAccount(data.me);
    },
  });

  const updateMerchantProfile = async (data: IFormInputs) => {
    const dataToUpdate: Partial<IFormInputs> = data;
    if (!dataToUpdate.hasAddress) {
      dataToUpdate.location = {
        country: dataToUpdate.location?.country ?? "",
      };
    }

    await updateMerchantProfileMutation({
      variables: data,
    });
  };

  if (updateLoading) {
    return (
      <div className="flex-grow align-start">
        <div className="my-10">
          <ProfileAvatarSkeleton />
        </div>
      </div>
    );
  }

  const handleFinish = async (imageString: string, _dimensions: Rect) => {
    try {
      const imageData = await updateAccountImageMutation({
        variables: {
          image: imageString,
        },
      });

      if (imageData.data?.updateAccountImage?.image) {
        setImage(imageData.data?.updateAccountImage?.image);
      }
    } catch (e) {
      // ignore error
    }
  };

  return (
    <>
      <div className="pb-4">
        <div className="flex relative my-10 justify-center">
          <ImageEditSelector onFinish={handleFinish} image={image || currentAccount?.image} />
        </div>

        <div className="py-5 flex-col flex">
          <form className="flex flex-col" onSubmit={handleSubmit(updateMerchantProfile)}>
            <MerchantForm form={form} mode="edit" />
            <Button type="submit">{t("merchant-profile-update-page.button.update-profile")}</Button>
            <Button variant="text" className="my-4" onClick={goToProfile}>
              {t("profile.edit.button.cancel-changes")}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MerchantProfileUpdate;
