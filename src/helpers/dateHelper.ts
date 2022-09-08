import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getDate = (): string => {
  return dayjs().utc().local().format();
};
