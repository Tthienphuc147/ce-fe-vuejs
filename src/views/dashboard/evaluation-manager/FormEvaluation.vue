<template>
  <div>
    <div class="evauation-status evauation-status--new">
      New
    </div>
    <div class="evaluation-title">
      <h3 class="text-uppercase font-weight-bold">
        bảng đánh giá năng lực nhân viên
      </h3>
      <h4 class="font-weight-bold" v-if="period">
        Kỳ đánh giá: {{period.name}}
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
      <!-- <div class="row mb-2">
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Bộ phận"
            disabled
            v-model="userInformation.positionGroup.name"
          />
        </div>
        <div class="col-md-6">
          <CInput
            class="text-left"
            label="Vị trí"
            disabled
            v-model="userInformation.position.name"
          />
        </div>
      </div> -->
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="(item, j) in competency.itemData" :key="j">
              <td class="text-left">{{ item.name }}</td>
              <td class="text-right">{{ item.competency_critical_level }}</td>
              <td class="text-right">{{ item.competency_standard_level }}</td>
              <td class="text-right"></td>
              <td>
                <div class="d-flex justify-content-center">
                  <input
                    type="text"
                    class="form-control competency-input"
                    v-model="item.evaluation_level"
                     :disabled="roleId !==2"
                  />
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-center">
                  <input
                    type="text"
                    class="form-control competency-input"
                    v-model="item.evaluation_level_manager"
                    :disabled="roleId != 3 "
                  />
                </div>
              </td>
              <td class="text-right"></td>
              <td class="text-right" :class="{disable: roleId != 2}"></td>
              <td>
                <textarea
                  cols="20"
                  rows="2"
                  class="form-control"
                  v-model="item.self_note"
                    :disabled="roleId != 2"
                ></textarea>
              </td>
              <td>
                <textarea
                  cols="20"
                  rows="2"
                  class="form-control"
                  v-model="item.manager_note"
                    :disabled="roleId != 3 "
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
              <td>88.333</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { getProfile } from "../../../shared/services/profile.service";
import { saveEvaluation } from "../../../shared/services/evaluation.service";
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
      competencies: [],
      userInformation: {},
      evaluationDetail: {},
      roleId: null,
      period: {}
    };
  },
  props: {
    evaluationId: null,
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
      "SAVE_EVALUATION",
    ]),
    ...mapGetters(["getAuthentication"]),
    save() {
      let data = [];
      (this.competencies || []).forEach((item) => {
        data.push(item.itemData);
      });
      data = data.flat(1).map((competency) => {
        const modelCompetency = {
          id: competency.id,
          competency_id: competency.competency_id,
          evaluation_level: competency.evaluation_level && +competency.evaluation_level,
          evaluation_level_manager: competency.evaluation_level_manager && +competency.evaluation_level_manager,
          self_note: competency.self_note,
          manager_note: competency.manager_note,
        };
        return modelCompetency;
      });
      const model = new FormData();
      model.append('id', this.evaluationId);
      model.append('user_id', this.getAuthenticationModel.id);
      model.append('evaluation_period_id', 1);
      model.append('competencies', JSON.stringify(data));
      saveEvaluation(model, this.evaluationId).then((res) => {
        this.SAVE_EVALUATION(res);
          this.$router.push("/evaluation-manager");
          Vue.notify({
            group: "notification",
            title: "Notification",
            type: "success",
            text: this.evaluation ? 'Update Evaluation Successful.'  :'Create Evaluation Successful.' ,
          });
      })
    },
  },
  computed: {
    ...mapGetters([
      "getCompetencies",
      "getProfile",
      "getAuthenticationModel",
      "getEvaluationDetail",
    ]),
  },
  mounted() {
    this.roleId = this.getAuthenticationModel.role.id;
    console.log(this.roleId);
    if (!this.evaluationId) {
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
       this.userInformation.fullName = this.getEvaluationDetail.associate.full_name
        this.userInformation.birthday = this.getEvaluationDetail.associate.birthday
      this.competencies = this.getEvaluationDetail.competencies;
      this.period = this.getEvaluationDetail.evaluation_period;
      console.log(this.competencies);
    });
  },
};
</script>

<style lang="scss" scoped>
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
    background-color: rgb(178, 230, 250);
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
</style>
