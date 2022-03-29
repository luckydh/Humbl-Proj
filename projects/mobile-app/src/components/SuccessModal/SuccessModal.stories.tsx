import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";

import { IonContent } from "@ionic/react";
import SuccessModal, { SuccessModalProps } from ".";

export default {
  decorators: [withPadding],
  title: "Modals/SuccessModal",
  component: SuccessModal,
} as Meta;

const Template: Story<SuccessModalProps> = () => (
    <IonContent className="bg-green-300">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga eaque amet
      voluptatum, nostrum dicta sint reprehenderit consectetur, facilis nulla doloribus
      consequuntur rem repellat sequi quas corporis cupiditate architecto accusantium
      nemo.
      <SuccessModal isOpen={true} message="Test Message" />
    </IonContent>
  );

export const Success = Template.bind({});
