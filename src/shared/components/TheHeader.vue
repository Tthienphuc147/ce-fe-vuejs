<template>
  <CHeader fixed with-subheader light>
   <div class="d-flex align-items-center">
      <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="toggleSidebarDesktop"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="toggleSidebarDesktop"
    />
    <span class="title">Competencies Evaluation Manager</span>
   </div>
    <CHeaderNav class="ml-auto">
      <TheHeaderDropdownAccount/>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccount from './TheHeaderDropdownAccount'
import { mapMutations} from "vuex";
export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccount
  },
  methods: {
    ...mapMutations(["toggleSidebarDesktop","toggleSidebarDesktop"])
  }
}
</script>
<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}
</style>