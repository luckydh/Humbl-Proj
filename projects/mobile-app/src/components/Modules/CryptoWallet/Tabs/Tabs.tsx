import React, { useState } from "react";
import Button from "components/Button/Button";
import cx from "classnames";

interface Child {
  title: string;
}

export interface TabsProps {
  children?: React.ReactElement<Child>[];
  onClick?: (obj: object) => void;
  withContainerBackground?: boolean;
  ariaLabel?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, withContainerBackground = true, ariaLabel }) => {
  const initialTab = children && children[0].props.title;
  const [activeTab, setActiveTab] = useState(initialTab);
  function handleActiveTab(title: string) {
    setActiveTab(title);
  }
  const tabs =
    children &&
    children.map((child: React.ReactElement<Child>) => {
      const classes = cx(
        "flex-1 rounded-lg whitespace-nowrap text-blue-dark mx-1",
        activeTab === child.props.title ? "font-bold" : "font-medium"
      );
      const { title } = child.props;
      return (
        <Button
          className={classes}
          style={{
            backgroundColor: activeTab === title ? "#E4F8FF" : "#A1DFF6",
          }}
          ariaLabel={ariaLabel && `${ariaLabel}_${title.toUpperCase().replace(/ /g, "")}_BUTTON`}
          variant="custom"
          type="submit"
          key={title}
          onClick={() => {
            handleActiveTab(title);
          }}>
          {title}
        </Button>
      );
    });
  const tabContent = children?.filter((child) => child.props.title === activeTab);

  const tabContentClasses = cx("m-5 rounded-lg overflow-hidden transition-height duration-200", {
    "bg-white": withContainerBackground,
  });
  return (
    <>
      <div
        aria-label={ariaLabel && `${ariaLabel}_TABS_SECTION`}
        className="w-full h-auto overflow-x-auto flex mb-4 mt-6">
        <div className="flex flex-1 justify-center pl-4 pr-4">{tabs}</div>
      </div>
      <div className={tabContentClasses}>{tabContent}</div>
    </>
  );
};

export default Tabs;
