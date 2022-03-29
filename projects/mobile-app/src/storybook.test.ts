// storybook.test.js
import React from "react";
import initStoryshots from "@storybook/addon-storyshots";
//For storybook tests, don't use suspense to load i18n.
//Load raw keys.
import i18n from "i18n";
import { create, act } from "react-test-renderer";
import moment from "moment-timezone";
import MockDate from "mockdate";

i18n.options.react = {
  useSuspense: false,
};
i18n.options.lng = "cimode";

declare global {
  interface Window {
    analytics: {};
  }
}

initStoryshots({
  asyncJest: true,
  test: async ({ story, done }) => {
    MockDate.set("2021-04-17T12:25:00-04:00");

    let renderer;
    act(() => {
      moment.tz.setDefault("America/Chicago");
      // React.createElement() is important because of hooks [shouldn't call story.render() directly]
      renderer = create(React.createElement(story.render));
    });

    // Let one render cycle pass before rendering snapshot (this is for cases where we need to update account for tests)
    await act(() => new Promise((resolve) => setTimeout(resolve)));
    await act(() => new Promise((resolve) => setTimeout(resolve)));

    // await act(() => new Promise((resolve) => setTimeout(resolve)));
    // save all snapshots to the same file (similar to "snapshotWithOptions")
    expect(renderer).toMatchSnapshot();

    if (done) {
      MockDate.reset();
      done();
    }
  },
});
