import * as http from './base.service'

/**
 * login
 * @param {object} data 
 */
const login = (data) => {
  return http.post('api/login', data)
}

/**
 * logout
 */
const logout = () => {
  return http.post('api/logout')
}

export { login, logout }