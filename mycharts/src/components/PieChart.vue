<template>
  <div @click="handleShow">
    <dx-pie-chart
      id="pie"
      :data-source="data"
      palette="bar"
    >
      <dx-series :argument-field="argumentField" :value-field="valueField">
        <dx-label :visible="true" :format="format">
          <dx-connector
            :visible="true"
            :width="1"
          />
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
        item-text-position="right"
      />
      <dx-size :width="400"/>
    </dx-pie-chart>
  </div>
</template>

<script>

import DxPieChart, {
  DxSize,
  DxSeries,
  DxLabel,
  DxConnector,
  DxLegend,
  DxTooltip
} from 'devextreme-vue/pie-chart';

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
    DxPieChart,
    DxSize,
    DxSeries,
    DxLabel,
    DxConnector,
    DxLegend,
    DxTooltip
  },
  methods: {
    customizeTooltip({ valueText, percent }) {
      return {
        text: `${(percent * 100).toFixed(2)}%`
      };
    },
    handleShow(){
      this.$emit("editViewProperty", "PieChart")
    }
  },
};
</script>

<style>
#pie * {
    margin: 0 auto;
}
</style>
