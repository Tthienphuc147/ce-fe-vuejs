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
    <CHeaderNav class="ml-auto d-flex">
       <strong>{{currentUser && currentUser.name}}</strong>
      <TheHeaderDropdownAccount/>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccount from './TheHeaderDropdownAccount'
import { mapMutations} from "vuex";
import store from "../../store";
export default {
  name: 'TheHeader',
  data() {
      return {
      currentUser: store.getters.getAuthenticationModel
    };
  },
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