import * as TYPES from '../../../mutation.types'
import * as associateService from '../../../../shared/services/associates.service'
import router from "../../../../router";
import Vue from "vue";
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
              Vue.notify({
                group: "notification",
                title: "Notification",
                type: "success",
                text: !data.get('id') ? "Create associate Successfully" : "Update associate Successfully"
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