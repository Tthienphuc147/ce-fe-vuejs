<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => set(['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img
        src="../../assets/images/logo/logo.png"
        alt=""
        width="150px"
        class="c-sidebar-brand-full"
      />
      <img
        src="../../assets/images/logo/logo.png"
        alt=""
        width="30px"
        class="c-sidebar-brand-minimized"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="computedSidebar" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="set(['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "TheSidebar",
  data() {
     return {
        roleId : null
     }
  },
  methods: {
    ...mapMutations(["set"]),
  },
  computed: {
    ...mapGetters(["getSidebarShow", "getSidebarMinimize","getAuthenticationModel"]),
    show() {
      return this.getSidebarShow;
    },
    minimize() {
      return this.getSidebarMinimize;
    },
    currentItems() {
      return (nav || []).filter(item => {
        return !item.roles || item.roles.includes(this.roleId);
      });
    },
    computedSidebar() {
     
      return [
        {
          _name: "CSidebarNav",
          _children: this.currentItems
        }
      ];
    },
   
  },
  mounted() {
        this.roleId = this.getAuthenticationModel.role && this.getAuthenticationModel.role.id
  }
};
</script>
