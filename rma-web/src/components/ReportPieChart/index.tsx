import Chart from '@/components/Base/Chart';
import { ChartData, ChartOptions } from 'chart.js/auto';
import { getColor } from '@/utils/colors';
import { selectDarkMode } from '@/stores/darkModeSlice';
import { useAppSelector } from '@/stores/hooks';
import { useMemo } from 'react';

interface MainProps extends React.ComponentPropsWithoutRef<'canvas'> {
  width?: number | 'auto';
  height?: number | 'auto';
}

function Main({ width = 'auto', height = 'auto', className = '' }: MainProps) {
  const props = {
    width: width,
    height: height,
    className: className,
  };
  const darkMode = useAppSelector(selectDarkMode);

  const chartData = [15, 10, 65];
  const chartColors = () => [
    getColor('pending', 0.9),
    getColor('warning', 0.9),
    getColor('primary', 0.9),
  ];
  const data: ChartData = useMemo(() => {
    return {
      labels: ['Yellow', 'Dark'],
      datasets: [
        {
          data: chartData,
          backgroundColor: chartColors(),
          hoverBackgroundColor: chartColors(),
          borderWidth: 5,
          borderColor: darkMode ? getColor('darkmode.700') : getColor('white'),
        },
      ],
    };
  }, [darkMode]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  }, [darkMode]);

  return (
    <Chart
      type='pie'
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

export default Main;
