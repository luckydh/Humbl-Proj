import React from "react";
import { Story, Meta } from "@storybook/react";
import { Icons, IconsType } from "assets/icons2";
import { Icon, IconProps, iconSize } from "./Icon";

export default {
  title: "Icons",
  component: Icon,
} as Meta;

const Template: Story<IconProps> = ({ size = "sm", name }) => (
    <div className="w-full h-full max-w-full">
      <div
        className="grid justify-evenly"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(calc(${iconSize[size]}px + 1rem), 1fr))` }}>
        {Icons[name] ? (
          <div className="inline-grid p-4">
            <Icon name={name} size={size} />
          </div>
        ) : (
          Object.keys(Icons).map((icon) => (
            <div key={icon} className="inline-grid p-4">
              <Icon name={icon as IconsType} size={size} />
            </div>
          ))
        )}
      </div>
    </div>
  );

export const StickerSheet = Template.bind({});
StickerSheet.args = {
  size: "lg",
};
StickerSheet.parameters = {
  storyshots: false,
};
