<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="../../assets/images/avt.png" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader
      tag="div"
      class="text-left d-flex flex-column"
      color="light"
    >
      <strong>{{currentUser && currentUser.name}}</strong>
      <label class="mb-0">Position: Software Engineer</label>
    </CDropdownHeader>
    <CDropdownDivider />
    <CDropdownItem @click="logout()"> <CIcon name="cil-lock-locked" /> Logout </CDropdownItem>
  </CDropdown>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";
import store from "../../store";
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      currentUser: store.getters.getAuthenticationModel
    };
  },
  methods: {
    ...mapMutations(["LOGOUT"]),
    logout() {
      this.LOGOUT();
      this.$router.push("/login");
      Vue.notify({
            group: "notification",
            title: "Notification",
            type: "success",
            text: "Logout Successfully",
          });
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>