import * as http from "./base.service";

/**
 * login
 * @param {object} data
 */
const getAllPeriod = () => {
  return http.get(`api/evaluation-period/get-all`);
};
const savePeriod = (data,id) => {
  const url = !id ? "api/evaluation-period/create" : "api/evaluation-period/update";
  return !id ? http.post(url, data) : http.patch(url, data);
};
const getDetailPeriod= (id) => {
  return http.get(`api/evaluation-period/${id}`);
};

export { getAllPeriod, getDetailPeriod, savePeriod };
