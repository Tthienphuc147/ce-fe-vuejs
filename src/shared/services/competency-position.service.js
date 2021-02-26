import * as http from "./base.service";

const getAllCompetencyPositon = (id) => {
  return http.get(`/api/competency-position/get-all-competency-position/${id}`);

};
const getAllCompetency = () => {
  return http.get(`/api/competency/get-all`);
};
const updateCompetencyPosition = (data) => {
  return http.patch(`/api/competency-position/update`,data);
};
export { getAllCompetencyPositon, getAllCompetency, updateCompetencyPosition };
