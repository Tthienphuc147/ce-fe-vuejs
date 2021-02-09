import * as TYPES from '../../mutation.types'

const state = {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    token: localStorage.getItem('token') || ''
}

const actions = {

}

const mutations = {
    //TODO set token
    [TYPES.LOGIN]: (state, loginData) => {
        state.userInfo = loginData.data
        state.token = loginData.api_token
        localStorage.setItem('userInfo', JSON.stringify(loginData.data))
        localStorage.setItem('token', loginData.api_token)
    },
    [TYPES.LOGOUT]: state => {
        state.userInfo = {}
        state.token = ''
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
    }
}

const getters = {
    //TODO get token
    getAuthenticationToken: state => {
        return state.token
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}