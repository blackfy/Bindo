<template>
  <div @click="handleShow">
    <dx-pie-chart
      id="pie-chart"
      :data-source="data"
      :inner-radius="0.65"
      resolve-label-overlapping="shift"
      size-group="piesGroup"
      type="doughnut"
      center-template="centerTemplate"
    >
      <dx-series :argument-field="argumentField" :value-field="valueField" >
        <dx-label
          :visible="true"
          :customize-text="customizeLabel"
          background-color="none"
          :format="format"
        >
          <dx-connector :visible="true"/>
        </dx-label>
      </dx-series>

      <dx-tooltip
        :enabled="true"
        :shared="true"
        :customize-tooltip="customizeTooltip"
      />

      <dx-legend 
        vertical-alignment="bottom"
        horizontal-alignment="center"
        item-text-position="right" />
      <template #centerTemplate="{ data }">
        <center-template :pie-chart="data" :format="format"/>
      </template>
    </dx-pie-chart>
  </div>
</template>
<script>

import { DxPieChart, DxSeries, DxExport, DxTooltip, DxLegend, DxLabel, DxConnector, DxFormat } from 'devextreme-vue/pie-chart';
import CenterTemplate from './CenterTemplate.vue';

export default {
  props:{
    data:{
      type: Array,
      required: true
    },
    argumentField:{
      type: String,
      required: true
    },
    valueField:{
      type: String,
      required: true
    },
    format: {
      type: String,
      default: ''
    }
  },
  components: {
    DxPieChart, DxSeries, DxExport, DxTooltip, DxLegend, DxLabel, DxConnector, DxFormat, CenterTemplate
  },
  methods: {
    handleShow(){
      this.$emit("editViewProperty", "DoughnutChart")
    },
    customizeTooltip({ valueText, percent }) {
      return {
        text: `${(percent * 100).toFixed(2)}%`
      };
    },
    customizeLabel({ argumentText, valueText }) {
      return `${argumentText} (${valueText})`;
    }
  }
};
</script>
<style scoped>
.pies-container {
    margin: auto;
    /* height: 400px; */
    flex: 1;
}

.pies-container > div {
    float: left;
    margin-top: -50px;
}

.long-title h3 {
    font-weight: 200;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
}
</style>
