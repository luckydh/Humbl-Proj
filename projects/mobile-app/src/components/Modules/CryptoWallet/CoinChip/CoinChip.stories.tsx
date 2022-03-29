import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { CoinChip, CoinChipProp } from "./CoinChip";

export default {
  title: "CryptoWallet/Components/CoinChip",
  component: CoinChip,
  decorators: [withPadding],
} as Meta;

const Template: Story<CoinChipProp> = (args) => <CoinChip {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: "xx-small",
  coinImage:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAxOSAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuNTUyNjEgMC40NTQxMDJMOS4zNTc0MiAxLjExNzEyVjIwLjM1NDZMOS41NTI2MSAyMC41NDk0TDE4LjQ4MjMgMTUuMjcxTDkuNTUyNjEgMC40NTQxMDJaIiBmaWxsPSIjMzQzNDM0Ii8+CjxwYXRoIGQ9Ik05LjU1MjkzIDAuNDU0MTAyTDAuNjIzMDQ3IDE1LjI3MUw5LjU1MjkzIDIwLjU0OTRWMTEuMjEyVjAuNDU0MTAyWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNOS41NTIzOSAyMi4yMzc2TDkuNDQyMzggMjIuMzcxN1YyOS4yMjQ0TDkuNTUyMzkgMjkuNTQ1NkwxOC40ODc1IDE2Ljk2MTlMOS41NTIzOSAyMi4yMzc2WiIgZmlsbD0iIzNDM0MzQiIvPgo8cGF0aCBkPSJNOS41NTE5NiAyOS41NDU2VjIyLjIzNzZMMC42MjIwNyAxNi45NjE5TDkuNTUxOTYgMjkuNTQ1NloiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTkuNTUyNzMgMjAuNTUyMkwxOC40ODI0IDE1LjI3MzhMOS41NTI3MyAxMS4yMTQ4VjIwLjU1MjJaIiBmaWxsPSIjMTQxNDE0Ii8+CjxwYXRoIGQ9Ik0wLjYyMjA3IDE1LjI3MzhMOS41NTE5NiAyMC41NTIyVjExLjIxNDhMMC42MjIwNyAxNS4yNzM4WiIgZmlsbD0iIzM5MzkzOSIvPgo8L3N2Zz4K",
  content: "Eth",
};
