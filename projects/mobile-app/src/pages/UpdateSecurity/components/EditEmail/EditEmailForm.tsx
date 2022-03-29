import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { getSchema } from "pages/MerchantOnboarding/utils/getSchema";
import { RenderFormFields } from "pages/MerchantOnboarding/utils/RenderFormFields";
import Button from "components/Button/Button";
import { Countries } from "../../../../utils/Countries";
import { EditEmailFormSchema } from "./EditEmailSchema";
import firebase from "../../../../Firebase";
import { presentToast } from "utils/toast";

export interface EditEmailFormProps {
  countryCode: Countries;
  onBack: () => void;
}

interface EditEmailFormInputs {
  password: string;
  newEmail: string;
}

export const EditEmailForm = ({ countryCode, onBack }: EditEmailFormProps) => {
  const { t } = useTranslation();
  const { fields, schema } = getSchema(EditEmailFormSchema(), Countries[countryCode]);
  const [userEmail, setUserEmail] = useState(firebase.auth().currentUser!.email!);
  const { register, handleSubmit, errors, control, setError } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  const updateEmail = async (newEmail: string, password: string) => {
    if (userEmail === newEmail) {
      setError("newEmail", {
        message: t("page-update-security.toast-text.email-the-same"),
      });
      return;
    }

    const { currentUser } = firebase.auth();
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      currentUser!.email!,
      password
    );

    return currentUser!
      .reauthenticateWithCredential(credential)
      .then(() =>
        currentUser!.updateEmail(newEmail).then(() => {
          presentToast(t("page-update-security.toast-text.email-successfully-updated"), 2000, "success");
          setUserEmail(firebase.auth().currentUser!.email!);
          onBack();
        })
      )
      .catch((error) => {
        if (error?.code === "auth/wrong-password") {
          setError("password", {
            message: t("page-update-security.message.wrong-password"),
          });
        } else {
          presentToast(t("page-update-security.toast-text.error-while-updating-email"), 2000, "danger");
        }
      });
  };

  const handleSubmitSuccess = (data: EditEmailFormInputs) => {
    updateEmail(data.newEmail, data.password);
  };

  return (
    <div className="flex flex-grow flex-col overflow-y-auto overscroll-y-none">
      <div className="m-4 mb-8 text-center">{t("page-update-security.subheader.in-order-to-update")}</div>
      <form className="flex flex-grow flex-col" onSubmit={handleSubmit(handleSubmitSuccess)}>
        <div className="flex-grow">
          <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
        </div>
        <Button className="mb-3 px-6" type="submit">
          {t("page-update-security.email-edit.button.save", "Save")}
        </Button>
        <Button className="px-6" variant="outline" onClick={onBack}>
          {t("page-update-security.email-edit.button.cancel", "Cancel")}
        </Button>
      </form>
    </div>
  );
};
