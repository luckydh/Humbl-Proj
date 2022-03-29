export type MenuOptionType = {
  text: string;
  link: string | { pathname: string };
  target?: string;
  isSingOut?: boolean;
  action?: string;
  icon?: string;
  hide?: boolean;
};
