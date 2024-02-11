import dayjs from 'dayjs';

export const optionsDates = [
  { label: 'Last 24 Hours', value: dayjs().subtract(1, 'day').toISOString() },
  { label: 'Last 48 Hours', value: dayjs().subtract(2, 'days').toISOString() },
  { label: 'Last 72 Hours', value: dayjs().subtract(3, 'day').toISOString() },
  { label: 'Last Week', value: dayjs().subtract(7, 'day').toISOString() },
  { label: 'Last 30 days', value: dayjs().subtract(30, 'day').toISOString() },
];

export const dateFromNow = (date: Date) => {
  const daysAgo = dayjs().diff(dayjs(date), 'days');
  const minutesAgo = dayjs().diff(dayjs(date), 'minutes');
  const hoursAgo = dayjs().diff(dayjs(date), 'hours');

  if (daysAgo > 0) {
    return `${daysAgo} Days Ago`;
  }

  if (minutesAgo > 0 && minutesAgo < 59) {
    return `${minutesAgo} Minutes Ago`;
  }

  if (hoursAgo > 0 && hoursAgo < 23) {
    return `${hoursAgo} Hours Ago`;
  }
};

export const dateDefaultFormat = (date: Date) => dayjs(date).format('DD/MM/YYYY');
