import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MockedProvider } from "@apollo/client/testing";
import NewsFeed from "./index";
import { useGetAllArticlesQueryMock } from "utils/test-helpers/allArticlesMocks";

export default {
  decorators: [],
  title: "NewsFeed/NewsFeed",
  component: NewsFeed,
  args: {},
} as Meta;

const Template: Story = () => (
    <MockedProvider mocks={[useGetAllArticlesQueryMock()]} addTypename={false}>
      <NewsFeed />
    </MockedProvider>
  );

export const Primary = Template.bind({});
