<template>
  <div class="content-area p-3">
    <form @submit.prevent="save">
      <div class="row mb-2">
        <div class="col-md-6">
          <p class="mb-0 text-left required">Full Name</p>
          <form-group
            :validator="$v.profileForm.fullName"
            class="form-label-group"
          >
            <input
              type="text"
              v-model="profileForm.fullName"
              id="fullName"
              name="fullName"
              class="form-control my-2"
              :class="{
                'is-invalid': submitted && $v.profileForm.fullName.$error,
              }"
            />
          </form-group>
        </div>
        <div class="col-md-6">
          <p class="mb-0 text-left required">Email</p>
          <form-group
            :validator="$v.profileForm.email"
            class="form-label-group"
          >
            <input
              type="text"
              v-model="profileForm.email"
              id="email"
              name="email"
              class="form-control my-2"
              disabled="!this.id"
              :class="{
                'is-invalid': submitted && $v.profileForm.email.$error,
              }"
            />
          </form-group>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <p class="mb-0 text-left required">Position</p>
          <form-group
            :validator="$v.profileForm.position"
            class="form-label-group"
          >
            <select
              v-model="profileForm.position"
              class="form-control"
              :class="{
                'is-invalid': submitted && $v.profileForm.position.$error,
              }"
            >
              <option :value="{}">-- Choose postion --</option>
              <option
                v-for="option in positionData"
                :value="option.value"
                :key="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </form-group>
        </div>
        <div class="col-md-6">
          <p class="mb-0 text-left required">Role</p>
          <form-group :validator="$v.profileForm.role" class="form-label-group">
            <select
              v-model="profileForm.role"
              class="form-control"
              :disabled ="this.id"
              :class="{
                'is-invalid': submitted && $v.profileForm.role.$error,
              }"
               @change="onChangeRole($event)"
            >
              <option :value="null">-- Choose Role --</option>
              <option
                v-for="option in roleData"
                :value="option.id"
                :key="option.value"
              >
                {{ option.name }}
              </option>
            </select>
          </form-group>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <p class="mb-0 text-left ">Birthday</p>
          <b-form-datepicker
              class="mt-2"
              v-model="profileForm.birthday"
            ></b-form-datepicker>
        </div>
        <div class="col-md-6" v-if="isShowManagerSelect">
           <p class="mb-0 text-left required">Manager</p>
          <form-group :validator="$v.profileForm.manager" class="form-label-group">
            <select
              v-model="profileForm.manager"
              class="form-control"
              :class="{
                'is-invalid': submitted && $v.profileForm.manager.$error,
              }"
            >
              <option :value="null">-- Choose Manager --</option>
              <option
                v-for="option in managerData"
                :value="option.id"
                :key="option.id"
              >
                {{ option.full_name }}
              </option>
            </select>
          </form-group>
        </div>
        
      </div>
      <div class="row mb-2">
        <div class="col-md-6" v-if="!this.id">
          <p class="mb-0 text-left required">Password Generate</p>
          <div class="d-flex justify-content-between">
            <div>
              <div
                class="password"
                :class="{
                  'is-invalid': submitted && !profileForm.password,
                }"
              >
                {{ profileForm.password }}
              </div>
              <span
                v-if="submitted && !profileForm.password"
                class="note italic"
                >You must generate password</span
              >
            </div>
            <button class="btn btn-generate btn-sm" type="button" @click.prevent="generatePassword()">
              Generate
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { getAllPosition } from "../../../shared/services/position.service";
import { getProfile } from "../../../shared/services/profile.service";
import { getAllAssociate } from "../../../shared/services/associates.service";
import { required, email } from "vuelidate/lib/validators";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "AdminFormAssociate",
  created() {},
  data() {
    return {
      positionData: [],
      roleData: [],
      managerData: [],
      profileForm: {
        email: "",
        password: "",
        fullName: "",
        position: {},
        manager: null,
        role: null,
        birthday: null,
      },
      submitted: false,
      isShowManagerSelect: false
    };
  },
  validations: {
    profileForm: {
      email: { required, email },
      fullName: { required },
      position: { required },
      role: { required },
      // password: { required }
    },
  },
  props: {
    id: null,
  },
  methods: {
    ...mapActions(["saveAssociate"]),
    ...mapMutations(["GET_ALL_POSITION","GET_PROFILE","GET_LIST_ASSOCIATES"]),
    onChangeRole(event) {
      if(+event.target.value === 2) {
        this.isShowManagerSelect = true;
      }
      this.isShowManagerSelect = false;
    },
    generatePassword() {
      const charLowercase = "abcdefghijklmnopqrstuvwxyz";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result =
        charLowercase
          .charAt(Math.floor(Math.random() * charLowercase.length))
          .toUpperCase() +
        charLowercase.charAt(Math.floor(Math.random() * charLowercase.length)) +
        Math.floor(Math.random() * 10);
      const charactersLength = characters.length;
      while (result.length < 8) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      this.profileForm.password = result;
    },
    save() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const requestModel = new FormData();
        if(this.id) {
          requestModel.append("id", this.id);
        }
        if(this.profileForm.role === 3) {
          requestModel.append("manager_id",this.profileForm.manager)
        }
        requestModel.append("fullName", this.profileForm.fullName);
        requestModel.append("email", this.profileForm.email);
        requestModel.append("position_id", this.profileForm.position);
        requestModel.append("role_id", this.profileForm.role);
        requestModel.append("birthday", this.profileForm.birthday);
          requestModel.append("password", this.profileForm.password);
        this.saveAssociate(requestModel);
        return;
      }
    },
  },
  computed: {
    ...mapGetters(["getAllPosition", "getAllRole","getProfile", "getAssociateList"]),
  },
  mounted() {
   this.roleData = this.getAllRole;
   if(this.id) {
      getProfile(this.id).then((res) => {
      this.GET_PROFILE(res);
      this.profileForm= this.getProfile;
      this.profileForm.position = this.getProfile.position.id
      this.profileForm.role = this.getProfile.role.id
    });
   }
    getAllPosition().then((res) => {
      this.GET_ALL_POSITION(res);
      this.positionData = this.getAllPosition;
    });
      getAllAssociate().then((res) => {
      this.GET_LIST_ASSOCIATES(res);
      this.managerData = (this.getAssociateList || []).filter(item => item.role_id === 3);
    });
   
  
  },
};
</script>

<style lang="scss" scoped>
.password {
  width: 11rem;
  padding: 4px 4px;
  background-color: #f0e2c8;
  color: #000;
  display: block;
  height: 2.2rem;
  font-weight: bold;
}
.btn-generate {
  background-color: rgb(230, 88, 6);
  color: #fff;
}
</style>
