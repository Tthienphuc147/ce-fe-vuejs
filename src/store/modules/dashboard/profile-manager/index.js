import * as TYPES from '../../../mutation.types'
const state = {
    profileData: null
}

const mutations = {
    [TYPES.GET_PROFILE]: (state, data) => {
        state.profileData = data;
    },
}

const getters = {
    //TODO get token
    getProfile: state => {
        return state.profileData
    },
}

export default {
    state,
    mutations,
    getters
}