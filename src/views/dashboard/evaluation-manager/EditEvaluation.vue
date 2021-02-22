
<template>
  <div>
    <div class="header-container d-flex">
      <div class="title">Edit Evaluation</div>
      <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary mr-3" @click.prevent="save()">
          Save
        </button>
        <button class="btn btn-ce btn-ce--submit mr-3">
          Send
        </button>
        <button class="btn btn-ce btn-ce--cancel">
          Cancel
        </button>
      </div>
    </div>
    <div class="content-area p-3">
       <FormEvaluation ref="formEvaluation" :evaluationId="$route.params.id"></FormEvaluation>
    </div>
  </div>
</template>

<script>
import FormEvaluation from './FormEvaluation';
export default {
  name: 'EditEvaluation',
   components:{
    FormEvaluation
  },
  created() {

  },
  data() {
    return {
    }
  },
  props: {
   
  },
  methods: {
    save() {
      this.$refs.formEvaluation.save();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

