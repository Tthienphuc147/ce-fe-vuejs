<template>
  <div>
    <modal name="modal" v-if="modalForm.availablePeriodData" class="modal-choose">
      <div>
        <div class="container container-modal">
          <div class="title text-uppercase font-weight-bold mb-3">
            choose period to make evaluation
          </div>
          <div class="content" v-if="modalForm.availablePeriodModel">
            <div class="filter-block d-flex mb-2">
              <label class="mr-2">Period</label>
              <select
                v-model="modalForm.availablePeriodModel"
                class="form-control"
              >
                <option :value="null">-- Choose Period --</option>
                <option
                  v-for="option in modalForm.availablePeriodData"
                  :value="option"
                  :key="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
            <hr />
            <div class="row mb-2">
              <div class="col-md-12">
                <CInput
                  class="text-left"
                  label="Period Name"
                  disabled

                  v-model="modalForm.availablePeriodModel.name"
                />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <CInput
                  class="text-left"
                  label="Start day"
                  disabled
       
                  v-model="modalForm.availablePeriodModel.start_time"
                />
              </div>
              <div class="col-md-6">
                <CInput
                  class="text-left"
                  label="End day"
                  disabled
          
                  v-model="modalForm.availablePeriodModel.end_time"
                />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <CTextarea
                  class="text-left"
                  label="Description"
    
                  disabled
                  v-model="modalForm.availablePeriodModel.description"
                />
              </div>
            </div>
          </div>
          <div class="button-area d-flex justify-content-center">
            <button
              class="btn text-uppercase btn-modal btn-modal--ok btn-sm mr-3"
              @click="confirmModal()"
            >
              Ok
            </button>
            <button
              class="btn text-uppercase btn-modal btn-modal--cancel btn-sm"
              @click="hideModal()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </modal>
    <div class="header-container d-flex">
      <div class="title">List Evaluation</div>
      <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary" @click="makeEvaluation()">
          Make Evaluation
        </button>
      </div>
    </div>
    <div class="content-area p-3">
      <!-- <div class="search-area d-flex justify-content-end">
        <CInput
          class="text-left search-input"
          placeholder="Search period evaluation name..."
          v-model="searchQuery"
        />
      </div> -->
      <div class="filter-area d-flex w-100 my-2 pb-2">
        <div class="filter-block d-flex mr-3">
          <label>Evaluation status</label>
          <select v-model="filterModel.status" class="form-control">
            <option :value="null">-- Choose Status --</option>
            <option
              v-for="option in statusData"
              :value="option"
              :key="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="filter-button-area ml-auto">
          <button
            class="btn btn-ce btn-ce--filter mr-2"
            @click.prevent="filter()"
          >
            Filter
          </button>
          <button
            class="btn btn-ce btn-ce--clear"
            @click.prevent="clearFilter()"
          >
            Clear
          </button>
        </div>
      </div>
      <div class="table-area mt-2" v-if="evaluationListFilter">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Period Name</th>
              <th>Start Day</th>
              <th>End Day</th>
              <th>Status Evaluation</th>
              <th>Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in evaluationListFilter" :key="index">
              <td>{{index + 1}}</td>
              <td>
                {{ item.evaluation_period && item.evaluation_period.name }}
              </td>
              <td>
                {{
                  item.evaluation_period &&
                  item.evaluation_period.start_time | date
                }}
              </td>
              <td>
                {{
                  item.evaluation_period &&
                  item.evaluation_period.end_time | date
                }}
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <div
                    class="eva-status"
                    :class="{
                      'eva-status--evaluated': item.status.id === 2,
                      'eva-status--waiting': item.status.id === 3,
                      'eva-status--approved': item.status.id === 4,
                      'eva-status--new': item.status.id === 1,
                    }"
                  >
                    {{ item.status && item.status.name }}
                  </div>
                </div>
              </td>
              <td
                :class="{
                  result: item.status && item.status.id != 4,
                  appproved: item.status.id === 4,
                }"
              >
                {{ item.result_point }}
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <i
                    @click="editEvaluation(item)"
                    class="fa fa-eye table-icon--view cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import moment from "moment";
import {
  getSelfEvaluation,
  getAllPeriodAvailable,
  getAllStatus,
} from "../../../shared/services/evaluation.service";
export default {
  name: "ListEvaluation",
  created() {},
  data() {
    return {
      searchQuery: null,
      evaluationList: [],
      evaluationListFilter: [],
      statusData: [],
      filterModel: {
        status: null,
      },
      modalForm: {
        availablePeriodData: [],
        availablePeriodModel: {},
      },
    };
  },
  props: {},
  methods: {
    ...mapMutations([
      "GET_LIST_EVALUATION",
      "GET_AVAILABLE_PERIOD",
      "GET_CURRENT_STATUS",
      "GET_ALL_STATUS",
    ]),
    filter() {
      this.evaluationListFilter = (this.evaluationList || []).filter(
        (item) => item.status_id === this.filterModel.status.id
      );
    },
    clearFilter() {
      this.filterModel.status = null;
      this.evaluationListFilter = this.getEvaluationList;
    },
    makeEvaluation() {
      this.$modal.show("modal");
    },
    hideModal() {
      this.$modal.hide("modal");
      this.modalForm.availablePeriodModel = null;
    },
    confirmModal() {
      if (!this.modalForm.availablePeriodModel) {
        return;
      }
      this.$router.push({
        path: "/evaluation-manager/create",
        query: {
          periodId:
            this.modalForm.availablePeriodModel &&
            this.modalForm.availablePeriodModel.id,
        },
      });
      this.modalForm.availablePeriodModel = null;
      this.$modal.hide("modal");
    },
    editEvaluation(data) {
      this.GET_CURRENT_STATUS(data.status);
      this.$router.push({
        path: `/evaluation-manager/edit/${data.id}`,
      });
    },
  },
  computed: {
    ...mapGetters([
      "getEvaluationList",
      "getAvailablePeriodSelect",
      "getAvailablePeriod",
      "getEvaluationStatus",
    ]),
  },
  watch: {
    searchQuery: {
      handler(newValue) {
        console.log('a');
        console.log(newValue);
        this.evaluationListFilter = this.evaluationList.filter((item) => {
          item.evaluation_period &&
            item.evaluation_period.name
              .toLowerCase()
              .search(newValue.trim().toLowerCase()) === -1
        });
      },
      deep: true,
    },
  },
  filters: {
    date: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
  mounted() {
    getAllPeriodAvailable().then((res) => {
      this.GET_AVAILABLE_PERIOD(res);
      this.modalForm.availablePeriodData = this.getAvailablePeriodSelect;
    });
    getSelfEvaluation().then((res) => {
      this.GET_LIST_EVALUATION(res);
      this.evaluationListFilter = this.getEvaluationList;
      this.evaluationList = this.getEvaluationList;
    });
    getAllStatus().then((res) => {
      this.GET_ALL_STATUS(res);
      this.statusData = this.getEvaluationStatus;
    });
  },
};
</script>

<style lang="scss" >
.search-input {
  width: 25rem;
}
.result {
  background-color: rgb(211, 211, 211);
}
.appproved {
  background-color: rgb(18, 99, 18);
  color: #fff;
}
  .modal-choose {
  .vm--modal {
    height: 450px !important;
}
  }
</style>
