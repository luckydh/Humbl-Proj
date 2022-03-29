import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import Tabs from "./Tabs";
import Tab from "./Tab";
import { CryptoCurrencyList } from "../CryptoCurrencyList/CryptoCurrencyList";

export default {
  decorators: [withDesign],
  title: "CryptoWallet/Tabs",
  component: Tabs,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=2233%3A1383",
    },
  },
} as Meta;

const TabData = {
  defaultArgs: [
    {
      title: "Market",
      items: [
        {
          tickerCode: "BTC",
          name: "Bitcoin",
          value: "$43,960.36",
          change: 14.34,
          image:
            "https://s3-alpha-sig.figma.com/img/3113/653d/cb8c81b00a123b36f610ac69dd2bbd56?Expires=1626048000&Signature=Fq0rzkZxGmASwNDOgTYVONYpK9Ns13F~M8kv~RlHPvMHO~PGfm8uztF-VSvlx2cITvbyyd6PrnFIA8QC2PyntLYBtY-00LNIg4Y9BMPERmxzQ1uc4Xg8GtdQ4J4YPji3sp6twQkJaUGGDkV7Sc7zS4tm80vys7cIM7HMaZtMF4Mv~B5kYhp2Z58pjw8kC5tpSx8K5rCsDFboOJlEyODKZ1kSxI-CmIxHDfCTVOB61MeYtLGSlUlzUOFjQAfHesN5qqcV6ESCCQFPJWwjW6q89EMQLuwD9XZ8PK4iSrrBRwlWT3eKnPKtS0F~MZKb2gqv0fbEVgoahNL1L1rX0YM-dg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        },

        {
          tickerCode: "ETH",
          name: "Ethereum",
          value: "$43,960.36",
          change: -22.34,
          image:
            "https://s3-alpha-sig.figma.com/img/f89b/f35b/9a878e43842b1b3af134ab667dd6f485?Expires=1626048000&Signature=B9hOIeeIOxgqzwg8KbmKC5MkbXt~DC9k1n0KYbjaz6xaJuybfjWAFWn90YLNrIKoA9UOwYsVxa2LbvBfRaifyNTdXZyAQjCgYC3hgTErjQD6p-M5iKDhLVswnR5N6T3UUzGcf8P3-VxkoCp2K~A~ne0Vxz7Xt39TKusQqFIHkM07l87Fav~YgrCiPJT2QGzHbOgFfOH81oc-xj8EoDXUaqAS51MFgPmB7mZqOPvA4uSrxYdM5~6i6QQsJZy3dtvYSb2h1COiZNDEcgMyoRoj~DbhsFnFLPfa8JOmzD6JkQrHw4Xw4NVZm7o-epOvXunVftFf~iuTomrVaboTqBPM6w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        },
      ],
    },
    {
      title: "Recent Transaction",
      items: [
        {
          tickerCode: "USDC",
          name: "USD Coin",
          value: "$43,960.36",
          change: 4.34,
          image:
            "https://s3-alpha-sig.figma.com/img/a9d9/13c1/71c99ad169fd57225918460048356c29?Expires=1624838400&Signature=fORrb-fzpKeDnE52hgneyVOctS3a0OPo-6S8h820CwQ3dQoCm~eVMmmz6~C7E1YlMLJrVET5sK-Xtz2RMmZgILQOd63LEL9dqxlXbBX5oCgu2q217p-WsmEv4WaCkCam1SNbNh3yAZX0igd~4x61S7B4JdkFRoMDQte6vh4Q1PwBp7~XjlR7vc~1v2tuk0FW6uNr~eQQvKzt0RXLysm3Jzc8F9g6Q8YHWcuk7KJ7j7~iu~1UW8w9YWF03hUb3Fb6IosD0ctnI7c5kNlPBC9dn9KTG3cS09~e-676ve17DZY6c~rXlMMxtm5ztZ4SJp-YFkwB2Yqw4ozIlrB5w5St7g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        },

        {
          tickerCode: "ETH",
          name: "Ethereum",
          value: "$43,960.36",
          change: 10.34,
          image:
            "https://s3-alpha-sig.figma.com/img/f89b/f35b/9a878e43842b1b3af134ab667dd6f485?Expires=1626048000&Signature=B9hOIeeIOxgqzwg8KbmKC5MkbXt~DC9k1n0KYbjaz6xaJuybfjWAFWn90YLNrIKoA9UOwYsVxa2LbvBfRaifyNTdXZyAQjCgYC3hgTErjQD6p-M5iKDhLVswnR5N6T3UUzGcf8P3-VxkoCp2K~A~ne0Vxz7Xt39TKusQqFIHkM07l87Fav~YgrCiPJT2QGzHbOgFfOH81oc-xj8EoDXUaqAS51MFgPmB7mZqOPvA4uSrxYdM5~6i6QQsJZy3dtvYSb2h1COiZNDEcgMyoRoj~DbhsFnFLPfa8JOmzD6JkQrHw4Xw4NVZm7o-epOvXunVftFf~iuTomrVaboTqBPM6w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        },
      ],
    },
    {
      title: "Movers",
      items: [
        {
          tickerCode: "ETH",
          name: "Ethereum",
          value: "$43,960.36",
          change: -22.34,
          image:
            "https://s3-alpha-sig.figma.com/img/f89b/f35b/9a878e43842b1b3af134ab667dd6f485?Expires=1626048000&Signature=B9hOIeeIOxgqzwg8KbmKC5MkbXt~DC9k1n0KYbjaz6xaJuybfjWAFWn90YLNrIKoA9UOwYsVxa2LbvBfRaifyNTdXZyAQjCgYC3hgTErjQD6p-M5iKDhLVswnR5N6T3UUzGcf8P3-VxkoCp2K~A~ne0Vxz7Xt39TKusQqFIHkM07l87Fav~YgrCiPJT2QGzHbOgFfOH81oc-xj8EoDXUaqAS51MFgPmB7mZqOPvA4uSrxYdM5~6i6QQsJZy3dtvYSb2h1COiZNDEcgMyoRoj~DbhsFnFLPfa8JOmzD6JkQrHw4Xw4NVZm7o-epOvXunVftFf~iuTomrVaboTqBPM6w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        },
        {
          tickerCode: "BTC",
          name: "Bitcoin",
          value: "$43,960.36",
          change: 14.34,
          image:
            "https://s3-alpha-sig.figma.com/img/3113/653d/cb8c81b00a123b36f610ac69dd2bbd56?Expires=1626048000&Signature=Fq0rzkZxGmASwNDOgTYVONYpK9Ns13F~M8kv~RlHPvMHO~PGfm8uztF-VSvlx2cITvbyyd6PrnFIA8QC2PyntLYBtY-00LNIg4Y9BMPERmxzQ1uc4Xg8GtdQ4J4YPji3sp6twQkJaUGGDkV7Sc7zS4tm80vys7cIM7HMaZtMF4Mv~B5kYhp2Z58pjw8kC5tpSx8K5rCsDFboOJlEyODKZ1kSxI-CmIxHDfCTVOB61MeYtLGSlUlzUOFjQAfHesN5qqcV6ESCCQFPJWwjW6q89EMQLuwD9XZ8PK4iSrrBRwlWT3eKnPKtS0F~MZKb2gqv0fbEVgoahNL1L1rX0YM-dg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        },
      ],
    },
  ],
};

const Template: Story = ({ defaultArgs }) => (
  <Tabs>
    {defaultArgs &&
      defaultArgs.map((item: { title: string; items: any }) => (
        <Tab title={item.title} key={item.title}>
          <div className="m-6 rounded-lg overflow-hidden">
            <CryptoCurrencyList items={item.items || defaultArgs[0].items} />
            <div className="bg-blue-dark py-4 text-white text-center">See All</div>
          </div>
        </Tab>
      ))}
  </Tabs>
);
export const Primary = Template.bind({});

Primary.args = TabData;
