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

    <CRenderFunction flat :content-to-render="$options.nav" />
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
  nav,
  methods: {
    ...mapMutations(["set"]),
  },
  computed: {
    ...mapGetters(["getSidebarShow", "getSidebarMinimize"]),
    show() {
      return this.getSidebarShow;
    },
    minimize() {
      return this.getSidebarMinimize;
    },
  },
};
</script>
