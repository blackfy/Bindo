<template>
  <div @click="handleShow">
    <dx-chart
      id="chart"
      :data-source="dataSource"
      @pointClick="onPointClick"
    >
      <dx-common-series-settings
        argument-field="state"
        hover-mode="allArgumentPoints"
        selection-mode="allArgumentPoints"
        type="bar"
      >
      
        <dx-label :visible="true">
          <dx-format
            :precision="0"
            type="fixedPoint"
          />
        </dx-label>
      </dx-common-series-settings>
      <dx-series
        value-field="year2004"
        name="2004"
      />
      <dx-series
        value-field="year2001"
        name="2001"
      />
      <dx-series
        value-field="year1998"
        name="1998"
      >
      
      </dx-series>
      <dx-argument-axis>
        <!-- <dx-minor-tick :visible="false" /> -->
        <!-- <dx-tick :visible="false" /> -->
        <dx-label :visible="true" />
      </dx-argument-axis>
      <dx-legend
        vertical-alignment="top"
        horizontal-alignment="right"
      />
      <!-- <dx-title text="Energy Consumption in 2004">
        <dx-subtitle text="(Millions of Tons, Oil Equivalent)"/>
      </dx-title> -->
      
      <!-- <dx-value-axis title="=====xxxx===999" /> -->
      

      <dx-value-axis
        :linear-threshold="-3"
        title="Logarithmic Axis"
        pane="top"
      >
      <!-- <dx-minor-tick :visible="false" />
        <dx-tick :visible="false" />
        <dx-label :visible="false" /> -->
      </dx-value-axis>
    </dx-chart>
  </div>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLabel,
  DxFormat,
  DxLegend,
  DxArgumentAxis,
  DxTitle,
  DxSubtitle,
  DxTick,
  DxMinorTick,
  DxValueAxis
} from 'devextreme-vue/chart';

export default {
  components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxLabel,
    DxFormat,
    DxLegend,
    DxArgumentAxis,
    DxTitle,
    DxValueAxis,
    DxSubtitle,
    DxTick,
    DxMinorTick
  },
  data() {
    return {
      dataSource: [
        {
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
        }
      ]
    };
  },
  methods: {
    handleShow(){
      this.$emit("editViewProperty", "BarChart")
    },
    onPointClick({ target }) {
      target.select();
    }
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
