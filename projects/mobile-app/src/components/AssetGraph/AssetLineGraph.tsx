import React, { FC, useEffect } from "react";
import * as d3 from "d3";
import { Point } from "components/common/types";

type Margin = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

interface AssetLineGraphProps {
  points: Point[];
  fill?: boolean;
  /** Set the total size of the graph */
  size: { height: number; width: number };
  /** ID allows to pass in a unique ID for creating chart elements whenever multiple charts are on same page */
  id?: string;
  margin?: Margin;
}

export const AssetLineGraph: FC<AssetLineGraphProps> = ({ points, size, fill = true, id = "", margin = {} }) => {
  const AREA_SVG_ID = "area_svg" + id;
  const LINE_GRADIENT_ID = "line_gradient" + id;
  const LINE_SVG_ID = "line" + id;
  const MAIN_SVG_ID = "main" + id;

  const newMargin = {
    top: margin.top ?? 0,
    right: margin.right ?? 0,
    bottom: margin.bottom ?? 0,
    left: margin.left ?? 0,
  };

  const height = size.height - newMargin.top - newMargin.bottom;
  const width = size.width - newMargin.left - newMargin.right;

  const xExtent = d3.extent(points, (d) => d.x) as [number, number];
  const yExtent = d3.extent(points, (d) => d.y) as [number, number];

  const x = d3.scaleLinear().domain(xExtent).range([0, width]);
  const y = d3.scaleLinear().domain(yExtent).range([height, 0]);

  const line = d3
    .line<Point>()
    .curve(d3.curveBundle.beta(1))
    .x((d) => x(d.x))
    .y((d) => y(d.y ?? 0));

  const area = d3
    .area<Point>()
    .curve(d3.curveBasis)
    .x((d) => x(d.x))
    .y0(height)
    .y1((d) => y(d.y ?? 0));

  // Build out the initial SVGS
  // This only runs on mount, then we deal with
  // updating data in another effect
  useEffect(() => {
    const svg = d3.select(`#${MAIN_SVG_ID}`).attr("width", width).attr("height", height).append("g");

    const defs = svg.append("defs");

    // Create the gradient for the line
    const lineGradient = defs.append("linearGradient").attr("id", LINE_GRADIENT_ID);
    let strokeWidth;

    if (fill) {
      strokeWidth = "1";
      lineGradient.append("stop").attr("offset", "0%").attr("stop-color", "#52D0FE").attr("stop-opacity", 1);
      lineGradient.append("stop").attr("offset", "50%").attr("stop-color", "#FFFFFF").attr("stop-opacity", 1);
      lineGradient.append("stop").attr("offset", "100%").attr("stop-color", "#52D0FE").attr("stop-opacity", 1);
      svg.append("path").attr("id", AREA_SVG_ID).attr("fill", "#52D0FF").attr("stroke", "none");
    } else {
      strokeWidth = "2.5";
      lineGradient.append("stop").attr("offset", "10%").attr("stop-color", "#275471").attr("stop-opacity", 1);
      lineGradient.append("stop").attr("offset", "50%").attr("stop-color", "#21ACE3").attr("stop-opacity", 1);
      lineGradient.append("stop").attr("offset", "90%").attr("stop-color", "#275471").attr("stop-opacity", 1);
    }

    svg
      .append("path")
      .attr("id", LINE_SVG_ID)
      .attr("stroke", `url(#${LINE_GRADIENT_ID})`)
      .attr("fill", "none")
      .attr("stroke-width", strokeWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    d3.select(`#${MAIN_SVG_ID}`).attr("width", width).attr("height", height);
    d3.select(`#${LINE_SVG_ID}`).datum(points).attr("d", line);
    d3.select(`#${AREA_SVG_ID}`).datum(points).attr("d", area);
  }, [points, height, width, area, line, MAIN_SVG_ID, LINE_SVG_ID, AREA_SVG_ID]);

  return (
    <div className="relative">
      <svg className="absolute z-0 mt-[1px]" id={MAIN_SVG_ID} height={height} width={width} />
      <svg className="absolute z-10" id={`main_line${id}`} />
    </div>
  );
};
