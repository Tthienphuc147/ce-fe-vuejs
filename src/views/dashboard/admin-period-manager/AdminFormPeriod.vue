<template>
  <div class="content-area p-3">
    <form @submit.prevent="save">
      <div class="row mb-2">
        <div class="col-md-6">
          <p class="mb-0 text-left required">Name</p>
          <form-group :validator="$v.periodForm.name" class="form-label-group">
            <input
              type="text"
              v-model="periodForm.name"
              id="name"
              name="name"
              class="form-control my-2"
              :class="{
                'is-invalid': submitted && $v.periodForm.name.$error,
              }"
            />
          </form-group>
        </div>
        <div class="col-md-6">
          <p class="mb-0 text-left ">Description</p>
          <form-group class="form-label-group">
            <textarea
              cols="30"
              rows="5"
              v-model="periodForm.description"
              id="description"
              name="description"
              class="form-control my-2"
            >
            </textarea>
          </form-group>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <p class="mb-0 text-left ">Start day</p>
          <form-group
            :validator="$v.periodForm.start_time"
            class="form-label-group"
          >
            <b-form-datepicker
              class="mt-2"
              :class="{
                'is-invalid': submitted && $v.periodForm.start_time.$error,
              }"
              v-model="periodForm.start_time"
            ></b-form-datepicker>
          </form-group>
        </div>
        <div class="col-md-6">
          <p class="mb-0 text-left ">End day</p>
        <form-group
            :validator="$v.periodForm.end_time"
            class="form-label-group"
          >
            <b-form-datepicker
              class="mt-2"
              :class="{
                'is-invalid': submitted && $v.periodForm.end_time.$error,
              }"
              v-model="periodForm.end_time"
            ></b-form-datepicker>
          </form-group>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { getDetailPeriod } from "../../../shared/services/evaluation-period.service";
export default {
  name: "AdminFormPeriod",
  created() {},
  data() {
    return {
      positionData: [],
      roleData: [],
      periodForm: {
        description: "",
        name: "",
        start_time: null,
        end_time: null,
      },
      submitted: false,
    };
  },
  validations: {
    periodForm: {
      name: { required },
      start_time: { required },
      end_time: { required },
    },
  },
  props: {
    id: null,
  },
  methods: {
    ...mapActions(["savePeriod", "getDetailPeriod"]),
        ...mapMutations(["GET_DETAIL_PERIOD_ADMIN"]),
    save() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const requestModel = new FormData();
        if (this.id) {
          requestModel.append("id", this.id);
        }
        requestModel.append("name", this.periodForm.name);
        requestModel.append("start_time", this.periodForm.start_time);
        requestModel.append("end_time", this.periodForm.end_time);
        requestModel.append("description", this.periodForm.description);
        this.savePeriod(requestModel);
        return;
      }
    },
  },
  computed: {
    ...mapGetters(["getDetailPeriodAdmin"]),
  },
  mounted() {
    if (this.id) {
      getDetailPeriod(this.id).then((res) => {
      this.GET_DETAIL_PERIOD_ADMIN(res);
      this.periodForm= this.getDetailPeriodAdmin;
    });
    }
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
