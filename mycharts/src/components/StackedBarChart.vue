<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    title="Male Age Structure"
  >
    <dx-common-series-settings
      argument-field="state"
      type="stackedbar"
    />
    <dx-value-axis position="left">
      <dx-title text="millions"/>
    </dx-value-axis>
    <dx-series
      value-field="young"
      name="0-14"
    />
    <dx-series
      value-field="middle"
      name="15-64"
    />
    <dx-series
      value-field="older"
      name="65 and older"
    />
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
      item-text-position="top"
    />
    <dx-tooltip
      :enabled="true"
      :customize-tooltip="customizeTooltip"
      location="edge"
    />
  </dx-chart>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxValueAxis,
  DxTitle,
  DxLegend,
  DxExport,
  DxTooltip
} from 'devextreme-vue/chart';

export default {
  components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxValueAxis,
    DxTitle,
    DxLegend,
    DxExport,
    DxTooltip
  },
  data() {
    return {
      dataSource: [
        {
          state: 'Germany',
          young: 6.7,
          middle: 28.6,
          older: 5.1
        }, {
          state: 'Japan',
          young: 9.6,
          middle: 43.4,
          older: 9
        }, {
          state: 'Russia',
          young: 13.5,
          middle: 49,
          older: 5.8
        }, {
          state: 'USA',
          young: 30,
          middle: 90.3,
          older: 14.5
        }
      ]
    };
  },
  methods: {
    customizeTooltip(pointInfo) {
      return {
        text: `${pointInfo.seriesName} years: ${pointInfo.valueText}`
      };
    }
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
