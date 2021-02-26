import * as TYPES from "../../../mutation.types";
import * as competencyPositonService from "../../../../shared/services/competency-position.service";
import _ from "lodash";
import Vue from "vue";
const state = {
  comptencyPositionData: [],
  comptencyData: [],
  saveData: null
};

const mutations = {
  [TYPES.GET_ALL_COMPETENCY_POSITION]: (state, data) => {
    state.comptencyPositionData = data;
  },
  [TYPES.GET_ALL_COMPETENCY]: (state, data) => {
    state.comptencyData = data;
  },
  [TYPES.UPDATE_COMPETENCY_POSITION]: (state, data) => {
    state.saveData = data;
  },
};

const actions = {
  getAllCompetencyPositon({ commit },id) {
    competencyPositonService.getAllCompetencyPositon(id).then((res) => {
      commit(TYPES.GET_ALL_COMPETENCY_POSITION, res)
    });
  },

  getAllCompetency({ commit }) {
    competencyPositonService.getAllCompetency().then((res) => {
      commit(TYPES.GET_ALL_COMPETENCY, res)
    });
  },

  saveCompetencyPositon ({ commit }, data) {
    competencyPositonService.updateCompetencyPosition(data)
        .then((res) => {
          commit(TYPES.UPDATE_COMPETENCY_POSITION, res),
          Vue.notify({
            group: "notification",
            title: "Notification",
            type: "success",
            text: "Update Competency Positiom Successfully"
          });
        })
  },
};

const getters = {
  getDataCompetencyPositon: (state) => {
    state.comptencyPositionData = _( state.comptencyPositionData || [] ).groupBy( 'competency.competency_type_id' )
    .map( ( items ) => {
      return {
        competencyGroup: { ...items[0].competency.competency_type},
        itemData: (items || []).map(competency => {
          const model = {
            id: competency.id,
            competency_id: competency.competency_id,
            competency_standard_level: competency.competency_standard_level,
            competency_critical_level: competency.competency_critical_level,
            name: competency && competency.competency.name,
            position_id: competency.position_id,
            is_choosed: competency.is_choosed
          }
          return model;
        })
      };
    } )
    .value();
    return state.comptencyPositionData;
  },
  getDataCompetency: (state) => {
    return state.comptencyData;
  },

};

export default {
  state,
  mutations,
  getters,
  actions,
};
