import React, { useState } from "react";
import { IonRow, IonCol } from "@ionic/react";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import firebase from "../../../../Firebase";
import { useTranslation } from "react-i18next";
import { ButtonClickType } from "../../UpdateSecurity";

interface IFormInputs {
  email: string;
  password: string;
}

interface SecuritySettingProps {
  onButtonClick: (editType: ButtonClickType) => void;
}

const SecuritySetting = ({ onButtonClick }: SecuritySettingProps) => {
  const { t } = useTranslation();
  const { register } = useForm<IFormInputs>({
    mode: "onChange",
  });

  const [userEmail] = useState(firebase.auth().currentUser!.email!);

  return (
    <>
      <div className="flex flex-col w-full h-full items-center justify-center -mt-12">
        <IonRow>
          <IonCol size="9">
            <div className="mr-2">
              <Input
                label={t("page-update-security.label.email-address")}
                placeholder={t("page-update-security.placeholder.email")}
                name="email"
                type="email"
                register={register({ required: false })}
                readOnly
                value={userEmail}
              />
            </div>
          </IonCol>
          <IonCol size="3">
            <div className="flex flex-col items-center justify-end h-full pb-4">
              <Button variant="square" onClick={() => onButtonClick(ButtonClickType.EDIT_EMAIL)}>
                {t("page-update-security.security-setting.edit", "Edit")}
              </Button>
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="9">
            <div className="mr-2">
              <Input
                label={t("page-update-security.label.password")}
                placeholder={t("page-update-security.placeholder.password")}
                name="password"
                type="password"
                value="password"
                readOnly
                register={register({ required: false })}
              />
            </div>
          </IonCol>
          <IonCol size="3">
            <div className="flex flex-col items-center justify-end h-full pb-4">
              <Button variant="square" onClick={() => onButtonClick(ButtonClickType.EDIT_PASSWORD)}>
                {t("page-update-security.security-setting.edit", "Edit")}
              </Button>
            </div>
          </IonCol>
        </IonRow>
      </div>
    </>
  );
};

export default SecuritySetting;
