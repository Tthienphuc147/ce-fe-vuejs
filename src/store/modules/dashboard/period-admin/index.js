import * as TYPES from "../../../mutation.types";
import * as periodService from "../../../../shared/services/evaluation-period.service";
import router from "../../../../router";

const state = {
  saveData: null,
  periodListData: [],
  periodDetail: {},
};

const mutations = {
  [TYPES.SAVE_PERIOD]: (state, data) => {
    state.saveData = data;
  },
  [TYPES.GET_ALL_PERIOD_ADMIN]: (state, data) => {
    state.periodListData = data;
  },
  [TYPES.GET_DETAIL_PERIOD_ADMIN]: (state, data) => {
    state.periodDetail = data;
  },
};

const actions = {
  savePeriod({ commit }, data) {
    periodService.savePeriod(data, data.get("id")).then((res) => {
      commit(TYPES.SAVE_PERIOD, res), router.push("/period-manager");
      this.$toast(!data.get('id') ? "Create period Successfully" : "Update period Successfully", {
        type: "success",timeout: 1500
      });
    });
  },
  getAllPeriod({ commit }) {
    periodService.getAllPeriod().then((res) => {
      commit(TYPES.GET_ALL_PERIOD_ADMIN, res)
    });
  },
  getDetailPeriod({ commit }, id) {
    periodService.getDetailPeriod(id).then((res) => {
      commit(TYPES.GET_DETAIL_PERIOD_ADMIN, res)
    });
  },

};

const getters = {
  getAllPeriodAdmin: (state) => {
    return state.periodListData;
  },
  getDetailPeriodAdmin: (state) => {
    return state.periodDetail;
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
