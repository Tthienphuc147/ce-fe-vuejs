import * as http from './base.service'

/**
 * login
 * @param {object} data 
 */
const getProfile = (id) => {
  return http.get(`api/associate/${id}`)
}


export { getProfile }