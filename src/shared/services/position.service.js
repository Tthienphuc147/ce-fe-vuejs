import * as http from "./base.service";

/**
 * login
 * @param {object} data
 */
const getAllPosition = () => {
  return http.get(`api/position/get-all`);
};

export { getAllPosition};
