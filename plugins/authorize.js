import Authorize from '@/helpers/authorize.js';

export default function ({ store, redirect }) {
  if (process.client) {
    Authorize.tryEducatorSignIn(store);
    Authorize.tryEmployerSignIn(store);
  }
}