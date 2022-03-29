import React from "react";
import { Story, Meta } from "@storybook/react";
import { Illustrations, IllustrationsType } from "assets/illustrations2";
import { Illustration, IllustrationProps, illustrationSize } from "./Illustration";

export default {
  title: "Illustrations",
  component: Illustration,
} as Meta;

const Template: Story<IllustrationProps> = ({ size = "sm", name }) => {
  const { width } = illustrationSize[size];
  return (
    <div className="w-full h-full max-w-full">
      <div
        className="grid justify-evenly"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(calc(${width}px + 1rem), 1fr))` }}>
        {Illustrations[name] ? (
          <div className="inline-grid p-4">
            <Illustration name={name} size={size} />
          </div>
        ) : (
          Object.keys(Illustrations).map((icon) => (
            <div key={icon} className="inline-grid p-4">
              <Illustration name={icon as IllustrationsType} size={size} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const StickerSheet = Template.bind({});
StickerSheet.args = {
  size: "lg",
};
StickerSheet.parameters = {
  storyshots: false,
};
