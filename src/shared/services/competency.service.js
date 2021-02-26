import * as http from "./base.service";
const getAllCompetencyAdmin = () => {
  return http.get(`/api/competency/get-all`);
};
const getAllCompetencyTypeAdmin = () => {
  return http.get(`/api/competency-type/get-all`);
};
const getDetailCompetencyAdmin = (id) => {
  return http.get(`/api/competency/${id}`);
};
const saveCompetency = (data, id) => {
  console.log(id);
  const url = id ? "/api/competency/update" : "/api/competency/create";
  console.log(url);
  return id ? http.patch(url, data) : http.post(url, data);
};
export { getAllCompetencyAdmin, getAllCompetencyTypeAdmin, saveCompetency, getDetailCompetencyAdmin };
