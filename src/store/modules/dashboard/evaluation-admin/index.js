import * as TYPES from '../../../mutation.types'
const state = {
    evalutionData: [],
}

const mutations = {
    [TYPES.GET_ALL_EVALUATION]: (state, data) => {
        state.evalutionData = data;
    },
}

const getters = {
    getAllEvaluation: state => {
        return state.evalutionData
    },
}

export default {
    state,
    mutations,
    getters
}