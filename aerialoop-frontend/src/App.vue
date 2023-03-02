<template>
  <Upload @change="onChange" />
  <div v-if="hasData">
    <div v-for="(item) in chartData">
      <Chart :data="item" :line-color="colors.pop() || ChartColors.black" />
      <br>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Ref, ref } from 'vue';
import Chart from './components/Chart.vue';
import Upload from './components/Upload.vue';
import { ScheduleFlightResponse } from './interfaces/api.interface';
import { ChartColors } from './interfaces/chart.interface';

const chartData: Ref<ScheduleFlightResponse[]> = ref([] as any);
const hasData = ref<boolean>(false);
const colors: ChartColors[] = Object.values(ChartColors).map(c => c).sort((a, b) => 0.5 - Math.random());


const onChange = (data: ScheduleFlightResponse[]) => {
  hasData.value = true;
  chartData.value = data;
};

const selectRandomItem = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

</script>
