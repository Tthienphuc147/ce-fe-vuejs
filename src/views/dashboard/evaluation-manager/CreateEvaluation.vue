<template>
  <div>
    <div class="header-container d-flex">
      <div class="title">Create Evaluation</div>
      <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary mr-3" @click="save()">
          Save
        </button>
        <button class="btn btn-ce btn-ce--cancel">
          Cancel
        </button>
      </div>
    </div>
    <div class="content-area p-3">
      <FormEvaluation ref="formEvaluation" ></FormEvaluation>
    </div>
  </div>
</template>

<script>
import FormEvaluation from './FormEvaluation'
export default {
  name: "CreateEvaluation",
  components:{
    FormEvaluation
  },
  created() {},
  data() {
    return {};
  },
  props: {},
   methods: {
    save() {
      this.$refs.formEvaluation.save();
    }
  }
};
</script>

<style lang="scss" scoped></style>
