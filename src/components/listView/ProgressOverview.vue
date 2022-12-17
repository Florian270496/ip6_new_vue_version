<template>
  <div class="progress-overview">
    <div class="progress-overview__title">
      Fortschrittsübersicht -
      {{ titleNamesProcessOverview[nameCounterProcessOverview] }}
    </div>
    <div class="progress-overview__bar">
      <div class="progress-overview__progress-in-percent" id="progress-overview__progress-in-percent-id">
        <div v-if="!noCheckboxCheckedProcess">
          {{ percentageOfCheckedCheckboxesProcess }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['titleNamesProcessOverview', 'nameCounterProcessOverview', 'noCheckboxCheckedProcess', 'percentageOfCheckedCheckboxesProcess']
  }
</script>