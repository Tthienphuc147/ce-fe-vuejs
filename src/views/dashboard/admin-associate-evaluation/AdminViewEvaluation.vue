<template>
  <div>
    <modal name="modal">
      <div>
        <div class="container container-modal">
          <div class="title text-uppercase font-weight-bold mb-3">confirm</div>
          <div class="content text-center">
            <p>Are you sure approve this evaluation?</p>
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
              Cancel
            </button>
          </div>
        </div>
      </div>
    </modal>
    <div class="header-container d-flex">
      <div class="title d-flex align-items-center">
        <i class="fa fa-arrow-left mr-2 arrow cursor-pointer" @click="$router.go(-1)" aria-hidden="true"/>
        Evaluation Information
      </div>
      <div class="button-area ml-auto d-flex pr-2">
        <template v-if="status && status.id !== 4">
          <button
            class="btn btn-ce btn-ce--approve mr-3"
            @click.prevent="approve()"
          >
            Approve Evaluation
          </button>
          <button class="btn btn-ce btn-ce--cancel" @click.prevent="cancel()">
            Back
          </button>
        </template>
      </div>
    </div>
    <div class="content-area p-3">
      <FormEvaluation
        ref="formEvaluation"
        :evaluationId="$route.params.id"
      ></FormEvaluation>
    </div>
  </div>
</template>

<script>
import FormEvaluation from "../evaluation-manager/FormEvaluation";
import { approveEvaluation } from "../../../shared/services/evaluation.service";
import { mapGetters } from "vuex";
export default {
  name: "AdminViewEvaluation",
  components: {
    FormEvaluation,
  },
  created() {},
  data() {
    return {
      status: {},
    };
  },
  props: {},
  computed: {
    ...mapGetters(["getCurrentStatus", "getAuthenticationModel"]),
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    hideModal() {
      this.$modal.hide("modal");
    },
    approve() {
      this.$modal.show("modal");
    },
    confirmModal() {
      const model = new FormData();
      model.append("id", this.$route.params.id);
      approveEvaluation(model).then(() => {
      this.$toast("Approve Evaluation Successfully", {
        type: "success",timeout: 1500
      });
        this.$router.go(-1);
      });
    },
  },
  mounted() {
    this.status = this.getCurrentStatus;
  },
};
</script>

<style lang="scss">
.vm--modal {
  height: 150px !important;
}
</style>
