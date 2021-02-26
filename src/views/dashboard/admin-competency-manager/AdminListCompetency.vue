
<template>
  <div>
    <div class="header-container d-flex">
      <div class="title">Competency List</div>
       <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary" @click="$router.push('/competency-manager/create')">
          Create competency
        </button>
      </div>
    </div>
    <div class="content-area p-3">
      <div class="table-area mt-2" v-if="getDataCompetencyAdmin">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in getDataCompetencyAdmin" :key="index">
            <tr class="competency-common">
              <td colspan="3" class="text-left font-weight-bold">
                {{item.competencyGroup && item.competencyGroup.name }}
              </td>
            </tr>
            <tr v-for="(competency, index) in item.itemData" :key="index">
              <td class="text-left">
                {{ competency.name }}
              </td>
              <td class="text-left">
                {{ competency.description }}
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <router-link :to="`/competency-manager/edit/${competency.id}`">
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
export default {
  name: 'AdminListCompetency',
  created() {

  },
  data() {
    return {
      
    }
  },
  props: {
   
  },
   methods: {
     ...mapActions(["getAllCompetencyAdmin"]),
  },
  computed: {
    ...mapGetters(["getDataCompetencyAdmin"]),
  },
  mounted() {
    this.getAllCompetencyAdmin();
  
  },
}
</script>

<style lang="scss" scoped>
.table-col {
  &--no {
    width: 3rem;
  }
}
.competency-common {
  background-color: #ececec;
  font-weight: bold;
}
</style>

