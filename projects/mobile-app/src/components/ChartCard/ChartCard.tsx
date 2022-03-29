import React, { FC, forwardRef, useMemo } from "react";
import cx from "classnames";
import moment from "moment";

import { LineGraph } from "../LineGraph/LineGraph";
import { useMeasure } from "react-use";
import { UseMeasureRef } from "react-use/lib/useMeasure";
import { formatUsingIntl, displaySignificantFigures } from "utils/currency";
import { IonIcon } from "@ionic/react";
import QuestionIcon from "assets/svgs/QuestionIcon.svg";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { compactNumberFormat } from "utils/compactNumberFormat";

export interface PriceProps {
  value: number;
  /**
   * Set the font size
   * @default 38
   * */
  fontSize?: number;
  /**
   * Tailwind class for font weight
   * @default font-medium
   */
  fontWeight?: string;
  // Intl.number currency notation style
  notation?: "standard" | "compact";

  ariaLabel?: string;
  /**
   * @description It signals to the component whether to use displaySignificantFigures instead of formatUsingIntl function to format the value prop.
   * @default false
   */
  showSigFigs?: boolean;
}

export const Price: FC<PriceProps> = ({
  fontSize = 30,
  fontWeight = "font-medium",
  value,
  notation = "standard",
  ariaLabel,
  showSigFigs = false,
}) => {
  const currency = useGetCurrentAccountCurrency();

  return (
    <h2
      aria-label={ariaLabel}
      className={cx(fontWeight, "tabular-nums")}
      style={{
        fontSize: `${fontSize}px`,
        // Make the bounding box _almost_ the same
        // height as the characters
        lineHeight: "35px",
      }}>
      {showSigFigs ? displaySignificantFigures(value, notation, currency) : formatUsingIntl(value, notation, currency)}
    </h2>
  );
};

interface HeadingProps {
  children?: React.ReactNode;
  ariaLabel?: string;
}

export const Heading: FC<HeadingProps> = ({ children, ariaLabel }) => (
  <h1 aria-label={ariaLabel} className="text-lg font-hando">
    {children}
  </h1>
);

export const InfoPill: FC = ({ children }) => (
  <span
    className="px-2 mx-4 text-sm font-semibold bg-white rounded-md text-blue-dark2 max-w-full truncate"
    style={{
      paddingTop: 1,
      height: "min-content",
      direction: "rtl",
    }}>
    {children}
  </span>
);

interface FormattedDateProps {
  date: number | undefined;

  /**
   * Moment string format
   *
   * @default ddd, MMMM DD, H:mm A
   * @example Mon, June 14, 5:58 PM
   * */
  formatString?: string;
}

export const FormattedDate: FC<FormattedDateProps> = ({ date, formatString = "ddd, MMMM DD, H:mm A" }) => {
  const formatted = useMemo(() => moment(date).format(formatString), [date, formatString]);

  return <>{formatted}</>;
};

export const PriceLine: FC = ({ children }) => (
  <div className="flex items-center w-full text-xs opacity-50 font-hando">
    <span className="ml-2 mr-2">{children}</span>
    <div className="w-full h-px bg-white opacity-25" style={{ marginTop: -2 }} />
  </div>
);

interface UpDownArrowProps {
  isPositive: boolean;
}

export const UpDownArrow: FC<UpDownArrowProps> = ({ isPositive }) => {
  const classes = cx("fill-current", isPositive ? "text-green-positive" : "text-red transform rotate-180");

  return (
    <svg className={classes} width="14" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0l6.928 12H.072L7 0z" />
    </svg>
  );
};

interface PercentageWithArrowProps {
  start: number;
  value: number;
  onInfoIconClick?: () => void;
}

export const PercentageWithArrow: FC<PercentageWithArrowProps> = ({ start, value, onInfoIconClick }) => {
  const currency = useGetCurrentAccountCurrency();
  const priceDifference = value - start;

  let percentDisplay = "";
  // need both values to avoid infinity result
  if (value && start) {
    const percent = (value - start) / start;
    percentDisplay = compactNumberFormat(percent, "percent");
  }

  return (
    <span className="flex items-center space-x-2 text-sm">
      <UpDownArrow isPositive={priceDifference > 0} />
      <span>{displaySignificantFigures(priceDifference, "compact", currency)}</span>
      <span className="tabular-nums">{percentDisplay}</span>
      <span className="pointer-events-auto leading-3">
        {onInfoIconClick && <IonIcon icon={QuestionIcon} onClick={onInfoIconClick} />}
      </span>
    </span>
  );
};

interface TimeIntervalsProps {
  // TODO: add tuple labels when TS updated to 4+
  timeRange: [number, number];
  intervals?: number;

  // Whether the TimeInterval should be shown and active
  isActive?: boolean;
}

export const TimeIntervals: FC<TimeIntervalsProps> = ({ timeRange, intervals = 3, isActive = true }) => {
  const [start, end] = timeRange;
  const delta = start - end;
  const timeGapBetweenIntervals = intervals - 1;
  const timeInterval = Math.round(delta / timeGapBetweenIntervals);
  const intervalFormat = getIntervalFormat(delta);

  const items = [];
  for (let i = 0; i < intervals; i += 1) {
    const isLast = intervals - 1;
    const isFirst = i === 0;

    const date = isFirst ? end : i === isLast ? start : end + timeInterval * i;

    items.push(
      <span key={`time-interval-${i}`} className="text-xs font-semibold text-white opacity-80">
        <FormattedDate date={date} formatString={intervalFormat} />
      </span>
    );
  }

  const classes = cx("px-3 transition-all ease-out duration-200", {
    "h-0 opacity-0 overflow-hidden": !isActive,
    "h-auto opacity-100 mt-5 mb-1": isActive,
  });

  return (
    <div className={classes}>
      <div className="flex justify-between">{items}</div>
    </div>
  );
};

const HOUR = 3_600_000;
const DAY = HOUR * 24;
const MONTH = DAY * 31;

function getIntervalFormat(delta: number) {
  if (delta <= DAY) {
    return "h:mmA";
  }
  if (delta <= MONTH) {
    return "M/D";
  }

  return "M/YYYY";
}

const EMPTY_DATA = [
  { x: 0, y: 0 },
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 20 },
  { x: 4, y: 10 },
  { x: 5, y: 30 },
  { x: 6, y: 20 },
];

export interface ChartCardProps {
  children?: React.ReactNode;
  height?: number | "auto" | "fill";
  isRounded?: boolean;
  ref?: UseMeasureRef<HTMLDivElement>;
  width?: number | "auto" | "fill";
  backgroundSize?: "bg-auto" | "bg-cover" | "bg-contain";
  background?: "bg-etxCardBackground";
}

export const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>((props, ref) => {
  const { children, height, isRounded = true, width, backgroundSize, background } = props;

  const classes = cx(
    "relative flex flex-col w-full h-full text-white font-hando",
    {
      "rounded-md": isRounded,
      "background-dark-blue-3": !background,
    },
    background,
    backgroundSize
  );

  return (
    <div
      className={classes}
      style={{
        width: width === "fill" ? "100%" : width,
        height: height === "fill" ? "100%" : height,
      }}
      ref={ref}>
      {children}
    </div>
  );
});

export const ChartCardEmpty: FC = ({ children }) => {
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  return (
    <ChartCard height={126} ref={ref}>
      <div className="pointer-events-none z-10" style={{ margin: "15px 0 0 21px" }}>
        {children}
      </div>
      <div className="absolute z-0 bottom-1" style={{ height: 100 }}>
        <LineGraph points={EMPTY_DATA} isScrollable={false} size={{ height: 100, width: bounds.width }} />
      </div>
    </ChartCard>
  );
};

export default ChartCard;
