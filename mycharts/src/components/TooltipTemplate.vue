<template>
  <div style="background:rgba(0,0,0,0.5)">
    <div class='tooltip-header'>{{pointInfo.argumentText}}</div>
    <div class='tooltip-body'>
      {{pointInfo}}
      <!-- <div class='series-name'>{{pointInfo.points[0].seriesName}}: </div>
      <div class='value-text'>{{pointInfo.points[0].valueText}}</div>
      <div class='series-name'>{{pointInfo.points[1].seriesName}}: </div>
      <div class='value-text'>{{pointInfo.points[1].valueText}}% </div> -->
    </div>
  </div>
</template>
<script>

export default {
  props: {
    pointInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    formatNumber:  new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0
    }).format
  },
};
</script>
<style>
.tooltip-header {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 5px;
  border-bottom: 1px solid #c5c5c5;
}

.tooltip-body {
  width: 170px;

}

.tooltip-body .series-name {
  font-weight: normal;
  opacity: 0.6;
  display: inline-block;
  line-height: 1.5;
  padding-right: 10px;
  width: 126px;
}

.tooltip-body .value-text {
  display: inline-block;
  line-height: 1.5;
  width: 30px;
}
</style>
