<template>
  <div>
    <div class="header-container d-flex">
      <div class="title d-flex align-items-center">
        <router-link :to="'/member-manager'"
          ><i class="fa fa-arrow-left mr-2 arrow" aria-hidden="true"></i
        ></router-link>
        Member Infomation
      </div>
    </div>
    <div class="content-area p-3" v-if="profileData">
      <div class="information-member">
        <h4 class="text-left font-weight-bold">Member Information</h4>
        <div class="row mb-2">
          <div class="col-md-6">
            <p class="mb-0 text-left">Full Name</p>
            <input
              type="text"
              class="form-control"
              disabled
              v-model="profileData.fullName"
            />
          </div>
          <div class="col-md-6">
            <p class="mb-0 text-left">Email</p>
            <input
              type="text"
              class="form-control"
              disabled
              v-model="profileData.email"
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <p class="mb-0 text-left">Department</p>
            <input
              type="text"
              class="form-control"
              disabled
              v-if="profileData.positionGroup"
              v-model="profileData.positionGroup.name"
            />
          </div>
          <div class="col-md-6">
            <p class="mb-0 text-left">Position</p>
            <input
              type="text"
              class="form-control"
              disabled
              v-if="profileData.position"
              v-model="profileData.position.name"
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <p class="mb-0 text-left">Birthday</p>
            <input
              type="text"
              class="form-control"
              disabled
              v-model="profileData.birthday"
            />
          </div>
        </div>
      </div>
      <hr class="border-dash my-4" />
      <div class="member-evaluation">
        <h4 class="text-left font-weight-bold">Evaluation History</h4>
        <div class="table-area mt-2" v-if="evaluationList">>
                      
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
                    <div
                      class="eva-status eva-status--new"
                      :class="{
                        'eva-status--evaluated': item.status.id === 2,
                        'eva-status--waiting': item.status.id === 3,
                        'eva-status--approved': item.status.id === 4,
                      }"
                    >
                      {{ item.status && item.status.name }}
                    </div>
                  </div>
                </td>
                <td :class="{ result: item.status && item.status.id != 4 }">
                  {{ item.result_point }}
                </td>
                <td>
                  <div class="d-flex justify-content-center align-items-center">
                    <i
                      @click="editEvaluation(item)"
                      class="fa fa-eye table-icon--view cursor-pointer"
                      aria-hidden="true"
                      v-if="item.status.id !== 2"
                    ></i>
                    <i
                      class="fa fa-pencil-square-o table-icon--review cursor-pointer"
                      aria-hidden="true"
                      v-if="item.status.id === 2"
                      @click="editEvaluation(item)"
                    ></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        <apexchart width="800px" :options="options" :series="series"></apexchart>
        
          
        
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import moment from "moment";
import { getProfile } from "../../../shared/services/profile.service";
import { getMemberEvaluation } from "../../../shared/services/evaluation.service";
export default {
  name: "ViewMember",
  created() {},
  data() {
    return {
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true
        },
        title: {
          text: "Evaluation Chart",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        colors: ['#00E396'],
        xaxis: {
          categories: [],
          title: {
            text: 'Evaluation Period'
          }
        },
        yaxis: {
          title: {
            text: 'Result Point'
          },
          min: 5,
          max: 100
        },
             
      },
       series: [{name:'Result point',data: []}],
      profileData: {},
      evaluationList: [],
    };
  },
  props: {},
  methods: {
    ...mapMutations([
      "GET_PROFILE",
      "GET_LIST_MEMBER_EVALUATION",
      "GET_CURRENT_STATUS",
    ]),
    editEvaluation(data) {
      this.GET_CURRENT_STATUS(data.status);
      this.$router.push({
        path: `/evaluation-manager/edit/${data.id}`,
      });
    },
  },
  computed: {
    ...mapGetters(["getProfile", "getEvaluationMemberList"]),
  },
  filters: {
    date: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
  mounted() {
    getProfile(this.$route.params.id).then((res) => {
      this.GET_PROFILE(res);
      this.profileData = this.getProfile;
      getMemberEvaluation(this.getProfile && this.getProfile.id).then(
        (res1) => {
          this.GET_LIST_MEMBER_EVALUATION(res1);
          this.evaluationList = this.getEvaluationMemberList;
          (this.evaluationList || []).forEach(item => {
            this.series[0].data.push(item.result_point);
            (this.options.xaxis.categories || []).push(item.evaluation_period.name)
          })
          console.log(this.options.xaxis.categories);
        }
      );
    });
  },
};
</script>

<style lang="scss" scoped>
.table-area {
  .table {
    min-width: 800px;
  }
}
</style>
