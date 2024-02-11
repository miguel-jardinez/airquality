import {
  CategoryScale,
  Chart as ChartJS,
  ChartData, Filler, Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Select, Stack, useBreakpointValue } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { optionsDates } from '@quality/utils/dates';
import { Sensor } from '@quality/types/LocationDetails';
import { Dispatch, SetStateAction } from 'react';

interface LineChartProps {
  labels: string[];
  data: number[];
  sensors: Sensor[];
  setSensorSelected: Dispatch<SetStateAction<string | null>>
  setDateSelected: Dispatch<SetStateAction<string>>
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const LineChart: React.FC<LineChartProps> = ({
  labels,
  data,
  sensors,
  setSensorSelected,
  setDateSelected,
}) => {
  const size = useBreakpointValue({ base: 'sm', lg: 'lg', md: 'md' }, { ssr: true });

  const options = {
    responsive: true,
    aspectRatio: size === 'sm' ? 1 : 1.5,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataChart: ChartData<'line', number[], string> = {
    labels,
    datasets: [
      {
        fill: true,
        data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <Stack direction={['column', 'row']} mb={4}>
        <Select onChange={(event) => setSensorSelected(event.target.value)}>
          {
            sensors.map((sensor) => (
              <option value={sensor.parameter.id}>{ sensor.parameter.name }</option>
            ))
          }
        </Select>

        <Select onChange={(e) => setDateSelected(e.target.value)}>
          {
            optionsDates.map((date) => (
              <option value={date.value}>{ date.label }</option>
            ))
          }
        </Select>
      </Stack>

      <Line data={dataChart} options={options} />
    </>

  );
};
