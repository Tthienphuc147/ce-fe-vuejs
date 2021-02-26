<template>
  <div>
    <div class="content-area p-3">
      <form @submit.prevent="save">
        <h5 class="text-left font-weight-bold">Common Information</h5>
        <div class="row mb-2">
          <div class="col-md-6">
            <p class="mb-0 text-left required">Name</p>
            <form-group
              :validator="$v.competencyForm.name"
              class="form-label-group"
            >
              <input
                type="text"
                v-model="competencyForm.name"
                class="form-control my-2"
                :class="{
                  'is-invalid': submitted && $v.competencyForm.name.$error,
                }"
              />
            </form-group>
            <p class="mb-2 text-left required">Competency type</p>
            <form-group
              :validator="$v.competencyForm.competency_type_id"
              class="form-label-group"
            >
              <select
                v-model="competencyForm.competency_type_id"
                class="form-control"
                :class="{
                  'invalid-select':
                    submitted && $v.competencyForm.competency_type_id.$error,
                }"
              >
                <option :value="null">-- Choose Competency Type--</option>
                <option
                  v-for="option in getDataCompetencyTypeAdmin"
                  :value="option.id"
                  :key="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </form-group>
          </div>
          <div class="col-md-6">
            <p class="mb-0 text-left required">Description</p>
            <form-group
              class="form-label-group"
              :validator="$v.competencyForm.description"
            >
              <textarea
                cols="30"
                rows="4"
                v-model="competencyForm.description"
                class="form-control my-2"
                :class="{
                  'is-invalid':
                    submitted && $v.competencyForm.description.$error,
                }"
              >
              </textarea>
            </form-group>
          </div>
        </div>
        <hr class="border-dash" />
        <div class="d-flex align-items-center">
          <h5 class="text-left font-weight-bold mr-4">
            Dimensions Information
          </h5>
         
        </div>
        <p
          class="text-left note my-3"
          v-if="
            submitted &&
              competencyForm.dimensions &&
              competencyForm.dimensions.length === 0
          "
        >
          You must enter at least one dimension!
        </p>
        <template>
          <div
            class="dimesions-form mt-3"
            v-for="(dimension, i) in competencyForm.dimensions"
            :key="i"
          >
            <div class="row">
              <div class="col-md-4">
                <p class="mb-0 text-left required">Name</p>
                <form-group class="form-label-group">
                  <textarea
                    cols="30"
                    rows="2"
                    v-model="dimension.name"
                    class="form-control my-2"
                    :class="{
                      'is-invalid': submitted && !dimension.name,
                    }"
                  >
                  </textarea>
                  <p
                    class="note text-left mt-2"
                    v-if="submitted && !dimension.name"
                  >
                    This field is required
                  </p>
                </form-group>
              </div>
              <div class="col-md-12">
                <div class="table-area mt-2">
                  <table class="table table-bordered">
                    <thead>
                      <th>Level</th>
                      <th>Description</th>
                      <th>Cotnent</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(level, j) in dimension.dimensionLevel"
                        :key="j"
                      >
                        <td>Level {{ j + 1 }}</td>
                        <td>
                          <textarea
                            cols="30"
                            rows="2"
                            v-model="level.description"
                            class="form-control my-2"
                          >
                          </textarea>
                        </td>
                        <td>
                          <textarea
                            cols="30"
                            rows="2"
                            v-model="level.content"
                            class="form-control my-2"
                            :class="{
                              'is-invalid': submitted && !level.content,
                            }"
                          >
                          </textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </template>
         <div class="d-flex justify-content-end">
           <button class="btn btn-sm btn-create" @click.prevent="addDimension()">
            Add Dimension
          </button>
         </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AdminFormCompetency",
  created() {},
  data() {
    return {
      competencyForm: {
        description: "",
        name: "",
        competency_type_id: null,
        dimensions: [],
      },
      submitted: false,
    };
  },
  validations: {
    competencyForm: {
      name: { required },
      description: { required },
      competency_type_id: { required },
    },
  },
  props: { id: null },
  methods: {
    ...mapActions([
      "getAllCompetencyTypeAdmin",
      "saveCompetency",
      "getDetailCompetencyAdmin",
    ]),
    validateForm() {
      return (this.competencyForm.dimensions || []).every((item) => {
        item.name &&
          (item.dimensionLevel || []).every((level) => {
            level.content;
          });
      });
    },
    save() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const model = new FormData();

        if (this.id) {
          model.append("id", this.id);
        }
        model.append(
          "competency_type_id",
          this.competencyForm.competency_type_id
        );
        model.append("name", this.competencyForm.name);
        model.append("description", this.competencyForm.description);
        model.append(
          "dimensions",
          JSON.stringify(this.competencyForm.dimensions)
        );
        this.saveCompetency(model);
        return;
      }
    },
    addDimension() {
      let data = [];
      for (let i = 0; i < 5; i++) {
        const model = {
          level_type_id: i + 1,
          content: "",
          description: "",
        };
        data.push(model);
      }
      console.log(data);
      console.log(this.competencyForm.dimensions);
      (this.competencyForm.dimensions || []).push(
        !this.id
          ? {
              name: "",
              dimensionLevel: data,
            }
          : {
              name: "",
              dimension_level: data,
            }
      );
      console.log(this.competencyForm.dimensions);
    },
  },
  computed: {
    ...mapGetters([
      "getDataCompetencyTypeAdmin",
      "getDataDetailCompetencyAdmin",
    ]),
  },
  watch: {
    getDataDetailCompetencyAdmin: {
      handler() {
        this.competencyForm.name = this.getDataDetailCompetencyAdmin.name;
        this.competencyForm.description = this.getDataDetailCompetencyAdmin.description;
        this.competencyForm.competency_type_id = this.getDataDetailCompetencyAdmin.competency_type_id;
        this.competencyForm.dimensions = this.getDataDetailCompetencyAdmin.dimensions;
      },
    },
  },
  mounted() {
    this.getAllCompetencyTypeAdmin();
    if (this.id) {
      this.getDetailCompetencyAdmin(this.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-create {
  background-color: rgb(23, 119, 3);
  color: #fff;
}
</style>
