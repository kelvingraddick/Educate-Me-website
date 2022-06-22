import Authorize from '@/helpers/authorize.js';

export default function ({ $config, store }) {
  if (process.client) {
    Authorize.tryEducatorSignIn($config.EDCOM_HQ_JOBS_API_BASE_URL, store);
    Authorize.tryEmployerSignIn($config.EDCOM_HQ_JOBS_API_BASE_URL, store);
  }
}