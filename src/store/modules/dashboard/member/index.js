import * as TYPES from '../../../mutation.types'
const state = {
    associateListData: [],
    positionData: [],
}

const mutations = {
    [TYPES.GET_LIST_ASSOCIATES]: (state, data) => {
        state.associateListData = data;
    },
    [TYPES.GET_ALL_POSITION]: (state, data) => {
        state.positionData = data;
    }
}

const getters = {
    getAssociateList: state => {
        return state.associateListData
    },
    getAllPosition: state => {
        const data = state.positionData.map(item => {
            item['value'] = item.id,
            item['label'] = item.name
            return item;
          })
          return data;
    },
}

export default {
    state,
    mutations,
    getters
}