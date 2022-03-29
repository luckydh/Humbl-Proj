import React, { FC, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import * as d3 from "d3";
import { clamp } from "lodash";
import { Point } from "components/common/types";

const AREA_GRADIENT_ID = "area_gradient";
const AREA_MASK_ID = "area_mask";
const AREA_MASK_PATH_ID = "area_mask_path_id";
const AREA_MASK_RECT_ID = "area_mask_rect_id";
const AREA_SVG_ID = "area_svg";
const LINE_DROP_SHADOW_ID = "line_drop_shadow";
const LINE_GRADIENT_ID = "line_gradient";
const LINE_SVG_ID = "line";
const MAIN_LINE_SVG_ID = "main_line";
const MAIN_SVG_ID = "main";
const WHITE_MASK_ID = "white_mask";
const WHITE_MASK_RECT_ID = "white_mask_rect";
const WHITE_TOP_SVG_ID = "white_top";
const WHITE_BOTTOM_SVG_ID = "white_bottom";

const circleSize = 18;

type Margin = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

interface LineGraphProps {
  points: Point[];
  /** Set the total size of the graph */
  size: { height: number; width: number };
  /**
   * Can the graph be dragged left/right to change
   * the current value?
   * @default true
   */
  isScrollable?: boolean;
  /** Respond to drag changes */
  onChange?: (point: Point) => void;
  /** Callback when touchend or mouseup completes */
  onComplete?: () => void;
  /** Set marging around the entire graph */
  margin?: Margin;
}

export const LineGraph: FC<LineGraphProps> = ({
  points,
  isScrollable = true,
  margin = {},
  onChange,
  onComplete,
  size,
}) => {
  const eventTypeRef = useRef<"touch" | "mouse" | null>(null);

  const newMargin = useMemo(() => ({
    top: margin.top ?? 0,
    right: margin.right ?? 0,
    bottom: margin.bottom ?? 0,
    left: margin.left ?? 0,
  }), [margin]);

  const height = size.height - newMargin.top - newMargin.bottom;
  const width = size.width - newMargin.left - newMargin.right;

  const startEventTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const circleRef = useRef<HTMLDivElement | null>(null);
  const widthRef = useRef<number>(width);
  const pathRef = useRef<SVGPathElement | null>(null);
  const whiteLineRef = useRef<SVGLineElement | null>(null);
  const whiteMaskRef = useRef<SVGRectElement | null>(null);
  const pathXRef = useRef<number>(0);

  const { rangeX, line, area } = useMemo(() => {
    const xExtent = d3.extent(points, (d) => d.x) as [number, number];
    const rangeX = d3.scaleLinear().domain(xExtent).range([0, width]);

    const yExtent = d3.extent(points, (d) => d.y) as [number, number];
    const rangeY = d3.scaleLinear().domain(yExtent).range([height, 0]);

    const line = d3
      .line<Point>()
      .curve(d3.curveBundle.beta(1))
      .defined((d) => d.y !== null)
      .x((d) => rangeX(d.x))
      .y((d) => rangeY(d.y ?? 0));
    const area = d3
      .area<Point>()
      .curve(d3.curveBasis)
      .defined((d) => d.y !== null)
      .x((d) => rangeX(d.x))
      .y0(height)
      .y1((d) => rangeY(d.y ?? 0));

    return {
      rangeX,
      line,
      area,
    };
  }, [points, height, width]);

  // Build out the initial SVGS
  // This only runs on mount, then we deal with
  // updating points in the next effect below
  useEffect(() => {
    const svg = d3
      .select(`#${MAIN_SVG_ID}`)
      .attr("width", width + newMargin.left + newMargin.right)
      .attr("height", height + newMargin.top + newMargin.bottom)
      .append("g");

    const mainLineSvg = d3
      .select(`#${MAIN_LINE_SVG_ID}`)
      .attr("width", width + newMargin.left + newMargin.right)
      .attr("height", height + newMargin.top + newMargin.bottom)
      .append("g");

    const defs = svg.append("defs");

    // Create the gradient for the line
    const lineGradient = defs.append("linearGradient").attr("id", LINE_GRADIENT_ID);
    lineGradient.append("stop").attr("offset", "10%").attr("stop-color", "#275471").attr("stop-opacity", 1);
    lineGradient.append("stop").attr("offset", "50%").attr("stop-color", "#21ACE3").attr("stop-opacity", 1);
    lineGradient.append("stop").attr("offset", "90%").attr("stop-color", "#275471").attr("stop-opacity", 1);

    // Create the gradient for the main fill
    const areaGradient = defs
      .append("linearGradient")
      .attr("id", AREA_GRADIENT_ID)
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    areaGradient
      .append("stop")
      .attr("offset", "23%")
      .attr("stop-color", "rgba(33, 171, 227, 0.1)")
      .attr("stop-opacity", 1);
    areaGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(33, 172, 227, 0)")
      .attr("stop-opacity", 0);

    // Create the dropshadow on the line
    const filter = defs.append("filter").attr("id", LINE_DROP_SHADOW_ID);
    filter
      .append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "4")
      .attr("stdDeviation", "6")
      .attr("flood-color", "rgba(3, 3, 3, 0.2)");

    // Create a mask for the white box that follows the line
    const areaMask = svg.append("mask").attr("id", AREA_MASK_ID);
    areaMask.append("path").attr("id", AREA_MASK_PATH_ID).attr("fill", "white");
    areaMask.append("rect").attr("x", "0").attr("id", AREA_MASK_RECT_ID).attr("fill", "white");

    if (isScrollable) {
      const whiteMask = svg.append("mask").attr("id", WHITE_MASK_ID);
      whiteMask.append("rect").attr("id", WHITE_MASK_RECT_ID).attr("x", "0").attr("y", "0")
        .attr("fill", "white");
    }

    // Build the actual SVG
    svg.append("path").attr("id", AREA_SVG_ID).attr("fill", `url(#${AREA_GRADIENT_ID})`).attr("stroke", "none");
    mainLineSvg
      .append("path")
      .attr("id", LINE_SVG_ID)
      .attr("stroke", `url(#${LINE_GRADIENT_ID})`)
      .attr("fill", "none")
      .attr("stroke-width", "2.5")
      .attr("filter", `url(#${LINE_DROP_SHADOW_ID})`);

    if (isScrollable) {
      svg
        .append("path")
        .attr("y", "20")
        .attr("fill", "white")
        .attr("fill-opacity", "0.1")
        .attr("opacity", "0")
        .attr("id", WHITE_TOP_SVG_ID)
        .attr("mask", `url(#${WHITE_MASK_ID})`);
      svg
        .append("rect")
        .attr("id", WHITE_BOTTOM_SVG_ID)
        .attr("x", "0")
        .attr("fill", "white")
        .attr("opacity", "0")
        .attr("fill-opacity", "0.1")
        .attr("mask", `url(#${WHITE_MASK_ID})`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This effect deals with just updating the svg elements when
  // the graph geometry or points changes.
  useEffect(() => {
    d3.select(`#${MAIN_SVG_ID}`)
      .attr("width", width + newMargin.left + newMargin.right)
      .attr("height", height + newMargin.top + newMargin.bottom);

    d3.select(`#${MAIN_LINE_SVG_ID}`)
      .attr("width", width + newMargin.left + newMargin.right)
      .attr("height", height + newMargin.top + newMargin.bottom);

    d3.select(`#${AREA_MASK_RECT_ID}`)
      .attr("y", height)
      .attr("height", newMargin.top + newMargin.bottom)
      .attr("width", width);

    d3.select(`#${WHITE_TOP_SVG_ID}`)
      .datum(points)
      .attr("d", area)
      .attr("height", newMargin.top + newMargin.bottom)
      .attr("width", width);

    // This value establishes the lowest x position we will respond
    // to when enabling cursor move.
    // e.g. path starts at middle of graph due to null data,
    // this value will be the x coordinate at which point the graph line starts.
    // Thus, if the user is scrubbing to a value less than this point, we ignore
    pathXRef.current = pathRef.current?.getBBox().x ?? 0;

    d3.select(`#${WHITE_BOTTOM_SVG_ID}`)
      .attr("x", pathXRef.current)
      .attr("y", height)
      .attr("height", newMargin.top + newMargin.bottom)
      .attr("width", width);

    d3.select(`#${WHITE_MASK_RECT_ID}`)
      .attr("height", height + newMargin.top + newMargin.bottom)
      .attr("width", width);

    const whiteMask = d3.select(`#${WHITE_MASK_RECT_ID}`).node() as SVGRectElement;
    whiteMaskRef.current = whiteMask;
    const path = d3.select(`#${LINE_SVG_ID}`);
    path.datum(points).attr("d", line);
    pathRef.current = path.node() as SVGPathElement;

    d3.select(`#${AREA_SVG_ID}`).datum(points).attr("d", area);
    d3.select(`#${AREA_MASK_PATH_ID}`).datum(points).attr("d", area);
  }, [points, height, width, area, line, newMargin]);

  useLayoutEffect(() => {
    widthRef.current = width;
  }, [width]);

  const moveLineIndicator = (point: Point): void => {
    if (!circleRef.current) {
      return;
    }

    circleRef.current.style.transform = `translate(${point.x}px, ${point.y}px)`;

    if (whiteMaskRef.current) {
      whiteMaskRef.current.setAttribute("x", `${point.x - widthRef.current}`);
    }

    if (whiteLineRef.current) {
      whiteLineRef.current.setAttribute("x1", `${point.x}`);
      whiteLineRef.current.setAttribute("x2", `${point.x}`);
    }
  };

  const setDraggableElementsOpacity = (opacity: number): void => {
    if (circleRef.current) {
      circleRef.current.style.opacity = `${opacity}`;
    }

    if (whiteLineRef.current) {
      whiteLineRef.current.style.opacity = `${opacity}`;
    }

    d3.select(`#${WHITE_BOTTOM_SVG_ID}`).attr("opacity", `${opacity}`);
    d3.select(`#${WHITE_TOP_SVG_ID}`).attr("opacity", `${opacity}`);
  };

  // TODO: need to better handle what happens with limited history data.
  const onEventMoveHandler = (event: TouchEvent | MouseEvent) => {
    const eventType = eventTypeRef.current;

    if (!pathRef.current || !eventType) {
      return;
    }

    const eventPoint = eventType === "touch" ? (event as TouchEvent).targetTouches[0] : (event as MouseEvent);
    const { clientX } = eventPoint;

    const beyondWindowBounds = clientX < 0 || clientX > window.innerWidth;
    // Constrain value changes to window bounds
    if (beyondWindowBounds) {
      const firstOrLastPoint = clientX < 0 ? points[0] : points[points.length - 1];
      onChange?.(firstOrLastPoint);
      return;
    }

    const eventX = clamp(eventPoint.clientX, 0, widthRef.current);
    const [nearestX] = d3.pointer(eventPoint);

    // This is the minimum x value which should be the minimum x pos for the first non-null point.
    const xBeforeAvailableData = eventX < pathXRef.current;

    // offset nearestX to account for circle
    const offsetNearestX = xBeforeAvailableData ? pathXRef.current : nearestX - circleSize;
    // This value eventually becomes a coordinate for svg and needs to be a float.
    const x = xBeforeAvailableData ? pathXRef.current : eventX - 0.1;

    const pointIndex = getPointIndex(offsetNearestX, points, rangeX);
    const point = points[pointIndex];
    const y = getYFromPath(pathRef.current, x);

    if (point) {
      onChange?.(point);
      moveLineIndicator({ x, y: y ?? 0 });
    }
  };

  const onEventEndHandler = () => {
    eventTypeRef.current = null;
    setDraggableElementsOpacity(0);
    onComplete?.();

    if (startEventTimeoutRef.current) {
      clearTimeout(startEventTimeoutRef.current);
    }

    window.removeEventListener("touchmove", onEventMoveHandler);
    window.removeEventListener("touchend", onEventEndHandler);
    window.removeEventListener("mousemove", onEventMoveHandler);
    window.removeEventListener("mouseup", onEventEndHandler);
  };

  const onEventStartHandler = (event: React.TouchEvent | React.MouseEvent): void => {
    if (!isScrollable) {
      return;
    }

    if (event.type === "touchstart") {
      eventTypeRef.current = "touch";
      window.addEventListener("touchmove", onEventMoveHandler);
      window.addEventListener("touchend", onEventEndHandler);
    } else {
      eventTypeRef.current = "mouse";
      window.addEventListener("mousemove", onEventMoveHandler);
      window.addEventListener("mouseup", onEventEndHandler);
    }

    const e = event.nativeEvent;

    // Since the graph expands when going from inactive to active
    // we need to delay the setting displaying the cursor etc
    // to ensure they are positioned correctly.
    // So this first event call will move the cursor
    // but more importantly will signal up a change
    // which will start the animation.
    onEventMoveHandler(e);
    startEventTimeoutRef.current = setTimeout(() => {
      if (e?.type) {
        onEventMoveHandler(e);
        setDraggableElementsOpacity(1);
      }
    }, 200);
  };

  useEffect(
    () => onEventEndHandler,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      className="relative w-full h-full pointer-events-auto"
      onTouchStart={onEventStartHandler}
      onMouseDown={onEventStartHandler}>
      {isScrollable && (
        <div
          className="absolute z-20 transition-opacity rounded-full opacity-0 pointer-events-none chart-line-drag"
          ref={circleRef}
          style={{
            height: circleSize,
            width: circleSize,
            margin: "-9px 0 0 -9px",
            background: "#21ACE3",
            border: "2px solid white",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          }}
        />
      )}
      <svg className="absolute z-10 pointer-events-none" id={MAIN_LINE_SVG_ID} />
      <svg className="absolute z-0 pointer-events-none" id={MAIN_SVG_ID} height={height} width={width}>
        <line
          className="transition-opacity"
          x1={0}
          y1={0}
          x2={0}
          y2={height * 2}
          stroke="white"
          strokeWidth="2.5"
          ref={whiteLineRef}
          mask={`url(#${AREA_MASK_ID})`}
          opacity="0"
        />
      </svg>
    </div>
  );
};

function getYFromPath(path: SVGPathElement, x: number) {
  const pathLength = path.getTotalLength();

  let start = 0;
  let end = pathLength;
  let target = (start + end) / 2;

  // Ensure that x is within the range of the path
  x = Math.max(x, path.getPointAtLength(0).x);
  x = Math.min(x, path.getPointAtLength(pathLength).x);

  // Walk along the path using binary search
  // to locate the point with the supplied x value
  while (target >= start && target <= pathLength) {
    const pos = path.getPointAtLength(target);

    // use a threshold instead of strict equality
    // to handle javascript floating point precision
    if (Math.abs(pos.x - x) < 0.001) {
      return pos.y;
    }
    if (pos.x > x) {
      end = target;
    } else {
      start = target;
    }
    target = (start + end) / 2;
  }
}

const bisectX = d3.bisector<Point, number>((d) => d.x).left;

function getPointIndex(x: number, points: Point[], rangeX: d3.ScaleLinear<number, number>): number {
  // recover coordinate we need
  const x0 = rangeX.invert(x);

  let pointIndex = bisectX(points, x0, 0);

  const nextPointIndex = pointIndex - 1;
  // Determine whether the next point is actually closer.
  if (points[nextPointIndex] && points[pointIndex]) {
    const pointDelta = Math.abs(points[pointIndex].x - x0);
    const nextPointDelta = Math.abs(points[nextPointIndex].x - x0);
    pointIndex = pointDelta > nextPointDelta ? nextPointIndex : pointIndex;
  }

  return clamp(pointIndex, 0, points.length - 1);
}
