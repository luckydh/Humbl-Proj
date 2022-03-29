import React from "react";

export interface TabProps {
  children?: any;
  title?: string;
}

// Currently the title isn't used by the component itself, instead the tabs component inspects the title prop of child tabs.
// TODO: remove this opaque behavior. Either have the child tab implement this title behavior directly or have the tabs
// component consume items directly and then inline the title while rendering individual tab children
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Tab: React.FC<TabProps> = ({ children, title }) => children;

export default Tab;
