import * as http from "./base.service";

/**
 * login
 * @param {object} data
 */
const getAllAssociate = () => {
  return http.get(`api/associate/get-all`);
};
const saveAssociate = (data,id) => {
  const url = !id ? "api/associate/create" : "api/associate/update";
  console.log(id);
  return !id ? http.post(url, data) : http.put(url, data);
};
const getDetailAssociate= (id) => {
  return http.get(`api/associate/${id}`);
};

export { getAllAssociate, getDetailAssociate, saveAssociate };
