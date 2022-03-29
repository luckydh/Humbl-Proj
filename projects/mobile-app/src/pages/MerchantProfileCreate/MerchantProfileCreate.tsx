import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateMerchantMutation, useMyAccountsQuery } from "generated/graphql";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { LayoutPrimary } from "components/PageTemplates/LayoutPrimary";
import { useTranslation } from "react-i18next";
import { setCurrentAccountId } from "state/cache";
import ImageEditSelector from "components/imageUploader/ImageSelector";
import { MerchantForm } from "components/CreateMerchantForm/CreateMerchantForm";
import { joiResolver } from "@hookform/resolvers/joi";
import { IFormInputs, useMerchantFormSchema } from "hooks/useMerchantFormSchema";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { captureException } from "ErrorLogger";
import Button from "../../components/Button/Button";

const initialValues = {
  displayName: "",
  currency: undefined,
  phoneNumber: "",
  userName: "",
  merchantType: "",
  hasAddress: false,
  location: {},
};

const CreateMerchantProfile: React.FC = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const [image, setImage] = useState<string | undefined>();
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const schema = useMerchantFormSchema(true);
  const { refetch } = useGetCurrentAccount();
  const { refetch: AccountsRefetch } = useMyAccountsQuery();

  const form = useForm<IFormInputs>({
    defaultValues: initialValues,
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  const { handleSubmit } = form;
  // mutations work as this returns a function that I can pass values into later.
  const [createMerchantMutation, { error }] = useCreateMerchantMutation();

  const submitNewMerchant = async (data: IFormInputs) => {
    trackEvent(EVENTS.MERCHANT_APPLICATION_STATUS, { type: "Profile" });
    if (!usernameAvailable) {
      return;
    }

    const newMerchant = await createMerchantMutation({
      variables: {
        ...data,
        base64Image: image,
      },
    });

    if (!error) {
      if (newMerchant.data?.createMerchant) {
        await setCurrentAccountId(newMerchant.data.createMerchant.id);
        // Apollo magic sauce to fetch from the server the updated information.
        // In the future this We should have this part just update the local cache.
        await refetch();
        // this does the same as above but for the accounts query. In future:
        // We should have this part just update the local cache.
        await AccountsRefetch();
      }
      history.replace("/merchantcreatesuccess", { merchant: data });
    } else {
      captureException(error);
    }
  };

  const handleImageAdd = (base64Image: string) => {
    setImage(base64Image);
  };

  const handleValidateUsername = (isValid: boolean) => {
    setUsernameAvailable(isValid);
  };

  return (
    <LayoutPrimary showBackButton background="bg-profiles">
      <div className="px-6 pb-4">
        <h1 className="text-center font-medium mt-6 text-3xl text-white">
          {t("merchant-create-page.title.create-merchant-profile")}
        </h1>
        <div className="flex relative mt-12 mb-8 justify-center">
          <ImageEditSelector onFinish={handleImageAdd} image={image} />
        </div>

        <div className="py-5 flex-col flex">
          <form className="flex flex-col" onSubmit={handleSubmit(submitNewMerchant)}>
            <MerchantForm form={form} onValidateUserName={handleValidateUsername} />
            <Button type="submit">{t("merchant-create-page.button.create-merchant-profile")}</Button>
          </form>
        </div>
      </div>
    </LayoutPrimary>
  );
};

export default CreateMerchantProfile;
