import withPadding from "../../utils/withPadding";
import { Meta, Story } from "@storybook/react/types-6-0";
import { InfiniteScroll, InfiniteScrollProps } from "./InfiniteScroll";
import React, { useState } from "react";
import { IonPage } from "@ionic/react";

export default {
  title: "Components/InfiniteScroll",
  component: InfiniteScroll,
  argTypes: {},
  decorators: [withPadding],
} as Meta;
const initialTestState: any[] = [];
let count = 0;
for (let i = 0; i < 50; i+=1) {
  count += 1;
  initialTestState.push(<p key={count}>Item #{i}</p>);
}

const Template: Story<InfiniteScrollProps> = (args) => {
  const [state, setState] = useState(initialTestState);
  const [loadingState, setLoadingState] = useState(false);
  const addNewItemsToState = () => {
    const itemsToAdd = Math.floor(Math.random() * (10 - 1) + 1);
    setLoadingState(true);
    setTimeout(() => {
      const newItems: any[] = [];
      for (let i = 0; i < itemsToAdd; i+=1) {
        newItems.push(
          <p key={state.length + i}>
            Item NEW #{i} ({state.length + i})
          </p>
        );
      }
      setState((prevState) => [...prevState, ...newItems]);
      setLoadingState(false);
    }, 3000);
  };
  return (
    <IonPage>
      <InfiniteScroll {...args} onScrollDown={() => addNewItemsToState()} showLoader={loadingState}>
        {state}
      </InfiniteScroll>
    </IonPage>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

export const DisabledInfiniteScroll = Template.bind({});
DisabledInfiniteScroll.args = { disableInfiniteScroll: true };
