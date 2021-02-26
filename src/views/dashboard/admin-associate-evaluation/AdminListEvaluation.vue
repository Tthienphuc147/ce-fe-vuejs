
<template>
  <div>
   <div class="header-container d-flex">
      <div class="title d-flex align-items-center"> Evaluation Manager</div>
    </div>
    <div class="content-area p-3">
      <div class="member-evaluation">
                    <div class="table-area mt-2" v-if="evaluationList">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Associate name</th>
              <th>Associate Position</th>
              <th>Period Name</th>
              <th>Start Day</th>
              <th>End Day</th>
              <th>Status Evaluation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in evaluationList" :key="index">
              <td>{{index + 1}}</td> 
                 <td>
                {{ item.associate && item.associate.full_name }}
              </td>
               <td>
                {{ item.associate && item.associate.position && item.associate.position.name}}
              </td>
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
                      'eva-status--evaluated': item.status_id === 2,
                      'eva-status--waiting': item.status_id === 3,
                      'eva-status--approved': item.status_id === 4,
                    }"
                  >
                    {{ item.status && item.status.name }}
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <i
                    @click="viewEvaluation(item)"
                    class="fa fa-eye table-icon--view cursor-pointer"
                    aria-hidden="true"
                    v-if="item.status_id === 4"
                  ></i>
                  <i class="fa fa-pencil-square-o table-icon--review cursor-pointer" aria-hidden="true"  v-if="item.status_id === 3"  @click="viewEvaluation(item)"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
          </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import moment from "moment";
import {
  getAllEvaluation
} from "../../../shared/services/evaluation.service";
export default {
  name: 'AdminListEvaluation',
  created() {

  },
  data() {
    return {
      evaluationList: [],
       ...mapMutations(["GET_CURRENT_STATUS","GET_ALL_EVALUATION"]),
    viewEvaluation(data) {
      this.GET_CURRENT_STATUS(data.status);
      this.$router.push({
        path: `/evaluation-associate-manager/view/${data.id}`,
      });
    },
    }
  },
  props: {
   
  },
  computed: {
    ...mapGetters(["getAllEvaluation"]),
  },
  methods: {
   
  },
  filters: {
    date: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
  mounted() {
    getAllEvaluation().then((res1) => {
      this.GET_ALL_EVALUATION(res1);
      this.evaluationList = this.getAllEvaluation;
    });
  }
}
</script>

<style lang="scss" scoped>

</style>

