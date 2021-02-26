<template>
  <div id="app">
    <router-view></router-view>
    <notifications group="notification" position="top right" animation-type="velocity" />
    <SpinnerLoading v-if="loading" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import SpinnerLoading from "./shared/components/SpinnerLoading";
export default {
  components: {
    SpinnerLoading,
  },
  computed: {
    ...mapState("loader", ["loading"]),
  },
};
</script>
<style lang = "scss">
  @import 'assets/scss/style';
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap");
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: "Roboto Condensed", sans-serif;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.form-error {
  color: rgb(199, 5, 5);
  text-align: left;
  font-size: 12px !important;
}
.is-invalid {
  border: 1px solid red !important;
}
</style>
