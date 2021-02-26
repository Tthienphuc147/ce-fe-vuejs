<template>
  <div>
    <div class="confirmModal">
    <modal name="modal">
      <div>
        <div class="container container-modal">
          <div class="title text-uppercase font-weight-bold mb-3">confirm</div>
          <div class="content text-center">
            <p>{{'Are you sure update this mapping ?'}}</p>
            <p class="font-italic">When you make this change, some evaluation will have the result!</p>
          </div>
          <div class="button-area d-flex justify-content-center">
            <button
              class="btn text-uppercase btn-modal btn-modal--ok btn-sm mr-3"
              @click="confirmModal()"
            >
              Ok
            </button>
            <button
              class="btn text-uppercase btn-modal btn-modal--cancel btn-sm"
              @click="hideModal()"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </modal>
    </div>
    <div class="header-container d-flex">
      <div class="title">Competency Position Mapping Manager</div>
      <div class="button-area ml-auto d-flex pr-2"></div>
    </div>
    <div class="content-area p-3">
      <div class="filter-area d-flex w-100 my-2">
        <div class="filter-block d-flex mr-3">
          <label class="mr-2">Position</label>
          <select
            v-model="position"
            class="form-control"
            @change="onChangePosition($event)"
          >
            <option :value="null">-- Choose postion --</option>
            <option
              v-for="option in positionData"
              :value="option.value"
              :key="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <p v-if="!position" class="note text-left">
        Choose postion to show mapping table
      </p>
      <div
        class="mt-4"
        v-if="
          !(
            position &&
            getDataCompetencyPositon &&
            getDataCompetencyPositon.length > 0
          )
        "
      >
        <b-skeleton animation="fade" width="85%" class="my-3" height="30px"></b-skeleton>
        <b-skeleton animation="fade" width="55%" class="my-3" height="30px"></b-skeleton>
        <b-skeleton animation="fade" width="70%" class="my-3" height="30px"></b-skeleton>
        <b-skeleton animation="fade" width="85%" class="my-3" height="30px"></b-skeleton>
        <b-skeleton animation="fade" width="55%" class="my-3" height="30px"></b-skeleton>
        <b-skeleton animation="fade" width="70%" class="my-3" height="30px"></b-skeleton>
      </div>
      <div
        class="table-area mt-4"
        v-if="
          position &&
            getDataCompetencyPositon &&
            getDataCompetencyPositon.length > 0
        "
      >
        <div class="btn-area d-flex justify-content-between align-items-center">
                  <h4 class="text-left font-weight-bold">Mapping Table</h4>
          <div>
            <button
            class="btn btn btn-edit"
            v-if="!isEdit"
            @click="isEdit = !isEdit"
          >
            Edit
          </button>
          <template v-if="isEdit">
            <div>
              <button class="btn btn btn-save mr-2" @click="showModal()">
                Save
              </button>
              <button class="btn btn btn-cancel " @click="cancel()">
                Cancel
              </button>
            </div>
          </template>
          </div>
        </div>
        <p v-if="isSubmitted && !validateTable()" class="note mb-2 text-left">
          *You must fill in these fields as required!
        </p>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th colspan="2" class="text-left">Competency</th>
              <th>Critica Level</th>
              <th>Standard Level Point</th>
            </tr>
          </thead>
          <tbody v-for="(item, i) in getDataCompetencyPositon" :key="i">
            <tr class="competency-common">
              <td colspan="4" class="text-left">
                {{ item.competencyGroup && item.competencyGroup.name }}
              </td>
            </tr>
            <tr v-for="(competency, j) in item.itemData" :key="j">
              <td class="table-col--check">
                <input
                  type="checkbox"
                  class="form-control"
                  :disabled="!isEdit"
                  v-model="competency.is_choosed"
                  @change="onChangeChoose(competency)"
                />
              </td>
              <td class="text-left table-col--name">
                {{ competency.name }}
              </td>
              <td class=" table-col--point">
                <vue-numeric-input
                  class="competency-input"
                  v-model="competency.competency_critical_level"
                  :min="1"
                  :max="3"
                  :disabled="!competency.is_choosed || !isEdit"
                  :class="{
                    'is-invalid':
                      competency.is_choosed &&
                      isSubmitted &&
                      !competency.competency_critical_level,
                  }"
                ></vue-numeric-input>
              </td>
              <td class="table-col--point">
                <vue-numeric-input
                  class="competency-input"
                  v-model="competency.competency_standard_level"
                  :min="1"
                  :disabled="!competency.is_choosed || !isEdit"
                  :class="{
                    'is-invalid':
                      competency.is_choosed &&
                      isSubmitted &&
                      !competency.competency_standard_level,
                  }"
                ></vue-numeric-input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { getAllPosition } from "../../../shared/services/position.service";
export default {
  name: "AdminPositionManager",
  created() {},
  data() {
    return {
      positionData: [],
      position: null,
      isEdit: false,
      isSubmitted: false,
    };
  },
  props: {},
  methods: {
    ...mapMutations(["GET_ALL_POSITION"]),
    ...mapActions([
      "getAllCompetencyPositon",
      "getAllCompetency",
      "saveCompetencyPositon",
    ]),
     hideModal() {
      this.$modal.hide("modal");
    },

    confirmModal() {
      let data = [];
      (this.getDataCompetencyPositon || []).forEach((item) => {
        data.push(item.itemData);
      });
      data = data.flat(1).map((item) => {
        const model = {
          id: item.id,
          competency_id: item.competency_id,
          competency_critical_level: +item.competency_critical_level,
          competency_standard_level: +item.competency_standard_level,
          is_choosed: item.is_choosed,
        };
        return model;
      });
      const requestModel = new FormData();
      requestModel.append("competencyPositions", JSON.stringify(data));
      this.saveCompetencyPositon(requestModel);
      this.$modal.hide("modal");
      this.isEdit = false;
    },
    onChangePosition(event) {
      this.getAllCompetencyPositon(event.target.value);
      this.isEdit = false;
    },
    validateTable() {
      this.isSubmitted = true;
      let data = [];
      (this.getDataCompetencyPositon || []).forEach((item) => {
        data.push(item.itemData);
      });
      return (data.flat(1) || [])
        .filter((el) => el.is_choosed)
        .every(
          (item) =>
            item.competency_critical_level && item.competency_standard_level
        );
    },
    cancel() {
      this.isEdit = !this.isEdit;
      this.getAllCompetencyPositon(this.position);
    },
    onChangeChoose(item) {
      let data = [];
      (this.getDataCompetencyPositon || []).forEach((item) => {
        data.push(item.itemData);
      });
      let result = (data.flat(1) || []).find(
        (competency) => competency.id === item.id
      );
      (result.competency_critical_level = null),
        (result.competency_standard_level = null);
    },
    showModal() {
      if (!this.validateTable()) {
        return;
      }
      this.$modal.show("modal");
    },
  },
  watch: {},
  computed: {
    ...mapGetters([
      "getAllPosition",
      "getDataCompetencyPositon",
      "getDataCompetency",
    ]),
  },
  mounted() {
    getAllPosition().then((res) => {
      this.GET_ALL_POSITION(res);
      this.positionData = this.getAllPosition;
    });
  },
};
</script>

<style lang="scss" >
.confirmModal {
.vm--modal {
    height:200px !important;
}
}
.table-col {
  &--name {
    min-width: 30rem;
  }
  &--point {
    min-width: 10rem;
  }
}
.competency-input {
  max-width: 100px;
}
.competency-common {
  background-color: #ececec;
  font-weight: bold;
}
.btn-area {
  margin-bottom: 10px;
  .btn-edit {
    background-color: rgb(112, 180, 226);
    color: #fff;
  }
  .btn-save {
    background-color: rgb(10, 119, 10);
    color: #fff;
  }
  .btn-cancel {
    background-color: rgb(197, 197, 197);
    color: rgb(58, 58, 58);
  }
}
</style>
