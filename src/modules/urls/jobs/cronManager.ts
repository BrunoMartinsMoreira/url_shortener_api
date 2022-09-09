import { container } from 'tsyringe';

import { UrlCronJobs } from './UrlJobs';

const runJobs = async () => {
  const urlCronJobs = container.resolve(UrlCronJobs);
  const jobs = [urlCronJobs];
  jobs.forEach(job => job.startCronJob());
};

export default runJobs;
