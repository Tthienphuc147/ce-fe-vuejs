<template>
  <div>
    <modal name="modal">
      <div>
        <div class="container container-modal">
          <div class="title text-uppercase font-weight-bold mb-3">
            choose period to make evaluation
          </div>
          <div class="content">
            <div class="filter-block d-flex mb-2">
              <label class="mr-2">Period</label>
              <CSelect :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" />
            </div>
            <hr />
            <div class="row mb-2">
              <div class="col-md-12">
                <CInput class="text-left" label="Period Name" disabled />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <CInput class="text-left" label="Start day" disabled />
              </div>
              <div class="col-md-6">
                <CInput class="text-left" label="End day" disabled />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <CTextarea class="text-left" label="Description" disabled />
              </div>
            </div>
          </div>
          <div class="button-area d-flex justify-content-center">
            <button
              class="btn text-uppercase btn-modal btn-modal--ok btn-sm mr-3"
            >
              Ok
            </button>
            <button
              class="btn text-uppercase btn-modal btn-modal--cancel btn-sm"
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
      <div class="search-area d-flex justify-content-end">
        <CInput
          class="text-left search-input"
          placeholder="Search period evaluation name..."
        />
      </div>
      <div class="filter-area d-flex w-100 mt-2">
        <div class="filter-block d-flex mr-3">
          <label class="mr-2">Evaluation status</label>
          <CSelect :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" />
        </div>
        <div class="filter-block d-flex mr-3">
          <label class="mr-2">Evaluation period</label>
          <CSelect :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" />
        </div>
        <div class="filter-button-area ml-auto">
          <button class="btn btn-ce btn-ce--filter mr-2">Filter</button>
          <button class="btn btn-ce btn-ce--clear">Clear</button>
        </div>
      </div>
      <div class="table-area mt-2" v-if="evaluationList">
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
            <tr v-for="(item, index) in evaluationList" :key="index">
              <td>{{ index + 1 }}</td>
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
                  <div class="eva-status eva-status--new">
                    {{ item.status && item.status.name }}
                  </div>
                </div>
              </td>
              <td :class="{ result: item.status && item.status.id != 4 }">
                {{ item.result_point }}
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <router-link :to="{ path: '/evaluation-manager/edit/'+ item.id}"><i class="fa fa-eye table-icon--view" aria-hidden="true"></i></router-link>
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
import { getSelfEvaluation } from "../../../shared/services/evaluation.service";
export default {
  name: "ListEvaluation",
  created() {},
  data() {
    return {
      evaluationList: [],
    };
  },
  props: {},
  methods: {
    ...mapMutations(["GET_LIST_EVALUATION"]),
    makeEvaluation() {
      this.$modal.show("modal");
    },
  },
  computed: {
    ...mapGetters(["getEvaluationList"]),
  },
  filters: {
    date: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
  mounted() {
    getSelfEvaluation().then((res) => {
      this.GET_LIST_EVALUATION(res);
      this.evaluationList = this.getEvaluationList;
    });
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  width: 25rem;
}
.result {
  background-color: rgb(211, 211, 211);
}
</style>
