import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import { CryptoCurrencyItem, CryptoCurrencyItemProps } from "./CryptoCurrencyItem";

export default {
  decorators: [withDesign],
  title: "CryptoWallet/Components/CryptoCurrencyItem",
  component: CryptoCurrencyItem,
} as Meta;

const Template: Story<CryptoCurrencyItemProps> = (args) => (
  <ul>
    <CryptoCurrencyItem {...args} />
  </ul>
);

const defaultArgs: CryptoCurrencyItemProps = {
  name: "Bitcoin",
  tickerCode: "BTC",
  valueInFiat: "$33888.41",
  change: 3.2749076556833363,
  image:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9kKSI+CjxwYXRoIGQ9Ik00Ni4zNTY0IDI5LjcwMUM0My40ODQ2IDQxLjIxODkgMzEuODE3NiA0OC4yMjg1IDIwLjI5NyA0NS4zNTYzQzguNzgxMjcgNDIuNDg0OCAxLjc3MDkyIDMwLjgxODMgNC42NDM5NiAxOS4zMDEyQzcuNTE0NDkgNy43ODIwMSAxOS4xODE2IDAuNzcxODczIDMwLjY5ODUgMy42NDMzNUM0Mi4yMTgzIDYuNTE0ODMgNDkuMjI4NSAxOC4xODI1IDQ2LjM1NjQgMjkuNzAxWiIgZmlsbD0iI0Y3OTMxQSIvPgo8L2c+CjxwYXRoIGQ9Ik0zNS4yMTY1IDIxLjgxODVDMzUuNjYzOCAxOC45NDMzIDMzLjM4NzEgMTcuMzk3NyAzMC4yNzM4IDE2LjM2NjZMMzEuMjgzOCAxMi40NzE4TDI4LjgxNzkgMTEuODgxMUwyNy44MzQ3IDE1LjY3MzNDMjcuMTg2NCAxNS41MTc5IDI2LjUyMDcgMTUuMzcxNCAyNS44NTkgMTUuMjI2MkwyNi44NDkzIDExLjQwODlMMjQuMzg1IDEwLjgxODFMMjMuMzc0NSAxNC43MTE3QzIyLjgzOCAxNC41OTQyIDIyLjMxMTEgMTQuNDc4MiAyMS43OTk5IDE0LjM1NTlMMjEuODAyOCAxNC4zNDM2TDE4LjQwMjMgMTMuNTI3MkwxNy43NDYzIDE2LjA1OTRDMTcuNzQ2MyAxNi4wNTk0IDE5LjU3NTggMTYuNDYyNiAxOS41MzczIDE2LjQ4NzVDMjAuNTM1OCAxNi43MjcxIDIwLjcxNjQgMTcuMzYyNiAyMC42ODY0IDE3Ljg2NjRMMTkuNTM1OSAyMi4zMDM1QzE5LjYwNDcgMjIuMzIwMyAxOS42OTM5IDIyLjM0NDYgMTkuNzkyMyAyMi4zODI2QzE5LjcxIDIyLjM2MyAxOS42MjI1IDIyLjM0MTUgMTkuNTMxNyAyMi4zMjA2TDE3LjkxOTEgMjguNTM2NEMxNy43OTcxIDI4LjgyODEgMTcuNDg3MyAyOS4yNjU4IDE2Ljc4OTIgMjkuMDk5NkMxNi44MTM5IDI5LjEzNCAxNC45OTcgMjguNjY5NSAxNC45OTcgMjguNjY5NUwxMy43NzI3IDMxLjM4MzVMMTYuOTgxNiAzMi4xNTI2QzE3LjU3ODYgMzIuMjk2NSAxOC4xNjM2IDMyLjQ0NzEgMTguNzM5NyAzMi41ODg4TDE3LjcxOTMgMzYuNTI4MkwyMC4xODIzIDM3LjExOUwyMS4xOTI5IDMzLjIyMTNDMjEuODY1NyAzMy4zOTcgMjIuNTE4NyAzMy41NTkgMjMuMTU4IDMzLjcxMTdMMjIuMTUwOSAzNy41OTFMMjQuNjE2OSAzOC4xODE3TDI1LjYzNzIgMzQuMjQ5N0MyOS44NDIgMzUuMDE0OCAzMy4wMDM3IDM0LjcwNjMgMzQuMzM0NSAzMS4wNDk1QzM1LjQwNjkgMjguMTA1NCAzNC4yODExIDI2LjQwNzIgMzIuMDY5IDI1LjI5OThDMzMuNjgwMiAyNC45NDI1IDM0Ljg5MzggMjMuOTIzNiAzNS4yMTc0IDIxLjgxODlMMzUuMjE2NiAyMS44MTgzTDM1LjIxNjUgMjEuODE4NVpNMjkuNTgyNiAyOS40MTQ1QzI4LjgyMDUgMzIuMzU4NiAyMy42NjQ5IDMwLjc2NzEgMjEuOTkzNCAzMC4zNjhMMjMuMzQ3NSAyNS4xNDg5QzI1LjAxODkgMjUuNTUwMSAzMC4zNzkgMjYuMzQ0MSAyOS41ODI3IDI5LjQxNDVIMjkuNTgyNlpNMzAuMzQ1MiAyMS43NzU5QzI5LjY1IDI0LjQ1MzkgMjUuMzU4OSAyMy4wOTMzIDIzLjk2NyAyMi43NTk3TDI1LjE5NDYgMTguMDI2M0MyNi41ODY2IDE4LjM1OTkgMzEuMDY5NCAxOC45ODI2IDMwLjM0NTQgMjEuNzc1OUgzMC4zNDUyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyMV9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K",
};

export const ChangePositive = Template.bind({});

ChangePositive.args = defaultArgs;

export const ChangeNegative = Template.bind({});

ChangeNegative.args = {
  ...defaultArgs,
  change: -3.2749076556833363,
};

export const ChangePositiveWithoutValue = Template.bind({});

ChangePositiveWithoutValue.args = {
  ...defaultArgs,
  change: 3.2749076556833363,
  valueInFiat: undefined,
};

export const ChangeNegativeWithoutValue = Template.bind({});

ChangeNegativeWithoutValue.args = {
  ...defaultArgs,
  change: -3.2749076556833363,
  valueInFiat: undefined,
};

export const WithoutValueAndChange = Template.bind({});

WithoutValueAndChange.args = {
  ...defaultArgs,
  valueInFiat: undefined,
  change: undefined,
};

export const WithValueInCrypto = Template.bind({});

WithValueInCrypto.args = {
  ...defaultArgs,
  change: undefined,
  valueInCrypto: 0.00001234,
};

export const Compact = Template.bind({});

Compact.args = {
  ...defaultArgs,
  variant: "compact",
};

export const CompactWithoutValue = Template.bind({});

CompactWithoutValue.args = {
  ...defaultArgs,
  valueInFiat: undefined,
  variant: "compact",
};

export const CompactWithoutValueAndChange = Template.bind({});

CompactWithoutValueAndChange.args = {
  ...defaultArgs,
  valueInFiat: undefined,
  change: undefined,
  variant: "compact",
};

export const CompactWithValueInCrypto = Template.bind({});

CompactWithValueInCrypto.args = {
  ...defaultArgs,
  change: undefined,
  valueInCrypto: 0.00001234,
  variant: "compact",
};
