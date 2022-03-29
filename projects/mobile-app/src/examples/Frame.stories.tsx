import React, { FC, useState } from "react";
import { Meta } from "@storybook/react/types-6-0";

import withPadding from "../utils/withPadding";
import { TabButton } from "../components/TabButton/TabButton";
import { HomeIcon } from "../assets/svgs/HomeIcon";
import { SearchIcon } from "../assets/svgs/SearchIcon";
import { ScanIcon } from "../assets/svgs/ScanIcon";
import { ProfileIcon } from "../assets/svgs/ProfileIcon";
import { HumblLogo } from "../assets/svgs/HumblLogo";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { UserItem } from "../components/UserItem/UserItem";
import { Heading } from "../components/Text/Text";
import { ScrollableView } from "../components/ScrollableView/ScrollableView";
import { Calculator } from "../components/Calculator/Calculator";
import { getRandomUser } from "utils/test-helpers/randomUserGenerator";

export default {
  title: "Examples",
  decorators: [withPadding],
} as Meta;

export const SearchListEmpty = () => (
  <Frame>
    <ScrollableView>
      <SearchInput onClear={() => {}} />

      <div className="flex flex-col items-center justify-center flex-grow">
        <Heading ariaLabel="HEADING_FIND_FRIENDS">
          Find Friends
          <br />
          on HUMBL
        </Heading>
      </div>
    </ScrollableView>
  </Frame>
);

export const SearchListResults = () => {
  const items = Array.from(Array(20).keys()).map((index) => {
    const user = getRandomUser(index);
    return (
      <UserItem
        key={index}
        onClick={() => {}}
        name={`${user.name.first} ${user.name.last}`}
        userName={user.login.username}
        src={user.picture.medium}
      />
    );
  });

  return (
    <Frame>
      <div className="px-6">
        <SearchInput onClear={() => {}} />
      </div>
      <ScrollableView>
        <div className="flex flex-col flex-grow gap-4 overflow-auto mt-9">{items}</div>
      </ScrollableView>
    </Frame>
  );
};

export const SearchListResultsEmpty = () => (
  <Frame>
    <div className="px-6">
      <SearchInput onClear={() => {}} />
    </div>
    <ScrollableView>
      <div className="flex flex-col items-center justify-center flex-grow">
        <Heading ariaLabel="SEARCH_NO_RESULTS">No Results Found</Heading>
      </div>
    </ScrollableView>
  </Frame>
);

export const CalculatorView = () => {
  const [value, setValue] = useState("0");

  return (
    <Frame>
      <div className="flex flex-col items-center flex-grow px-6">
        <Heading ariaLabel="CALCULATOR_VALUE">${value}</Heading>
        <div className="w-full mt-auto mb-10">
          <Calculator
            onChange={(newValue: string) => setValue(newValue)}
            onSubmit={(newValue: string) => setValue(newValue)}
          />
        </div>
      </div>
    </Frame>
  );
};

const Frame: FC = ({ children }) => {
  // TODO: use action for this?
  const onClickHandler = () => {};

  return (
    <div className="relative flex flex-col bg-lines" style={{ width: 375, height: 812 }}>
      <div className="flex items-center justify-center py-10 flex-shink-0">
        <HumblLogo />
      </div>

      {children}

      <Tabs onTabClick={onClickHandler} />
    </div>
  );
};

interface TabsProps {
  onTabClick: (is: string) => void;
}

const Tabs: FC<TabsProps> = ({ onTabClick }) => (
  <div className="flex self-end justify-between flex-shrink-0 w-full px-4 pt-2 bg-blue">
    <TabButton icon={<HomeIcon />} id="home" title="Home" onClick={onTabClick} />
    <TabButton icon={<SearchIcon />} id="search" title="Search" onClick={onTabClick} />
    <TabButton icon={<ScanIcon />} id="scan" title="Scan + Pay" onClick={onTabClick} />
    <TabButton icon={<ProfileIcon />} id="profile" title="Profile" onClick={onTabClick} />
  </div>
);
