<template>
  <div>
    <modal name="modal1" class="modal-info" v-if="competencyDetail">
      <div>
        <div class="container container-modal">
          <div class="title text-uppercase font-weight-bold mb-3">
            Thông tin nội dung đánh giá
          </div>
          <div class="content text-left">
            <p><strong>Tên nội dung:</strong> {{competencyDetail.name}}</p>
            <p><strong>Mô tả:</strong> {{competencyDetail.description}}</p>
            <hr>
            <table class="table table-bordered">
              <thead>
                <th></th>
                <th>Cấp 1</th>
                <th>Cấp 2</th>
                <th>Cấp 3</th>
                <th>Cấp 4</th>
                <th>Cấp 5</th>  
              </thead>
              <tbody v-for="(dem,i) in competencyDetail.dimensions" :key="i">
                <tr>
                  <td>{{dem.name}}</td>
                  <td v-for="(level,j) in dem.dimension_level" :key="j">
                    {{level.content}}
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      </div>
    </modal>
    <div
      class="evauation-status"
      :class="{
        'evauation-status--new': status.id === 1,
        'evauation-status--evaluated': status.id === 2,
        'evauation-status--waiting': status.id === 3,
        'evauation-status--approved': status.id === 4,
      }"
    >
      {{ status.name }}
    </div>
    <div class="evaluation-title">
      <h3 class="text-uppercase font-weight-bold">
        bảng đánh giá năng lực nhân viên
      </h3>
      <h4 class="font-weight-bold" v-if="period">
        Kỳ đánh giá: {{ period.name }}
      </h4>
    </div>
    <hr class="border-dash" />
    <div class="user-information" v-if="userInformation">
      <p class="text-uppercase font-weight-bold text-left">
        thông tin nhân viên
      </p>
      <div class="row mb-2">
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Họ và tên"
            disabled
            v-model="userInformation.fullName"
          />
        </div>
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Ngày sinh"
            disabled
            v-model="userInformation.birthday"
          />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Bộ phận"
            disabled
            v-if="userInformation.positionGroup"
            v-model="userInformation.positionGroup.name"
          />
        </div>
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Vị trí"
            disabled
            v-if="userInformation.position"
            v-model="userInformation.position.name"
          />
        </div>
      </div>
    </div>
    <hr class="border-dash" />
    <div class="evaluation-information">
      <p class="text-uppercase font-weight-bold text-left">
        thông tin đánh giá
      </p>
      <div class="table-area mt-2">
        <table class="table table-bordered" v-if="competencies">
          <thead>
            <tr>
              <th>Nội dung đánh giá</th>
              <th>Mức độ quan trọng</th>
              <th>Mức năng lực tiêu chuẩn</th>
              <th>Điểm chuẩn</th>
              <th>
                <p class="mb-0">Mức năng lực đ/giá</p>
                <p class="mb-0 sub-font">(Cá nhân)</p>
              </th>
              <th>
                <p class="mb-0">Mức năng lực đ/giá</p>
                <p class="mb-0 sub-font">(Quản lý)</p>
              </th>
              <th>
                <p class="mb-0">Điểm đ/giá</p>
                <p class="mb-0 sub-font">(Cá nhân)</p>
              </th>
              <th>
                <p class="mb-0">Điểm đ/giá</p>
                <p class="mb-0 sub-font">(Quản lý)</p>
              </th>
              <th>
                <p class="mb-0">Ghi chú</p>
                <p class="mb-0 sub-font">(Cá nhân)</p>
              </th>
              <th>
                <p class="mb-0">Ghi chú</p>
                <p class="mb-0 sub-font">(Quản lý)</p>
              </th>
            </tr>
          </thead>
          <tbody v-for="(competency, i) in competencies" :key="i">
            <tr class="competency-common">
              <td class="text-left">
                {{ i + 1 }}.{{ competency.competencyGroup.name }}
              </td>
              <td></td>
              <td></td>
              <td class="text-right">
                {{ Math.floor(100 / competencies.length) }}
              </td>
              <td></td>
              <td></td>
              <td class="text-right">
                {{
                  getSumPoint(competency.itemData, false) > 0
                    ? getSumPoint(competency.itemData, false)
                    : ""
                }}
              </td>
              <td class="text-right">
                {{
                  getSumPoint(competency.itemData, true) > 0
                    ? getSumPoint(competency.itemData, true)
                    : ""
                }}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="(item, j) in competency.itemData" :key="j">
              <td class="text-left">
                <div class="d-flex justify-content-between align-items-center">
                  <div>{{ item.name }}</div>
                  <span  @click="showInformation(item.competency_id)"
                    ><i
                      class="fa table-icon--info fa-info-circle cursor-pointer"
                      aria-hidden="true"
                    ></i
                  ></span>
                </div>
              </td>
              <td class="text-right">{{ item.competency_critical_level }}</td>
              <td class="text-right">{{ item.competency_standard_level }}</td>
              <td class="text-right">
                {{
                  getStandardPoint(
                    item.competency_critical_level,
                    competency.itemData
                  )
                }}
              </td>
              <td>
                <div class="d-flex justify-content-center">
                  <vue-numeric-input
                    class="competency-input"
                    v-model="item.evaluation_level"
                    :disabled="
                      roleId !== 2 || status.id === 2 || status.id === 4
                    "
                    :class="{ 'is-invalid': isSend && !item.evaluation_level }"
                    :min="1"
                    :max="3"
                  ></vue-numeric-input>
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-center">
                  <vue-numeric-input
                    class="competency-input"
                    v-model="item.evaluation_level_manager"
                    :disabled="
                      roleId != 3 || status.id === 3 || status.id === 4
                    "
                    :class="{
                      'is-invalid':
                        isSend &&
                        roleId === 3 &&
                        !item.evaluation_level_manager,
                    }"
                    :min="1"
                    :max="3"
                  ></vue-numeric-input>
                </div>
              </td>
              <td class="text-right">
                {{
                  getPoint(
                    item.evaluation_level,
                    item.competency_standard_level,
                    getStandardPoint(
                      item.competency_critical_level,
                      competency.itemData
                    )
                  ) > 0 ?  getPoint(
                    item.evaluation_level,
                    item.competency_standard_level,
                    getStandardPoint(
                      item.competency_critical_level,
                      competency.itemData
                    )
                  ): ""
                }}
              </td>
              <td class="text-right" :class="{ disable: roleId === 2 }">
                {{
                  getPoint(
                    item.evaluation_level_manager,
                    item.competency_standard_level,
                    getStandardPoint(
                      item.competency_critical_level,
                      competency.itemData
                    )
                  ) > 0
                    ? getPoint(
                        item.evaluation_level_manager,
                        item.competency_standard_level,
                        getStandardPoint(
                          item.competency_critical_level,
                          competency.itemData
                        )
                      )
                    : ""
                }}
              </td>
              <td>
                <textarea
                  cols="20"
                  rows="2"
                  class="form-control"
                  v-model="item.self_note"
                  :disabled="roleId != 2 || status.id === 2 || status.id === 4"
                ></textarea>
              </td>
              <td>
                <textarea
                  cols="20"
                  rows="2"
                  class="form-control"
                  v-model="item.manager_note"
                  :disabled="roleId !== 3 || status.id === 3 || status.id === 4"
                ></textarea>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr class="competency-common">
              <td class="text-left">Kết quả đánh giá</td>
              <td></td>
              <td></td>
              <td class="text-right">100</td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-right">
                {{
                  roleId !== 2 ||
                  (roleId === 2 &&
                    (status.id === 3 || status.id === 4) &&
                    getResult(competencies) > 0)
                    ? getResult(competencies)
                    : ""
                }}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="chart-evaluation d-flex  mt-4" v-if="status.id === 4 && series && chartOptions">
           <div class="text-left manager-information w-100">
       <h5 class="font-weight-bold">Người đánh giá</h5>
       <div class="row mb-2">
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Họ và tên"
            disabled
            v-model="manager.full_name"
          />
        </div>
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Ngày sinh"
            disabled
            v-model="manager.birthday"
          />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Bộ phận"
            disabled
            v-if="manager.position && manager.position.position_group"
            v-model="manager.position.position_group.name"
          />
        </div>
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Vị trí"
            disabled
            v-if="manager.position"
            v-model="manager.position.name"
          />
        </div>
      </div>
     </div>
     <div class="d-flex text-center align-items-center flex-column">
        <h5 class="font-weight-bold text-left mt-2">Kết quả được đánh giá: {{this.getResult(this.competencies)}} điểm</h5>
      <apexchart
        width="500"
        type="pie"
        :options="chartOptions"
        :series="series"
      ></apexchart>
     </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getProfile } from "../../../shared/services/profile.service";
import {
  saveEvaluation,
  getDetailPeriod,
  getCompetencyDetail
} from "../../../shared/services/evaluation.service";
import { mapMutations, mapGetters } from "vuex";
import {
  getCompetencies,
  getDetailEvaluation,
} from "../../../shared/services/evaluation.service";
export default {
  name: "FormEvaluation",
  created() {},
  data() {
    return {
      series: [],
      chartOptions: {
        labels: [],
      },
      competencies: [],
      competencyDetail: {},
      userInformation: {},
      evaluationDetail: {},
      manager: {},
      roleId: null,
      period: {},
      isSend: false,
      status: {},
    };
  },
  props: {
    evaluationId: null,
    periodId: null,
  },
  filters: {
    date: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
  methods: {
    ...mapMutations([
      "GET_COMPETENCIES",
      "GET_PROFILE",
      "GET_DETAIL_EVALUATION",
      "GET_DETAIL_PERIOD",
      "SAVE_EVALUATION",
       "GET_COMPETENCY_DETAIL",
       "GET_CURRENT_STATUS"
    ]),
    date: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
    showInformation(id) {
      this.$modal.show("modal1");
      getCompetencyDetail(id).then(res => {
        this.GET_COMPETENCY_DETAIL(res);
        this.competencyDetail = this.getDetailCompetency;
      })
    },
    getStandardPoint(criticalLevel, data) {
      let sum = 0;
      (data || []).forEach((item) => {
        sum += item.competency_critical_level;
      });
      return Math.round((criticalLevel / sum) * 50);
    },
    getPoint(elvaluatedPoint, standardLevel, point) {
      const result =
        elvaluatedPoint > standardLevel
          ? point
          : Math.round((elvaluatedPoint / standardLevel) * point);
      return result;
    },
    getSumPoint(data, isManager) {
      let sum = 0;
      (data || []).forEach((item) => {
        sum += this.getPoint(
          !isManager ? item.evaluation_level : item.evaluation_level_manager,
          item.competency_standard_level,
          this.getStandardPoint(item.competency_critical_level, data)
        );
      });
      return sum;
    },
    getResult(data) {
      let result = 0;
      (data || []).forEach((item) => {
        result += this.getSumPoint(item.itemData, true);
      });
      return result;
    },
    validateTable() {
      let data = [];
      (this.competencies || []).forEach((item) => {
        data.push(item.itemData);
      });
      if (this.roleId === 2) {
        return (data.flat(1) || []).every((item) => item.evaluation_level);
      } else {
        return (data.flat(1) || []).every(
          (item) => item.evaluation_level_manager
        );
      }
    },
    save(isSend) {
      let data = [];
      (this.competencies || []).forEach((item) => {
        data.push(item.itemData);
      });
      data = data.flat(1).map((competency) => {
        const modelCompetency = {
          id: competency.id,
          competency_id: competency.competency_id,
          evaluation_level:
            competency.evaluation_level && +competency.evaluation_level,
          evaluation_level_manager:
            competency.evaluation_level_manager &&
            +competency.evaluation_level_manager,
          self_note: competency.self_note,
          manager_note: competency.manager_note,
        };
        return modelCompetency;
      });
      const model = new FormData();
      if (isSend) {
        model.append("isSend", true);
        if (this.roleId === 3) {
          model.append("isSubmit", true);
          model.append("result_point", this.getResult(this.competencies));
        }
      }
      model.append("id", this.evaluationId);
      model.append("user_id", this.getAuthenticationModel.id);
      model.append("evaluation_period_id", this.period.id);
      model.append("competencies", JSON.stringify(data));
      saveEvaluation(model, this.evaluationId).then((res) => {
        this.SAVE_EVALUATION(res);
        this.roleId === 2
          ? this.$router.push("/evaluation-manager")
          : this.$router.go(-1);
        const message = this.evaluationId
            ? !isSend
              ? "Update Evaluation Successful."
              : "Submit Evaluation Successful."
            : "Create Evaluation Successful.";
        this.$toast(message, {
          type: "success",timeout: 1500
        });
      });
    },
  },
  computed: {
    ...mapGetters([
      "getCompetencies",
      "getProfile",
      "getAuthenticationModel",
      "getEvaluationDetail",
      "getEvaluationPeriod",
      "getAuthentication",
      "getDetailCompetency"
    ]),
  },
  mounted() {
    this.roleId = this.getAuthenticationModel.role.id;
    if (!this.evaluationId && this.periodId) {
      getDetailPeriod(this.periodId).then((res) => {
        this.GET_DETAIL_PERIOD(res);
        this.period = res;
      });
      getProfile(this.getAuthenticationModel.id).then((res) => {
        this.GET_PROFILE(res);
        this.userInformation = this.getProfile;
        getCompetencies(
          this.userInformation &&
            this.userInformation.position &&
            this.userInformation.position.id
        ).then((res) => {
          this.GET_COMPETENCIES(res);
          this.competencies = this.getCompetencies;
        });
      });

      return;
    }
    getDetailEvaluation(this.evaluationId).then((res) => {
      this.GET_DETAIL_EVALUATION(res);
      if (this.getEvaluationDetail.associate) {
        this.userInformation.fullName = this.getEvaluationDetail.associate.full_name;
        this.manager = this.getEvaluationDetail.associate.manager;
        this.manager.birthday = this.date(
          this.getEvaluationDetail.associate.manager && this.getEvaluationDetail.associate.manager.birthday 
        );
        this.userInformation.birthday = this.date(
          this.getEvaluationDetail.associate.birthday
        );
        this.userInformation.position = this.getEvaluationDetail.associate.position;
        this.userInformation.positionGroup =
          this.getEvaluationDetail.associate.position &&
          this.getEvaluationDetail.associate.position.position_group;
      }
      this.competencies = this.getEvaluationDetail.competencies;
      this.period = this.getEvaluationDetail.evaluation_period;
      this.status = this.getEvaluationDetail.status;
       this.GET_CURRENT_STATUS(this.getEvaluationDetail.status);
       if(this.status && this.status.id === 4) {
      (this.competencies || []).forEach((item) => {
        this.chartOptions.labels.push(item.competencyGroup.name);
        this.series.push(this.getSumPoint(item.itemData, true))
      });
    }
    });
   
  },
};
</script>

<style lang="scss">
.evauation-status {
  width: 120px;
  padding: 3px 4px;
  border-bottom-left-radius: 13px;
  position: absolute;
  right: 28px;
  top: 123px;
  &--new {
    background-color: #f29d18;
    color: #fff;
  }
  &--evaluated {
    background-color: #d7f7d6;
    color: #000;
  }
  &--waiting {
    background-color: #73a1ea;
    color: #fff;
  }
  &--approved {
    background-color: #388b59;
    color: #fff;
  }
}
.evaluation-title {
  color: rgb(12, 105, 3);
}
.table {
  th,
  td {
    vertical-align: middle;
  }
  .competency-common {
    background-color: #ececec;
    font-weight: bold;
  }
  .competency-input {
    max-width: 100px;
  }
  .disable {
    background-color: rgb(211, 211, 211);
  }
  .sub-font {
    font-size: 12px;
  }

}
  .manager-information {
    padding-right: 9rem;
  }
  .modal-info {
  .vm--modal {
    height: 500px !important;
    width: 950px !important;
    overflow-y: scroll;
}
  }

</style>
