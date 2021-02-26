
<template>
    <div>
    <div class="header-container d-flex">
      <div class="title">Associates List</div>
       <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary" @click="$router.push('/associate-manager/create')">
          Create Associate
        </button>
      </div>
    </div>
    <div class="content-area p-3">
      <!-- <div class="search-area d-flex justify-content-end">
        <CInput
          class="text-left search-input"
          placeholder="Search full name..."
        />
      </div> -->
      <div class="filter-area d-flex w-100 mt-2">
        <div class="filter-block d-flex mr-3">
          <label class="mr-2">Position</label>
          <select v-model="filterModel.postion" class="form-control">
            <option :value="null">-- Choose postion --</option>
            <option
              v-for="option in positionData"
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
      <div class="table-area mt-2" v-if="associateListFilter">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Role</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in associateListFilter" :key="index">
              <td>{{ index + 1}}</td>
              <td>
                {{ item.full_name }}
              </td>
              <td>
                {{ item.email }}
              </td>
               <td>
                {{ item.birthday | date }}
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <div
                    class="assoicate-role"
                    :class="{
                      'assoicate-role--member': item.role.id === 2,
                      'assoicate-role--manager': item.role.id === 3,
                    }"
                  >
                    {{ item.role && item.role.name }}
                  </div>
                </div>
              </td>
              <td>
                {{ item.position && item.position.name }}
              </td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <router-link :to="`/associate-manager/edit/${item.id}`">
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
import { mapMutations, mapGetters } from "vuex";
import moment from "moment";
import { getAllAssociate } from "../../../shared/services/associates.service";
import { getAllPosition } from "../../../shared/services/position.service";
export default {
  name: 'AdminListAssociate',
  created() {

  },
  data() {
    return {
       associateList: [],
      associateListFilter: [],
      positionData: [],
      filterModel: {
        position: null,
      },
    }
  },
  props: {
   
  },
   methods: {
    ...mapMutations(["GET_LIST_ASSOCIATES", "GET_ALL_POSITION"]),
    filter() {
      this.associateListFilter = (this.associateList || []).filter(
        (item) => item.position_id === this.filterModel.postion.id
      );
    },
    clearFilter() {
      this.filterModel.postion = null;
      this.associateListFilter = this.associateList;
    },
  },
  filters: {
    date: (value) => {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
  computed: {
    ...mapGetters(["getAssociateList", "getAllPosition"]),
  },
  mounted() {
    getAllAssociate().then((res) => {
      this.GET_LIST_ASSOCIATES(res);
      this.associateListFilter = this.getAssociateList;
      this.associateList = this.getAssociateList;
    });
    getAllPosition().then((res) => {
      this.GET_ALL_POSITION(res);
      this.positionData = this.getAllPosition;
    });
  },
}
</script>

<style lang="scss" scoped>

</style>

