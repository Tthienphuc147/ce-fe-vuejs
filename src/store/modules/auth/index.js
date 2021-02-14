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
        state.userInfo = {
            email: loginData.email,
            name: loginData.name
        }
        state.token = loginData.jwttoken
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        localStorage.setItem('token', loginData.jwttoken)
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