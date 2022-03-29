import React from "react";
import { IonAvatar, IonButton, IonInput, IonItem, IonLabel, IonModal, IonPage } from "@ionic/react";

import { AccountType } from "../../generated/graphql";
import { useForm } from "react-hook-form";

const ProfilePayment = ({
  showModal,
  setShowModal,
  account,
}: {
  showModal: boolean;
  setShowModal: Function;
  account: AccountType;
}): React.ReactElement => {
  const { register, handleSubmit, watch } = useForm();

  const watchedAmount = watch();
  const onSubmit = () => {
    // TODO is this supposed to be doing anything? should it be setting data?
    // setData(data);
  };

  return (
    <IonModal
      isOpen={showModal}
      // backdropDismiss={false}
      onWillDismiss={() => {
        setShowModal(false);
      }}
      cssClass="my-custom-class">
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonPage>
          <IonButton
            onClick={() => {
              setShowModal(false);
            }}>
            Close Modal
          </IonButton>
          <p>This is PAYMENT MODAL</p>
          <IonAvatar>
            <img
              src={`https://ui-avatars.com/api/?background=random&name=${account.displayName}`}
              alt={`HUMBL Avatar - ${account.userName}`}
            />
          </IonAvatar>
          <div>Display Name: {account.displayName}</div>
          <div>User Name{account.userName}</div>
          <IonItem>
            <IonLabel>Amount (MXN)</IonLabel>
            <IonInput
              ref={register({
                // required: true,
                valueAsNumber: true,
              })}
              type="number"
              step="0.01"
              name="transferAmount"
            />
          </IonItem>
          <div>
            {watchedAmount.transferAmount ? (
              <>~ USD AMOUNT: ${(watchedAmount.transferAmount * 0.0503322549).toFixed(2)} USD</>
            ) : (
              ""
            )}
          </div>
          <IonButton type="submit">Review Transfer</IonButton>
        </IonPage>
      </form>
    </IonModal>
  );
};

export default ProfilePayment;
