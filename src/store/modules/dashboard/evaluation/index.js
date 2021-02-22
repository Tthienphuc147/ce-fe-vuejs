import * as TYPES from '../../../mutation.types'
import _ from "lodash";
const state = {
    evalutionListData: [],
    competenciesData: [],
    evaluationDetailData: {},
    saveData: {}
}

const mutations = {
    [TYPES.GET_LIST_EVALUATION]: (state, data) => {
        state.evalutionListData = data;
    },
    [TYPES.GET_DETAIL_EVALUATION]: (state, data) => {
        state.evaluationDetailData = data;
    },
    [TYPES.GET_COMPETENCIES]: (state, data) => {
        state.competenciesData = data;
    },
    [TYPES.SAVE_EVALUATION]: (state, data) => {
        state.saveData = data;
    },
}

const getters = {
    getEvaluationList: state => {
        return state.evalutionListData
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