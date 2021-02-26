
<template>
  <div>
    <div class="header-container d-flex">
      <div class="title">Profile Manager</div>
      <!-- <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary">Change Password</button>
      </div> -->
    </div>
    <div class="content-area p-3" v-if="profileData">
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
          <input type="text" class="form-control" disabled   v-if="profileData.positionGroup"
            v-model="profileData.positionGroup.name"/>
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
          <input type="text" class="form-control" disabled  v-model="profileData.birthday"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { getProfile } from "../../../shared/services/profile.service";
import store from "../../../store";
export default {
  name: "ProfileManager",
  created() {},
  data() {
    return {
      id:
        store.getters.getAuthenticationModel &&
        store.getters.getAuthenticationModel.id,
      profileData: {},
    };
  },
  props: {},
  methods: {
    ...mapMutations(["GET_PROFILE"]),
  },
  computed: {
    ...mapGetters([
      "getProfile",
    ]),
  },
  mounted() {
    getProfile(this.id).then((res) => {
      this.GET_PROFILE(res);
      this.profileData = this.getProfile;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>

