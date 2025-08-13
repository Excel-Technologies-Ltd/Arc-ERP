import Chart from "@/components/Base/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "@/utils/colors";
import { randomNumbers } from "@/utils/helper";
import { selectColorScheme } from "@/stores/colorSchemeSlice";
import { useAppSelector } from "@/stores/hooks";
import { useMemo } from "react";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width?: number | "auto";
  height?: number | "auto";
  lineColor?: string;
}

function Main({
  width = "auto",
  height = "auto",
  lineColor = "",
  className = "",
}: MainProps) {
  const props = {
    width: width,
    height: height,
    lineColor: lineColor,
    className: className,
  };
  const colorScheme = useAppSelector(selectColorScheme);

  const data: ChartData = useMemo(() => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: randomNumbers(0, 5, 12),
          borderWidth: 2,
          borderColor:
            colorScheme && props.lineColor.length
              ? props.lineColor
              : getColor("primary", 0.8),
          backgroundColor: "transparent",
          pointBorderColor: "transparent",
          tension: 0.4,
        },
      ],
    };
  }, [colorScheme]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
    };
  }, [colorScheme]);

  return (
    <Chart
      type="line"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

export default Main;
