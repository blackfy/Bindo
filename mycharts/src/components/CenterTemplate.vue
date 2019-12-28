<template>
  <svg>
    <text
      :style="{fontSize: 18, fill:&quot;#494949&quot;}"
      text-anchor="middle"
      x="100"
      y="120"
    >
      <tspan
        :style="{ fontWeight: 600, fontSize: '24px' }"
        x="100"
        dy="20px"
      >{{ calculateTotal(pieChart) }}</tspan>
      <tspan x="100" dy="24px" :style="{ fontSize: '15px' }" >总计</tspan>
    </text>
  </svg>
</template>
<script>

const formatNumber = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0
}).format;

export default {
  props: {
    pieChart: {
      type: Object,
      default: () => ({})
    },
    format: {
      type: String
    }
  },
  methods: {
    calculateTotal(pieChart) {
      return (this.format=='currency'?'$':'')+formatNumber(pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => s + p.originalValue, 0));
    }
  }
};
</script>
