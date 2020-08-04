<template>
  <div>
    <notifications></notifications>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  methods: {
    disableRTL() {
      if (!this.$rtl.isRTL) {
        this.$rtl.disableRTL();
      }
    },
    toggleNavOpen() {
      let root = document.getElementsByTagName("html")[0];
      root.classList.toggle("nav-open");
    },
  },
  mounted() {
    // if (!localStorage.data) {
    //   // localStorage.data = {};
    //   var data = {};
    //   axios.get("https://api.covid19api.com/countries").then((res) => {
    //     var val = res.data;
    //     val.sort(function (x, y) {
    //       if (x.Slug > y.Slug) return 1;
    //       if (x.Slug < y.Slug) return -1;
    //       return 0;
    //     });
    //     data.countries = val;
    //   });
    //   axios.get("https://api.covid19api.com/summary").then((res) => {
    //     data.vietnam = res.data.Countries[181];
    //   });
    //   // localStorage.data = JSON.stringify(data);
    // console.log(data);
    // };
    
    this.$watch("$route", this.disableRTL, { immediate: true });
    this.$watch("$sidebar.showSidebar", this.toggleNavOpen);
  },
};
</script>

<style lang="scss"></style>
