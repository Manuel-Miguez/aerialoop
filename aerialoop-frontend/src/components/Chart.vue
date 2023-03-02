<template>
  <GChart class="vchart" type="LineChart" :data="data" :options="options" :resizeDebounce="500" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { GChart } from 'vue-google-charts'
import { GoogleChartOptions, GoogleDataTable } from 'vue-google-charts/dist/types';
import { ScheduleFlightResponse } from '../interfaces/api.interface';
import { ChartColors } from '../interfaces/chart.interface';

const data = ref<GoogleDataTable>([] as any);
const options = ref<GoogleChartOptions>({
  chart: {
    title: 'Population of Largest U.S. Cities',
    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    legend: { position: 'top' }
  },
  width: 900,
  height: 500
});
const props = defineProps<{ data: ScheduleFlightResponse, lineColor: ChartColors }>();

const mapData = (flightResponse: ScheduleFlightResponse) => {
  const newData = [];
  const lines: string[] = ['Time in Minutes', 'power Consumption in Watts (W)'];
  const newOptions: GoogleChartOptions = {
    title: `Power Consumption in ${flightResponse.itinerary['flight data file']}`,
    vAxis: {
      title: 'Power Consumption in Watts (W)',
    },
    hAxis: {
      title: 'Time in Seconds (Aprox)',
    },
    colors: [props.lineColor],
    width: 900,
    height: 500
  };
  for (const data of flightResponse.data) {
    const timeSeconds = Number(data.time / 1_000_000)
    newData.push([timeSeconds, data.powerConsumption]);
  }
  data.value = [lines, ...newData] as any;
  options.value = newOptions;
};

watch(props, (oldData, newData) => {
  if (newData && JSON.stringify(oldData) === JSON.stringify(newData)) return;
  mapData(props.data);
}, {
  immediate: true
});

</script>