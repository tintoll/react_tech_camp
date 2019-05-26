const SERVER = "https://codebrew.kr";
const API_PREFIX = "openapi";

interface Config {
  orders: {
    request: {
      success: string;
      failure: string;
    };
  };
}

const config: Config = {
  orders: {
    request: {
      success: `${SERVER}/${API_PREFIX}/orders/request/success`,
      failure: `${SERVER}/${API_PREFIX}/orders/request/failure`
    }
  }
};

export default config;
