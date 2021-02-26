
<template>
    <div>
    <div class="header-container d-flex">
      <div class="title">Period List</div>
       <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary" @click="$router.push('/period-manager/create')">
          Create Period
        </button>
      </div>
    </div>
    <div class="content-area p-3">
      <div class="table-area mt-2" v-if="getAllPeriodAdmin">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in getAllPeriodAdmin" :key="index">
              <td>{{ index + 1}}</td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.start_time | date }}
              </td>
               <td>
                {{ item.end_time | date }}
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <router-link :to="`/period-manager/edit/${item.id}`">
                    <i
                      class="fa fa-eye table-icon--view cursor-pointer"
                      aria-hidden="true"
                    ></i>
                  </router-link>
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: 'AdminListPeriod',
  created() {

  },
  data() {
    return {
       periodList: [],
    }
  },
  props: {
   
  },
   methods: {
     ...mapActions(["getAllPeriod"]),
  },
  filters: {
    date: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
  computed: {
    ...mapGetters(["getAllPeriodAdmin"]),
  },
  mounted() {
    this.getAllPeriod();
  
  },
}
</script>

<style lang="scss" scoped>

</style>

