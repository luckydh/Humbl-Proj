import React, { ReactNode } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

import { Typography, TypographyProps, TypographySizes, TypographyTypes, TypographyWeights } from "./Typography";
import { sizes, weights } from "./styles";

export default {
  title: "Typography",
  component: Typography,
  args: {
    type: "base",
    weight: "bold",
    color: "blue",
    size: "md",
    as: "span",
  },
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS, ...MINIMAL_VIEWPORTS },
      defaultViewport: "mobile1",
    },
  },
} as Meta;

type StoryProps = TypographyProps & { children: ReactNode };

const Template: Story<StoryProps> = (args) => (
  <div className="uikit-bg-blue-100">
    <Typography {...args} />
  </div>
);

export const BaseText = Template.bind({});
BaseText.args = {
  type: "base",
  weight: "normal",
  color: "blue",
  size: "md",
  children: "Base Text",
};

export const HeadlineText = Template.bind({});
HeadlineText.args = {
  type: "headline",
  weight: "bold",
  color: "blue",
  size: "md",
  children: "Headline Text",
};

export const kitchenSink: Story<StoryProps> = () => {
  const sinkList: TypographyProps[] = [];

  (Object.keys(sizes) as Array<TypographyTypes>).forEach((type) => {
    (Object.keys(sizes[type]) as Array<TypographySizes>).forEach((size) => {
      // Add Default without a weight to kitchen sink
      sinkList.push({ type, size });
      (Object.keys(weights) as Array<TypographyWeights>).forEach((weight) => {
        sinkList.push({ type, size, weight });
      });
    });
  });

  return (
    <ul>
      {sinkList.map((item) => (
        <li className="uikit-my-4 uikit-border-b">
          <Typography size={item.size} type={item.type} color="black" weight={item.weight}>
            The Lazy Fox | {item.type} - {item.size} - {item.weight}
          </Typography>
        </li>
      ))}
    </ul>
  );
};
