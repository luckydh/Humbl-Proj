import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { getSchema } from "pages/MerchantOnboarding/utils/getSchema";
import { RenderFormFields } from "pages/MerchantOnboarding/utils/RenderFormFields";
import Button from "components/Button/Button";
import { Countries } from "../../../../utils/Countries";
import { EditPasswordFormSchema } from "./EditPasswordSchema";
import firebase from "../../../../Firebase";
import { presentToast } from "utils/toast";

export interface EditPasswordFormProps {
  countryCode: Countries;
  onBack: () => void;
}

interface EditPasswordFormInputs {
  currentPassword: string;
  newPassword: string;
}

export const EditPasswordForm = ({ countryCode, onBack }: EditPasswordFormProps) => {
  const { t } = useTranslation();
  const { fields, schema } = getSchema(EditPasswordFormSchema(), Countries[countryCode]);
  const { register, handleSubmit, errors, control, setError } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    const { currentUser } = firebase.auth();

    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      currentUser!.email!,
      oldPassword
    );

    return currentUser!
      .reauthenticateWithCredential(credential)
      .then(() =>
        currentUser!.updatePassword(newPassword).then(() => {
          presentToast(t("page-update-security.toast-text.password-successfully-updated"), 2000, "success");
          onBack();
        })
      )
      .catch((error) => {
        if (error?.code === "auth/wrong-password") {
          setError("currentPassword", {
            message: t("page-update-security.message.wrong-password"),
          });
        } else {
          presentToast(t("page-update-security.toast-text.error-while-updating-password"), 2000, "danger");
        }
      });
  };

  const handleSubmitSuccess = (data: EditPasswordFormInputs) => {
    updatePassword(data.currentPassword, data.newPassword);
  };

  return (
    <div className="flex flex-grow flex-col overflow-y-auto overscroll-y-none">
      <div className="m-4 mb-8 text-center">
        {t("page-update-security.subheader.please-input-your-current-password")}
      </div>
      <form className="flex flex-grow flex-col" onSubmit={handleSubmit(handleSubmitSuccess)}>
        <div className="flex-grow">
          <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
        </div>
        <Button className="mb-3 px-6" type="submit">
          {t("page-update-security.password-edit.button.save")}
        </Button>
        <Button className="px-6" variant="outline" onClick={onBack}>
          {t("page-update-security.password-edit.button.cancel")}
        </Button>
      </form>
    </div>
  );
};
