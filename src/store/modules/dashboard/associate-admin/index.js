import * as TYPES from '../../../mutation.types'
import * as associateService from '../../../../shared/services/associates.service'
import router from "../../../../router";
const state = {
    roleData: null,
    saveData: null
}

const mutations = {
    [TYPES.SAVE_ASSOCIATE]: (state, data) => {
    state.saveData = data
    },
}

const actions = {
    saveAssociate ({ commit }, data) {
        associateService.saveAssociate(data, data.get('id'))
            .then((res) => {
              commit(TYPES.SAVE_ASSOCIATE, res),
              router.push("/associate-manager");
              this.$toast(!data.get('id') ? "Create associate Successfully" : "Update associate Successfully", {
                type: "success",timeout: 1500
              });
            })
      },
}

const getters = {
    //TODO get token
    getAllRole: state => {
        state.roleData = [
            {name: 'Member Role', id: 2},  {name: 'Admin Role', id: 3}
        ]
        return state.roleData;
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}