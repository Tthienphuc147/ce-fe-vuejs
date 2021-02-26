
<template>
  <div>
    <div class="header-container d-flex">
      <div class="title">Edit Associate</div>
      <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary mr-3" @click="save()">
          Save
        </button>
        <button class="btn btn-ce btn-ce--cancel" @click="cancel()">
          Back
        </button>
      </div>
    </div>
      <AdminFormAssociate ref="formAssociate" :id="$route.params.id"></AdminFormAssociate>
  </div>
</template>

<script>
import AdminFormAssociate from './AdminFormAssociate'
export default {
  name: 'AdminEditAssociate',
    components:{
    AdminFormAssociate
  },
  created() {},
  data() {
    return {};
  },
  props: {},
   methods: {
    save() {
      this.$refs.formAssociate.save();
    },
    cancel() {
      this.$router.push('/associate-manager')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>

