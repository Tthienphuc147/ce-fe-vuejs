import * as http from "./base.service";

/**
 * login
 * @param {object} data
 */
const getSelfEvaluation = () => {
  return http.get(`api/evaluation/get-self-list`);
};
const getAllEvaluation = () => {
  return http.get(`api/evaluation/get-all`);
};
const getMemberEvaluation = (id) => {
  return http.get(`api/evaluation/get-member-list/${id}`);
};
const getDetailEvaluation = (id) => {
  return http.get(`api/evaluation/${id}`);
};
const getAllPeriodAvailable = () => {
  return http.get(`api/evaluation-period/get-available-period`);
};
const getAllStatus = () => {
  return http.get(`api/evaluation-status/get-all`);
};
const getDetailPeriod = (id) => {
  return http.get(`api/evaluation-period/${id}`);
};
const getCompetencies = (positionId) => {
  return http.get(
    `api/competency-position/get-detail?position_id=${positionId}`
  );
};
const getCompetencyDetail = (id) => {
  return http.get(`api/competency/${id}`);
};
const approveEvaluation = data => {
  return http.post(`api/evaluation/approve`,data);
};
const saveEvaluation = (data, id) => {
  const url = !id ? "api/evaluation/self-create" : "api/evaluation/update";
  return !id ? http.post(url, data) : http.patch(url, data);
};

export {
  getSelfEvaluation,
  getCompetencies,
  getDetailEvaluation,
  saveEvaluation,
  getAllPeriodAvailable,
  getDetailPeriod,
  getMemberEvaluation,
  getAllStatus,
  getCompetencyDetail,
  getAllEvaluation,
  approveEvaluation
};
