import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { bankBlueIcon } from "assets/icons";
import { CheckBoxCard, CheckBoxCardProps } from "./CheckBoxCard";
import { CheckBoxCardSkeleton } from "./CheckBoxCardSkeleton";
import { formatMaskedValue } from "pages/PaymentMethods/common";

export default {
  title: "Components/CheckBoxCard",
  component: CheckBoxCard,
  decorators: [withPadding],
} as Meta;

const Template: Story<CheckBoxCardProps> = (args) => <CheckBoxCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Primary",
  subtitle: "The most basic example",
};

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
  title: "Selected",
  subtitle: "See the checkmark?",
};

export const Dismiss = Template.bind({});
Dismiss.args = {
  title: "Dismiss",
  subtitle: "You can dismiss this",
  showDismiss: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  title: "Disabled",
  subtitle: "You can't touch this",
};

export const WithBottomLineContent = Template.bind({});
WithBottomLineContent.args = {
  title: "Bottom line",
  subtitle: "Look at the content below",
  bottomLineContent: (
    <div className="px-6 py-2">
      <p className="text-blue-dark font-bold text-lg">I am the bottom line content!</p>
    </div>
  ),
};

export const WithMiddleColumnContent = Template.bind({});
WithMiddleColumnContent.args = {
  title: "Middle column",
  subtitle: "Look to the right",
  middleColumnContent: <p className="text-blue-dark font-bold text-sm">Heyyy!</p>,
};

export const BankExample = Template.bind({});
BankExample.args = {
  icon: bankBlueIcon,
  title: "Bank Name",
  subtitle: formatMaskedValue(1234),
};

export const CreditCardExample = Template.bind({});
CreditCardExample.args = {
  icon: (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="15.8323" cy="9.77195" rx="3.71051" ry="7.66172" fill="#EE5114" />
      <path
        d="M12.1223 9.77159C12.1223 6.6661 13.5729 3.90029 15.8327 2.11C14.166 0.790229 12.0614 0 9.77159 0C4.3744 0 0 4.37535 0 9.77159C0 15.1688 4.3744 19.5432 9.77159 19.5432C12.0614 19.5432 14.166 18.7539 15.8327 17.4341C13.5729 15.6438 12.1223 12.878 12.1223 9.7716V9.77159Z"
        fill="#E6001A"
      />
      <path
        d="M21.8938 9.08309e-06C19.6031 9.08309e-06 17.4985 0.790238 15.8327 2.11001C18.0916 3.9003 19.5431 6.66611 19.5431 9.7716C19.5431 12.878 18.0916 15.6439 15.8327 17.4341C17.4985 18.7539 19.6031 19.5432 21.8938 19.5432C27.2901 19.5432 31.6654 15.1688 31.6654 9.77159C31.6654 4.37535 27.2901 0 21.8938 0V9.08309e-06Z"
        fill="#FB8B08"
      />
    </svg>
  ),
  title: "Mastercard",
  subtitle: formatMaskedValue(1234),
  middleColumnContent: <div className="text-sm text-blue-dark">Exp. 01/21</div>,
};

export const CryptoCurrencyExample = Template.bind({});
CryptoCurrencyExample.args = {
  icon: (
    <div className="bg-white bg-opacity-50 p-1 rounded-full">
      <img
        alt=""
        className="object-contain"
        style={{ width: 22, height: 22 }}
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg=="
      />
    </div>
  ),
  title: "Ethereum",
  subtitle: "$150,00",
  middleColumnContent: <div className="text-sm text-blue-dark">0.000394 ETH</div>,
};

export const Skeleton: Story = () => <CheckBoxCardSkeleton />;
