<template>
  <div id="chart-demo">
    <dx-chart
      :data-source="dataSource"
      palette="bar"
      title="Population: Age Structure (2000)"
    >
      <dx-common-series-settings
        :type="type"
        argument-field="country"
      />
      <dx-series
        value-field="y1564"
        name="15-64 years"
      />
      <dx-series
        value-field="y014"
        name="0-14 years"
      />
      <dx-series
        value-field="y65"
        name="65 years and older"
      />
      <dx-margin :bottom="20"/>
      <dx-argument-axis :value-margins-enabled="false"/>
      <dx-legend
        vertical-alignment="bottom"
        horizontal-alignment="center"
      />
      <dx-export :enabled="true"/>
    </dx-chart>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Series Type</span>
        <dx-select-box
          :data-source="types"
          :value.sync="type"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxExport,
  DxLegend,
  DxMargin
} from 'devextreme-vue/chart';

import DxSelectBox from 'devextreme-vue/select-box';

export default {
  components: {
    DxSelectBox,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxExport,
    DxLegend,
    DxMargin
  },
  data() {
    const types = ['area', 'stackedarea', 'fullstackedarea'];

    return {
      dataSource: [{
  country: 'China',
  y014: 320866959,
  y1564: 853191410,
  y65: 87774113
}, {
  country: 'India',
  y014: 340419115,
  y1564: 626520945,
  y65: 47063757
}, {
  country: 'United States',
  y014: 58554755,
  y1564: 182172625,
  y65: 34835293
}, {
  country: 'Indonesia',
  y014: 68715705,
  y1564: 146014815,
  y65: 10053690
}, {
  country: 'Brazil',
  y014: 50278034,
  y1564: 113391494,
  y65: 9190842
}, {
  country: 'Russia',
  y014: 26465156,
  y1564: 101123777,
  y65: 18412243
}],
      types,
      type: types[0]
    };
  }
};
</script>
<style>
.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
}

.option {
    margin-top: 10px;
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option > span {
    margin-right: 10px;
}

.option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
}
</style>
