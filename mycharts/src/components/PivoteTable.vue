<template>
  <div @click="handleShow" v-if="dataInvalid">
    <dx-pivot-grid
      id="pivotgrid"
      ref="grid"
      :data-source="dataSource"
      :allow-sorting-by-summary="true"
      :allow-filtering="false"
      :show-borders="true"
      :show-column-grand-totals="false"
      :show-row-grand-totals="false"
      :show-row-totals="false"
      :show-column-totals="false"
      :show-totals-prior="showTotalsPrior"
      :data-field-area="dataFieldArea"
      :word-wrap-enabled="false"
      :row-header-layout="rowHeaderLayout"
      :allow-expand-all="true"
    >
      <dx-field-chooser
        :enabled="false"
        :height="400"
      />
      <dx-scrolling mode="virtual"/>
    </dx-pivot-grid>
  </div>
</template>
<script>
import {
  DxPivotGrid,
  DxFieldChooser,
  DxScrolling
} from 'devextreme-vue/pivot-grid';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
export default {
  props:{
    data:{

    },
    fields: {
      type: Array,
      required: true
    }
  },
  components: {
    DxPivotGrid,
    DxFieldChooser,
    DxScrolling
  },
  data() {
    return {
      showTotalsPrior: 'none',
      dataFieldArea: 'column',
      rowHeaderLayout: 'tree'
    };
  },
  methods: {
    handleShow(){
      this.$emit("editViewProperty", "PivoteTable")
    }
  },
  computed:{
    dataInvalid(){
      return this.data && this.data.length>1
    },
    dataSource(){
      return new PivotGridDataSource({
        fields: this.fields,
        store: this.data
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>