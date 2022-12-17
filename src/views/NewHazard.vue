<template>
  <div class="newHazard">
    <Header/>
    <div class="wrapper">
      <PathSection
          :actualTitleNameNavigation="$route.params.actualTitleNameNewHazard"
      />
      <NewHazardForm/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import PathSection from '@/components/PathSection.vue'
import NewHazardForm from "@/components/newHazard/NewHazardForm";

export default {
  data(){
    return {
      acceptCounterArrayLengthNewHazardValue: 0
    }
  },
  props: ['actualTitleNameNewHazard', 'itemIdNewHazard', 'acceptCounterArrayLengthNewHazard'],
  mounted() {

    this.acceptCounterArrayLengthNewHazardValue = this.$route.params.acceptCounterArrayLengthNewHazard

    let header = document.getElementById("header-id")
    header.style.transition = "2s"
    header.style.notification = "2s"
    if (this.acceptCounterArrayLengthNewHazardValue > 0 || localStorage.customMadeProcess === 'true') {
      header.style.background = '#597380'
    } else {
      header.style.background = '#32404F'
    }
  },
  components: {
    Header,
    PathSection,
    NewHazardForm
  }
}
</script>
