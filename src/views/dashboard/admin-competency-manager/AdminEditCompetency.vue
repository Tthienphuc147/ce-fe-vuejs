
<template>
  <div>
    <div class="header-container d-flex">
      <div class="title">Edit Competency</div>
      <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary mr-3" @click.prevent="save()">
          Save
        </button>
        <button class="btn btn-ce btn-ce--cancel" @click.prevent="cancel()">
          Cancel
        </button>
      </div>
    </div>
      <AdminFormCompetency ref="formComptency" :id="$route.params.id"></AdminFormCompetency>
  </div>
</template>

<script>
import AdminFormCompetency from './AdminFormCompetency'
export default {
  name: 'AdminEditCompetency',
  components:{
    AdminFormCompetency
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
      this.$refs.formComptency.save();
    },
     cancel() {
      this.$router.push('/competency-manager')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>

