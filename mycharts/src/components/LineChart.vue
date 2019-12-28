<template>
  <div id="chart-demo" @click="handleShow">
    <dx-chart id="chart" :data-source="data" palette="bar">
      <!-- 文字描述标签 -->
      <dx-common-series-settings :argumentField="argumentField" >
        <dx-label :visible="onlineLabelVisible">
          <dx-format :precision="0" type="fixedPoint"/>
        </dx-label>
        <dx-point :visible="onlineDotVisible" />
      </dx-common-series-settings>


      <!-- 图例项目 -->
      <dx-legend
        :visible="legendVisible"
        vertical-alignment="top"
        horizontal-alignment="right"
        item-text-position="bottom"
      />
      <dx-series
        v-for="field in legendFields"
        :key="field.value"
        :value-field="field.value"
        :name="field.name"
      />
      <!-- 空隙 -->
      <dx-margin :bottom="20"/>

      <!-- x轴坐标 -->
      <dx-argument-axis :value-margins-enabled="false">
        <dx-grid :visible="true"/>
        <dx-minor-tick :visible="xAxisVisible" />
        <dx-tick :visible="xAxisVisible" />
        <dx-label :visible="xAxisVisible" />
      </dx-argument-axis>

      
      
      <!-- 划过提示 -->
      <dx-tooltip
        :enabled="true"
        :shared="true"
        :customize-tooltip="customizeTooltip"
      />

      <!-- 横轴标题 -->
      <dx-title :text="titleIsHorizontal?title:''" horizontal-alignment="left">
        <dx-font :size="18" color="#232323" :weight="800"/>
        <dx-margin :bottom="10"/>
      </dx-title>

      <!-- y轴坐标和纵轴标题 -->
      <dx-value-axis>
        <dx-title v-if="!titleIsHorizontal" :text="title">
          <dx-font :size="18" color="#232323" :weight="800"/>
        </dx-title>
        <dx-minor-tick :visible="yAxisVisible" />
        <dx-tick :visible="yAxisVisible" />
        <dx-label :visible="yAxisVisible" />
      </dx-value-axis>
    </dx-chart>
  </div>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxGrid,
  DxMargin,
  DxLegend,
  DxTitle,
  DxSubtitle,
  DxTooltip,
  DxSize,
  DxFont,
  DxValueAxis,
  DxTick,
  DxMinorTick,
  DxLabel,
  DxPoint,
  DxFormat
} from 'devextreme-vue/chart';
import DxSelectBox from 'devextreme-vue/select-box';
import TooltipTemplate from './TooltipTemplate.vue';
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    titleAlignment: {
      type: String,
      default: "horizontal"
    },
    xAxisVisible: {
      type: Boolean,
      default: true
    },
    yAxisVisible: {
      type: Boolean,
      default: true
    },
    legendVisible: {
      type: Boolean,
      default: true
    },
    onlineDotVisible: {
      type: Boolean,
      default: true 
    },
    onlineLabelVisible:{
      type: Boolean,
      default: false 
    },
    data:{
      type: Array,
      required: true
    },
    legendFields:{
      type: Array,
      required: true
    },
    argumentField: {
      type: String,
      required: true
    }
  },
  components: {
    DxSelectBox,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxGrid,
    DxMargin,
    DxLegend,
    DxTitle,
    DxSubtitle,
    DxTooltip,
    DxSize,
    DxFont,
    DxValueAxis,
    DxTick,
    DxMinorTick,
    DxLabel,
    DxPoint,
    DxFormat
  },
  computed: {
    titleIsHorizontal(){
      return this.titleAlignment == 'horizontal'
    }
  },
  methods: {
    customizeTooltip(pointInfo){
      let template = `
        <div style="width: 170px;">
            <div class='tooltip-header'>${pointInfo.argumentText}</div>
            <div class='tooltip-body'>`;

      this.legendFields.forEach((_, index) =>{
        template += `<div class='series-name'>
          <span class="title">${pointInfo.points[index].seriesName}:</span>
          <span class="value">${pointInfo.points[index].valueText}</span>
        </div>`
      });
      template += `
          </div>
        </div>
      `
      return {
        html: template
      };
    },
    handleShow(){
      this.$emit("editViewProperty", "LineChart")
    },
  },
};
</script>
<style>
#chart-demo{
  padding: 10px;
}
.tooltip-header{
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}
.title{
  font-weight: bold;
  display: inline-block;
  min-width: 80px;
}
</style>
