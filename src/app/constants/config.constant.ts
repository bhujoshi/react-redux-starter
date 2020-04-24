const getBaseUrlBasedOnEnvirement = function() {
  switch (process.env.REACT_APP_BACKEND_ENV) {
    case 'development':
      return 'http://fb1schoolpat.mypat.in/';
    case 'production':
      return 'https://v2enterprise-api.mypat.in/';
    default:
      return 'http://fb1schoolpat.mypat.in/';
  }
};

const BASE_URL = getBaseUrlBasedOnEnvirement();
export const API_BASE_URL = BASE_URL + 'v3/';
export const API_AUTH_BASE_URL = BASE_URL + 'auth/v3/';
