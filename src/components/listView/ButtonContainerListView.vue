<template>
  <div class="next-step">
    <div class="button-container next-step__button-container">
      <div id="next-step__link" @click="nextStepCounter()">
        <div class="button button--submit" id="button--next-step">
          Schritt abschliessen
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.nameCounter === undefined) {
      localStorage.nameCounter = 0
    }
    this.checkStep()
  },
  props: ['titleNamesButtonList', 'hazardsButtonContainer'],
  data() {
    return {
      hazardsNew: null,
      nameCounter: null,
      cusomtMadeProcess: false
    }
  },
  methods: {
    nextStepCounter() {
      if (JSON.parse(localStorage.acceptArray).length > 0) {
        this.cusomMadeProcess = true
      }

      localStorage.checkedCheckboxesArray = JSON.stringify([])
      localStorage.acceptArray = JSON.stringify([])

      if (this.nameCounter < this.titleNamesButtonList.length - 1) {
        this.nameCounter++;
      } else {
        this.nameCounter = 0;
        this.cusomMadeProcess = false
      }
      localStorage.nameCounter = this.nameCounter
      localStorage.customMadeProcess = this.cusomMadeProcess
      this.checkStep()
    },
    checkStep() {
      this.$emit('readNameCounter', localStorage.nameCounter)

      if (this.nameCounter !== localStorage.nameCounter) {
        this.nameCounter = localStorage.nameCounter
      }
    }
  },

}

</script>