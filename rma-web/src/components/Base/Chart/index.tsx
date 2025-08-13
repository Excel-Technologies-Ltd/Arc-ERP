import { createRef, useEffect, useRef } from "react";
import ChartJs, { ChartConfiguration } from "chart.js/auto";

export interface ChartElement extends HTMLCanvasElement {
  instance: ChartJs;
}

export interface ChartProps
  extends React.ComponentPropsWithoutRef<"canvas">,
    ChartConfiguration {
  width?: number | "auto";
  height?: number | "auto";
  getRef?: (el: ChartElement | null) => void;
}

const init = (el: ChartElement, props: ChartProps) => {
  const canvas = el?.getContext("2d");
  if (canvas) {
    const chart = new ChartJs(canvas, {
      type: props.type,
      data: props.data,
      options: props.options,
    });

    // Attach ChartJs instance
    el.instance = chart;
  }
};

function Chart({
  type = "line",
  data = {
    datasets: [],
  },
  options = {},
  width = "auto",
  height = "auto",
  getRef = () => {},
  className = "",
  ...computedProps
}: ChartProps) {
  const props = {
    type: type,
    data: data,
    options: options,
    width: width,
    height: height,
    getRef: getRef,
    className: className,
  };
  const initialRender = useRef(true);
  const chartRef = createRef<ChartElement>();

  useEffect(() => {
    if (initialRender.current) {
      props.getRef(chartRef.current);
      chartRef.current && init(chartRef.current, props);
      initialRender.current = false;
    } else {
      if (chartRef.current) {
        chartRef.current.instance.data = props.data;
        if (props.options) {
          chartRef.current.instance.options = props.options;
        }
        chartRef.current.instance.update();
      }
    }
  }, [props.data, props.options]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <canvas
        {...computedProps}
        className={props.className}
        ref={chartRef}
      ></canvas>
    </div>
  );
}

export default Chart;
