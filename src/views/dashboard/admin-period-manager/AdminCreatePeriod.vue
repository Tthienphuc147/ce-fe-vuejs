
<template>
   <div>
    <div class="header-container d-flex">
      <div class="title">Create Period</div>
      <div class="button-area ml-auto d-flex pr-2">
        <button class="btn btn-ce btn-ce--primary mr-3" @click.prevent="save()">
          Save
        </button>
        <button class="btn btn-ce btn-ce--cancel" @click.prevent="cancel()">
          Cancel
        </button>
      </div>
    </div>
      <AdminFormPeriod ref="formPeriod"></AdminFormPeriod>
  </div>
</template>

<script>
import AdminFormPeriod from './AdminFormPeriod'
export default {
  name: 'AdminCreatePeriod',
    components:{
    AdminFormPeriod
  },
  created() {},
  data() {
    return {};
  },
  props: {},
   methods: {
    save() {
      this.$refs.formPeriod.save();
    },
    cancel() {
      this.$router.push('/period-manager')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>

