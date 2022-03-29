import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import moment from "moment-timezone";

import NewsCard, { Props } from "./NewsCard";
import { MOCK_DATE } from "utils/test-helpers/mockDate";

export default {
  title: "NewsFeed/NewsCard",
  component: NewsCard,
  argTypes: {},
} as Meta;

const momentMock = moment(MOCK_DATE);

const Template: Story<Props> = (args) => <NewsCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  news: {
    title: "MicroStrategy to Sell $1B Worth of Stock to Buy Bitcoin",
    url: "http://google.com",
    text: "card1",
    sourceName: "https://i.ibb.co/vZcmC9w/executium-4-KJJez-Dyo3-M-unsplash.jpg",
    tickers: ["BTC", "ETH", "USDC"],
    topics: [],
    createdOn: {
      date: momentMock.subtract(4, "months").toDate(),
    },
  },
};
