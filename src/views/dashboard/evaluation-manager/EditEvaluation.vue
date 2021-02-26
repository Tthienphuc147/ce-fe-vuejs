
<template>
  <div>
    <div class="confirmModal">
    <modal name="modal" >
      <div>
        <div class="container container-modal">
          <div class="title text-uppercase font-weight-bold mb-3">confirm</div>
          <div class="content text-center">
            <p>{{this.role.id === 3 ? 'Are you sure submit this evaluation to HR?' : 'Are you sure complete this evaluation?'}}</p>
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
      <div class="title">{{(this.status.id === 4 || this.status.id === 3) ? "Evaluation Information" : this.status.id === 2 ? "Review Evaluation" : "Edit Evaluation"}}</div>
      <div class="button-area ml-auto d-flex pr-2">
        <template
          v-if="
            this.status &&
            this.role &&
            (this.status.id === 1 ||
              (this.status.id === 2 && this.role.id === 3))
          "
        >
          <button
            class="btn btn-ce btn-ce--primary mr-3"
            @click.prevent="save()"
          >
            Save
          </button>
          <button
            class="btn btn-ce btn-ce--submit mr-3"
            @click.prevent="send()"
          >
            Send
          </button>
        </template>
          <button class="btn btn-ce btn-ce--cancel" @click.prevent="cancel()">
            Cancel
          </button>
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
import FormEvaluation from "./FormEvaluation";
import { mapGetters } from "vuex";
export default {
  name: "EditEvaluation",
  components: {
    FormEvaluation,
  },
  created() {},
  data() {
    return {
      status: {},
      role: {},
    };
  },
  props: {},
  computed: {
    ...mapGetters(["getCurrentStatus", "getAuthenticationModel"]),
  },
  methods: {
    save() {
      this.$refs.formEvaluation.save(false);
    },
    send() {
      this.$refs.formEvaluation.isSend = true;
      if (
        this.$refs.formEvaluation.isSend &&
        !this.$refs.formEvaluation.validateTable()
      ) {
        return;
      }
      this.$modal.show("modal");
    },
    cancel() {
      this.role.id === 2 ? this.$router.push("/evaluation-manager") :this.$router.go(-1)
    },
    hideModal() {
      this.$modal.hide("modal");
    },
    confirmModal() {
      this.$refs.formEvaluation.save(true);
    },
  },
  mounted() {
    this.status = this.getCurrentStatus; 
    this.role = this.getAuthenticationModel.role;
  },
};
</script>

<style lang="scss" >
.confirmModal {
.vm--modal {
    height:150px !important;
}
}
</style>

