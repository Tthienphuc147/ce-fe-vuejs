import * as TYPES from '../../../mutation.types'
import _ from "lodash";
const state = {
    evalutionListData: [],
    evalutionListMemberData: [],
    competenciesData: [],
    evaluationDetailData: {},
    availablePeriodData: [],
    evaluationPeriodData: {},
    currrentEvaluationStatus: {},
    evaluationStatusData: [],
    competencyDetail: {},
    saveData: {}
}

const mutations = {
    [TYPES.GET_LIST_EVALUATION]: (state, data) => {
        state.evalutionListData = data;
    },
    [TYPES.GET_ALL_STATUS]: (state, data) => {
      state.evaluationStatusData = data;
  },
    [TYPES.GET_LIST_MEMBER_EVALUATION]: (state, data) => {
      state.evalutionListMemberData = data;
  },
    [TYPES.GET_DETAIL_EVALUATION]: (state, data) => {
        state.evaluationDetailData = data;
    },
    [TYPES.GET_COMPETENCY_DETAIL]: (state, data) => {
      state.competencyDetail = data;
  },
    [TYPES.GET_COMPETENCIES]: (state, data) => {
        state.competenciesData = data;
    },
    [TYPES.GET_AVAILABLE_PERIOD]: (state, data) => {
      state.availablePeriodData = data;
  },
    [TYPES.SAVE_EVALUATION]: (state, data) => {
        state.saveData = data;
    },
    [TYPES.GET_DETAIL_PERIOD]: (state, data) => {
      state.evaluationPeriodData = data;
    },
    [TYPES.GET_CURRENT_STATUS]: (state, data) => {
      state.currrentEvaluationStatus = data;
    }
}

const getters = {
    getEvaluationList: state => {
        return state.evalutionListData
    },
    getEvaluationStatus: state => {
      const data = state.evaluationStatusData.map(item => {
        item['value'] = item.id,
        item['label'] = item.name
        return item;
      })
      return data;
  },
    getEvaluationMemberList: state => {
      return state.evalutionListMemberData
  },
    getEvaluationPeriod: state => {
      return state.evaluationPeriodData;
  },
  getDetailCompetency: state => {
    return state.competencyDetail;
},
    getAvailablePeriodSelect: state => {
      const data = state.availablePeriodData.map(item => {
        item['value'] = item.id,
        item['label'] = item.name
        return item;
      })
      return data;
  },
    getEvaluationDetail: state => {
        state.evaluationDetailData.competencies = _( state.evaluationDetailData.competencies || [] ).groupBy( 'competency.competency_type_id' )
          .map( ( items ) => {
            return {
              competencyGroup: { ...items[0].competency.competency_type},
              itemData: (items || []).map(competency => {
                competency["competency_id"] = competency.competency.competencyPosition?.competency_id;
                competency["competency_critical_level"] = competency.competency.competencyPosition?.competency_critical_level;
                competency["competency_standard_level"] = competency.competency.competencyPosition?.competency_standard_level;
                competency["name"]= competency.competency.name;
                return competency;
              })
            };
          } )
          .value();
        return state.evaluationDetailData;
    },

    getCurrentStatus: state => {
      return state.currrentEvaluationStatus;
    },
    
    getCompetencies: state => {
          let data = _( state.competenciesData || [] ).groupBy( 'competency_type_id' )
          .map( ( items ) => {
            return {
              competencyGroup: { ...items[0].competency_type},
              itemData: (items || []).map(competency => {
                competency["competency_id"] = competency.competencyPosition?.competency_id;
                competency["competency_critical_level"] = competency.competencyPosition?.competency_critical_level;
                competency["competency_standard_level"] = competency.competencyPosition?.competency_standard_level;
                return competency;
              })
            };
          } )
          .value();
        return data;
    },
}

export default {
    state,
    mutations,
    getters
}