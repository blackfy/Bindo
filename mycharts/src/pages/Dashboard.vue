<template>
  <div class="flex-wrap">
    <slide-menus :drag-up="handleDragUp"/>
    <main ref="main">
      <p style="margin:20px 0;">
        <input ref="datasource" @change="handleFileUpload" class="data-souce" type="file" name="" accept=".xlsx, .xls" :auto-upload="false">
        <!-- <button @click="handleUploadData">Click to Upload data Source</button> -->
        <el-button size="small" type="primary" round @click="handleUploadData">Click to Upload data Source</el-button>
      </p>

      <h3 v-if="getCurStateInfo()" :class="getCurStateInfo().className">{{getCurStateInfo().text}}</h3>

      <div class="chart-wrap">
        <div v-for="chart in componentCharts" :key="chart.name" :style="{width: chart.width}" :class="[curViewName == chart.name?'shadow-box':'','chart-item']">
          <component v-bind="getChartBindData(chart.name)" :is="chart.name" @editViewProperty="handleEditViewProperty" />
        </div>
      </div>

      <!-- <div>
        <bar-chart v-on:editViewProperty="handleEditViewProperty"  style="width: 50%" />
      </div>
      
      <stacked-bar-chart />
      <full-stacked-bar-chart />
      
      
      <area-chart /> -->
      <!-- <hover-line-chart /> -->
      <!-- <div :class="curViewName == 'LineChart'?'shadow-box':''" style="width:50%;">
        <line-chart v-on:editViewProperty="handleEditViewProperty" v-bind="lineChartProperty"/>
      </div> -->
    </main>
    <div class="property">
      <view-property :properties="curViewPropertyFields" />
    </div>
  </div>
</template>
<script> 
import XLSX from 'js-xlsx'
import SlideMenus from '@/components/SlideMenus'
import PivoteTable from '@/components/PivoteTable'
import DoughnutChart from '@/components/DoughnutChart'
import PieChart from '@/components/PieChart'
import StackedBarChart from '@/components/StackedBarChart'
import LineChart from '@/components/LineChart'
import ViewProperty from '@/components/ViewProperty'
// import BarChart from '@/components/BarChart'
// import { cars } from '@/assets/cardata.js'

export default {
  name: "Dashboard",
  components:{
    SlideMenus,
    PivoteTable,
    DoughnutChart,
    PieChart,
    StackedBarChart,
    LineChart,
    ViewProperty
  },
  data(){
    return {
      curViewName: "",
      months: ['January','February','March','April','May', 'June','July','August','September','October','November','December'],
      chartDatas: [],
      componentCharts: {
        // PivoteTable: {
        //   name: 'PivoteTable',
        //   width: '100%'
        // },
        // PieChart: {
        //   name: 'PieChart',
        //   width: '50%'
        // },
        // LineChart: {
        //   name: 'LineChart',
        //   width: '100%'
        // }
        // StackedBarChart: {
        //   name: 'StackedBarChart',
        //   width: '50%'
        // }
      },
      isReadData: false,
      barProperties:{
        title: "属性",
        property: [
          {
            title: '标题',
            value: 'Sales Trend',
            placeholder: '请输入标题',
            type: 'input'
          },{
            title: '标题文字显示方向',
            value: 'horizontal',
            options: [
              {
                label: '水平方向',
                value: 'horizontal'
              },{
                label: '垂直方向',
                value: 'vertical'
              }
            ]
          },{
            title: '图例',
            value: 'BRAND',
            options: [
              {
                label: '品牌',
                value: 'BRAND'
              },{
                label: '类型',
                value: 'TYPE'
              }
            ]
          },{
            title: 'X轴'
          },{
            title: 'X轴数据',
            value: 1,
            options: [
              {
                label: 'Year',
                value: 0
              },{
                label: 'Month',
                value: 1
              }
            ]
          },{
            title: '显示X轴线和标记',
            type: 'inline-checkbox',
            value: true
          },{
            title: 'Y轴'
          },{
            title: 'Y轴数据',
            value: 'COUNT',
            options: [
              {
                label: 'Price',
                value: 'PRICE'
              },{
                label: 'Count',
                value: 'COUNT'
              },{
                label: 'Total',
                value: 'TOTAL'
              }
            ]
          },{
            title: '显示Y轴线和标记',
            type: 'inline-checkbox',
            value: true
          },{
            title: '图例项',
            value: true,
            options: [
              {
                label: '显示图例项',
                value: true
              },{
                label: '隐藏图例项',
                value: false
              }
            ]
          },{
            title: '数据标签',
            value: false,
            options: [
              {
                label: '显示数据标签',
                value: true
              },{
                label: '隐藏数据标签',
                value: false
              }
            ]
          },{
            title: '显示曲线中的圆点',
            type: 'inline-checkbox',
            value: true
          },
        ]
      },
      pieProperties:{
        title: "属性",
        property: [
          {
            title: '图例',
            value: 'BRAND',
            options: [
              {
                label: '品牌',
                value: 'BRAND'
              },{
                label: '类型',
                value: 'TYPE'
              },{
                label: '换档方式',
                value: 'TRANS'
              },{
                label: '颜色',
                value: 'COLOR'
              }
            ]
          },{
            title: '值',
            value: 0,
            options: [
              {
                label: '数量',
                field: 'COUNT',
                value: 0
              },{
                label: '价格',
                field: 'PRICE',
                value: 1,
                format: 'currency'
              },{
                label: '总价',
                field: 'TOTAL',
                value: 2,
                format: 'currency'
              }
            ]
          },
        ]
      },
      pivoteProperties: {
        title: "属性",
        property: [
          {
            title: 'Columns Fields',
            required: true,
            value: [1],
            multiple: true,
            options: [
              {
                dataField: 'DATE',
                dataType: 'date',
                groupInterval: 'year',
                area: 'column',
                label: 'Date.Year',
                value: 0
              },{
                dataField: 'DATE',
                dataType: 'date',
                groupInterval: 'month',
                area: 'column',
                label: 'Date.Month',
                value: 1
              },{
                dataField: 'DATE',
                dataType: 'date',
                groupInterval: 'quarter',
                area: 'column',
                label: 'Quarter',
                value: 2
              }
            ]
          },{
            title: 'Rows Fields',
            required: true,
            value: [0, 1, 2],
            multiple: true,
            options: [
              {
                caption: 'BRAND',
                dataField: 'BRAND',
                area: 'row',
                label: 'Brand',
                value: 0
              },{
                caption: 'TYPE',
                dataField: 'TYPE',
                area: 'row',
                label: 'Type',
                value: 1
              },{
                caption: 'NAME',
                dataField: 'NAME',
                area: 'row',
                label: 'Name',
                value: 2
              },{
                caption: 'TRANS',
                dataField: 'TRANS',
                area: 'row',
                label: 'Trans',
                value: 3
              }
            ]
          },{
            title: 'Data Fields',
            required: true,
            multiple: true,
            value: [0,1],
            options: [
              {
                caption: 'Count',
                dataField: 'COUNT',
                dataType: 'number',
                summaryType: 'sum',
                area: 'data',
                label: 'Count',
                value: 0
              },{
                caption: 'Price',
                dataField: 'PRICE',
                format: 'currency',
                dataType: 'number',
                summaryType: 'sum',
                area: 'data',
                label: 'Price',
                value: 1
              }
            ]
          },
        ]
      }
    }
  },
  computed: {
    curViewPropertyFields(){
      switch(this.curViewName){
        case "BarChart":
        case "LineChart":
          return this.barProperties
        break;
        case "PivoteTable":
          return this.pivoteProperties
        break;
        case "PieChart":
        case "DoughnutChart":
          return this.pieProperties
        break;
      }
      return {
        title: "属性",
        viewName: this.curViewName,
        property: [
        ]
      }
    },
    pivoteFields(){
      let { property } = this.pivoteProperties;
      let resultFields = [];
      property.forEach(item => {
        let values = item.value;
        if(values && values.length>0){
          values.forEach(index=>resultFields.push(item.options[index]))
        }else resultFields.push(...item.options)
      })
      return resultFields;
    }
  },
  methods: {
    getCurStateInfo(){
      if(!this.isReadData){
        return{
          text: '请先上传数据文件',
          className: ['warning']
        }
      }
      if(Object.keys(this.componentCharts).length == 0){
        return{
          text: '将左边图表托拽至中间,即可查看',
          className: ['success']
        }
      }
      return null
    },
    getChartBindData(chartName){
      let datas = this.chartDatas, len = datas.length, resultInfo = {}, property = null;
      console.log(datas,resultInfo,chartName)
      switch(chartName){
        case 'PivoteTable':
          return {
            data: this.chartDatas,
            fields: this.pivoteFields
          }
        break;
        case 'LineChart':{
          property = this.barProperties.property;
          let xField = property[4].options[property[4].value]//{laber:'Month',value:1}
          let valueField = property[7].value;//COUNT
          let legendField = property[2].value;//BRAND
          resultInfo = {}
          let legendFields = {};
          let xIndex = (xField.label=='Month'?1:0)
          console.log(resultInfo)
          for(let i=0;i<len;i++){
            let { BRAND, TYPE, NAME, MODEL, TRANS, COLOR, COUNT, PRICE, TOTAL, DATE } = datas[i];
            let key = DATE.split('/')[xIndex]
            let oldInfo = resultInfo[key];
             console.log(resultInfo[key])
            if(!oldInfo)oldInfo = {};

            let legendKey = datas[i][legendField]
            let oldVal = oldInfo[legendKey]
            // console.log(legendKey)
             console.log(oldInfo)
             console.log(oldVal)
            if(oldVal){
              oldVal += Number(datas[i][valueField])
            }else{
              oldVal = Number(datas[i][valueField])
            }
            if(!legendFields[legendKey]){
              legendFields[legendKey] = {
                value: legendKey,
                name: legendKey
              }
            }
            oldInfo[legendKey] = oldVal;
            resultInfo[key] = oldInfo;
          }
          console.log(resultInfo)
          console.log(Object.keys(resultInfo))
          console.log( Object.keys(resultInfo).map( key => Object.assign({}, resultInfo[key], { label: (xIndex==1?this.months[key - 1]:key) })),)
          return {
            title: property[0].value,
            titleAlignment: property[1].value,//标题显示方向
            xAxisVisible: property[5].value,
            yAxisVisible: property[8].value,
            legendVisible: property[property.length-3].value,
            onlineLabelVisible: property[property.length-2].value,
            onlineDotVisible: property[property.length-1].value,
            legendFields: Object.keys(legendFields).map( key => legendFields[key] ),
            data: Object.keys(resultInfo).map( key => Object.assign({}, resultInfo[key], { label: (xIndex==1?this.months[key - 1]:key) })),
            argumentField: 'label'
          }
        }
        break;
        case 'PieChart':
        case 'DoughnutChart':
          property = this.pieProperties.property;
          
          let argumentField = property[0].value, valueField = property[1].options[property[1].value]
          console.log(argumentField,valueField)
          for(let i=0;i<len;i++){
            let { BRAND, TYPE, NAME, MODEL, TRANS, COLOR, COUNT, PRICE, TOTAL, DATE } = datas[i];
            let key = datas[i][argumentField]
            let oldInfo = resultInfo[key]
            if(oldInfo){
              oldInfo = {
                BRAND,
                TYPE,
                TRANS,
                COLOR,
                COUNT: oldInfo.COUNT + Number(COUNT), 
                PRICE: oldInfo.PRICE + Number(PRICE),  
                TOTAL: oldInfo.TOTAL + Number(TOTAL)
              }
            }else{
              oldInfo = {
                BRAND,
                TYPE,
                TRANS,
                COLOR,
                COUNT: Number(COUNT), 
                PRICE: Number(COUNT),  
                TOTAL: Number(COUNT)
              }
            }
            resultInfo[key] = oldInfo
          }
          console.log(Object.keys(resultInfo).map( key => resultInfo[key]))
          console.log(argumentField)
          console.log(valueField.field,valueField.format)
          return {
            data: Object.keys(resultInfo).map( key => resultInfo[key]),
            argumentField,
            valueField: valueField.field,
            format: valueField.format
          }
        break;  
      }
      return {}
    },
    handleDragUp(info){
      console.log(info)
      if(!this.isReadData){
        this.$message({
          message: '请先上传数据文件',
          type: 'warning'
        });
        return;
      }
      let { x, width, type, vwidth } = info;
      console.log(this.$refs.main.offsetLeft)
      let {offsetLeft, offsetTop, offsetWidth, offsetHeight } = this.$refs.main;
      console.log(this.$refs.main)
      console.log(x,width,offsetLeft,offsetWidth)
      if(x>offsetLeft && (x+width)<(offsetLeft+offsetWidth)){
        console.log(this.componentCharts,this.componentCharts[type])
        this.componentCharts[type] = {
          name: type,
          width: vwidth
        }
        console.log(this.componentCharts,this.componentCharts[type])
        this.$nextTick(()=> this.$forceUpdate())
      }
    },
    handleEditViewProperty(viewName){
      this.curViewName = viewName;
    },
    readXLSData(file){
      return new Promise((resolve,reject) =>{
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          try {
            const workbook = XLSX.read(ev.target.result, { type: 'binary' });
            for (let sheet in workbook.Sheets) {
              this.chartDatas = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
              this.isReadData = true;
              return
            }
          } catch (e) {
            reject(e)
          }
        }
        fileReader.readAsBinaryString(file);
      });
    },
    async handleFileUpload(fileInfo){
      let file = this.$refs.datasource.files[0]
      let fileName = file.name.toLowerCase();
      let fileExt = fileName.split(/\w.(csv|xls|xlsx)$/)[1]
      try{
        switch(fileExt){
          case 'csv':
            this.readCSVData(file)
            break;
          case 'xls':
          case 'xlsx':
            this.readXLSData(file)
          break
        }
      }catch(e){
        console.log('Unsupport file',e )
      }
    },
    handleUploadData(){
      this.$refs.datasource.click()
    }
  },
}
</script>

<style lang="scss" scope>
  .flex-wrap{
    display: flex;
    max-width: 100vw;
    overflow: hidden;
    main{
      flex: 1;
      margin: 0 20px;
      
      .data-souce{
        display: none;
      }
    }
  }
  .model-title{
    position: relative;
    span{
      margin-left: 10px;
    }
  }
  .row-line{
    position: absolute;
    height: 1px;
    background: #CCC;
    top: 50%;
    width: 30px;
    left: 15px;
    z-index: 0;
  }
  main{
    max-width: calc(100vw - 160px - 40px - 250px);
    width: calc(100vw - 160px - 40px - 250px);
  }
  .property{
    min-height: 100vh;
    width: 250px;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      width: 0.5px;
      background: #ddd;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  .shadow-box{
    box-shadow: 0 0 10px 1px #63868c;
  }
  .chart-wrap{
    display: flex;
    flex-wrap: wrap;
    .chart-item{
      margin-bottom: 30px;
    }
  }
</style>