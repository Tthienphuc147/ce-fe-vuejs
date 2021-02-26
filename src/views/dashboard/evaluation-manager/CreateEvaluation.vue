<template>
  <div>
    <div class="header-container d-flex">
      <div class="title">Create Evaluation</div>
      <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary mr-3" @click="save()">
          Save
        </button>
        <button class="btn btn-ce btn-ce--cancel" @click="cancel()">
          Cancel
        </button>
      </div>
    </div>
    <div class="content-area p-3">
      <FormEvaluation ref="formEvaluation" :periodId="$route.query.periodId"></FormEvaluation>
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
      this.$refs.formEvaluation.save(false);
    },
    cancel() {
      this.$router.push('/evaluation-manager')
    }
  },
  mounted() {
    console.log(this.$route.query.periodId);
  }
};
</script>

<style lang="scss" scoped></style>
