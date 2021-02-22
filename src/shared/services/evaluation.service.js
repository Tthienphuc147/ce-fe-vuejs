import * as http from "./base.service";

/**
 * login
 * @param {object} data
 */
const getSelfEvaluation = () => {
  return http.get(`api/evaluation/get-self-list`);
};
const getDetailEvaluation = (id) => {
  return http.get(`api/evaluation/${id}`);
};
const getCompetencies = (positionId) => {
  return http.get(`api/competency-position/get-detail?position_id=${positionId}`);
};
const saveEvaluation = (data, id) => {
  const url = !id ? 'api/evaluation/self-create': 'api/evaluation/update';
  return !id ? http.post(url, data): http.patch(url, data);
}

export { getSelfEvaluation, getCompetencies, getDetailEvaluation, saveEvaluation };
