<template>
  <div class="peropty-wrap">
    <p class="peropty-title">
      <slot name="title">
        <span>{{properties.title}}</span>
      </slot>
    </p>
    <div class="peropty-item">
      <slot>
        <ul v-if="properties && properties.property">
          <li v-for="(property,index) in properties.property" :key="index">
            <p v-if="property.title" :class="['title',property.required?'required-field':'']">
              <template v-if="property.type == 'inline-checkbox'">
                <el-checkbox :label="property.title" v-model="property.value"></el-checkbox>
              </template>
              <template v-else>
                {{property.title}}
              </template>
            </p>
            <template v-if="Array.isArray(property.options)">
              <el-select
                size="small"
                v-model="property.value"
                :multiple="property.multiple"
                filterable
                allow-create
                default-first-option
                style="width:100%"
                :placeholder="property.placeholder">
                <el-option
                  v-for="item in property.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-else-if="property.type == 'input'">
              <el-input size="small" 
                :placeholder="property.placeholder"
                v-model="property.value">
                <template slot="append">
                  <div style="display:flex;align-content:center;align-items:center;position:absolute;left:0;top:0;width:100%;height:100%;">
                    <span style="flex:1;text-align:center;">A/文</span>
                  </div>
                </template>
              </el-input>
            </template>
          </li>
        </ul>
        <div v-if="!properties || !properties.property || !properties.property.length">
          <p>{{properties.viewName?'暂不支持':'请先选择图表'}}</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    properties:{
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss" scope>
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: inherit;
    font-weight: normal;
    font-size: 14px;
  }
  .peropty-wrap{
    .peropty-title{
      padding: 15px 0;
      border-bottom: 1px solid #CCC;
      span{
        position: relative;
        padding: 15px;
        &::after{
          content: '';
          position: absolute;
          width: 100%;
          background: #63868c;
          height: 2px;
          bottom: 0;
          left: 0;
        }
      }
    }
    .peropty-item{
      padding: 15px;
      .title{
        margin: 10px 0 5px 0;
      }
    }
  }
</style>