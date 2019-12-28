<template>
  <dx-chart
    id="chart"
    :data-source="grossProductData"
    :sticky-hovering="false"
    title="Great Lakes Gross State Product"
  >
    <dx-common-series-settings
      type="spline"
      argument-field="state"
      hover-mode="includePoints"
    >
      <dx-point hover-mode="allArgumentPoints"/>
    </dx-common-series-settings>
    <dx-series
      v-for="year in yearSources"
      :key="year.value"
      :value-field="year.value"
      :name="year.name"
    />
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
      hover-mode="excludePoints"
    />
    <dx-export :enabled="true"/>
  </dx-chart>
</template>
<script>

import {
  DxChart,
  DxCommonSeriesSettings,
  DxSeries,
  DxExport,
  DxLegend,
  DxPoint
} from 'devextreme-vue/chart';

export default {

  components: {
    DxChart,
    DxCommonSeriesSettings,
    DxSeries,
    DxExport,
    DxLegend,
    DxPoint
  },

  data() {
    return {
      yearSources: [
  { value: 'year2004', name: '2004' },
  { value: 'year2001', name: '2001' },
  { value: 'year1998', name: '1998' }
],
      grossProductData: [{
  state: 'Illinois',
  year1998: 423.721,
  year2001: 476.851,
  year2004: 528.904
}, {
  state: 'Indiana',
  year1998: 178.719,
  year2001: 195.769,
  year2004: 227.271
}, {
  state: 'Michigan',
  year1998: 308.845,
  year2001: 335.793,
  year2004: 372.576
}, {
  state: 'Ohio',
  year1998: 348.555,
  year2001: 374.771,
  year2004: 418.258
}, {
  state: 'Wisconsin',
  year1998: 160.274,
  year2001: 182.373,
  year2004: 211.727
}]
    };
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
