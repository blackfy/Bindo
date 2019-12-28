import React from 'react';
import SlideMenus from './SlideMenus';
import './App.css';
import { Button , message } from 'antd';
import 'antd/dist/antd.css';
// import * as XLSX from 'xlsx';
import PieChart from './PieChart'
import data from './assets/textData'
import ViewProperty from './ViewProperty'

function GetUserInfo(){
  return (
    <h3 style={{color:"#28a745"}}>将左边图表托拽至中间,即可查看</h3>
  )
}
function UnUserInfo(){
  return (
    <h3 style={{color:"#ffc107"}}>请先上传数据文件</h3>
  )
}
class App extends React.Component<any,any>{
  constructor(props: any){
    super(props)
    this.state={
      months: ['January','February','March','April','May', 'June','July','August','September','October','November','December'],
      curViewName:"",
      chartDatas:[],
      showData:[],
      componentCharts:[],
      isReadData:false,
      // showChart:false,
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
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleUploadData = this.handleUploadData.bind(this);
    this.showProperty = this.showProperty.bind(this)
    this.getChartBindData = this.getChartBindData.bind(this);
    // this.getCurStateInfo = this.getCurStateInfo.bind(this)
    // this.readXLSData=this.readXLSData.bind(this)
  }
  getChartBindData(){
    let datas=this.state.chartDatas
    let len=datas.length
    let resultInfo:any = {}
    let property = this.state.pieProperties.property
    let argumentField = property[0].value //品牌
    let valueField = property[1].options[property[1].value]
    for(let i=0;i<len;i++){
      let { BRAND, TYPE, NAME, MODEL, TRANS, COLOR, COUNT, PRICE, TOTAL, DATE } = datas[i];
      console.log(datas)
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
    console.log(valueField.field)
    console.log(valueField.format)
    let filterData=[]
    let data=Object.keys(resultInfo).map( key => resultInfo[key])
    for (let i=0;i<data.length;i++){
        let obj={
            name:data[i].BRAND,
            y:data[i].COUNT
        }
        filterData.push(obj)
    }
    this.setState({
        showData:filterData
    })
}
  handleFileUpload(){
    if(data){
      this.setState({
        isReadData:true,
        chartDatas:data
      })
    }
    return
  }
  handleUploadData(){
    this.handleFileUpload();
  }
  getChartInfo=(chartName: any,vwidth: any,icon:any,msg:any)=>{
    if(!this.state.isReadData){
      message.error('请先上传数据文件');
      return;
    }
    let type=chartName, width=msg.width, x=msg.x, vWidth=vwidth
    let main:any=this.refs.main;
    let offsetLeft=main.offsetLeft;
    let offsetWidth=main.offsetWidth;
    // let {offsetLeft, offsetTop, offsetWidth, offsetHeight } = this.refs.main;
    if(x>offsetLeft && (x+width)<(offsetLeft+offsetWidth)){
      this.state.componentCharts.push({
        name:type,
        width:vWidth
      })
      console.log(this.state.componentCharts)
      this.forceUpdate();
    }
    console.log(this.state.componentCharts)
    this.getChartBindData()
  }
  getCharts(name:string){
    this.setState({
      curViewName:name
    })
  }
  showProperty(){
    let curViewName=this.state.curViewName
    switch(curViewName){
      case "PieChart":
          return this.state.pieProperties
          default:
            break;
    }
  }
  render() {
    const isReadData=this.state.isReadData;
    const componentCharts=this.state.componentCharts
    let fileData=this.state.chartDatas
    let showText;
    let curViewName=this.state.curViewName;
    let showData=this.state.showData
    if(isReadData){
      showText= <GetUserInfo /> 
    } else {
      showText= <UnUserInfo />
    }
    return (
      <div className="flex-wrap">
        <SlideMenus getChartName={this.getChartInfo.bind(this)}/>
        <main ref="main">
          <p style={{margin:"20px 0"}}>
            <input className="data-souce" accept=".xlsx, .xls" onChange={this.handleFileUpload} type="file"/>
            <Button type="primary" onClick={this.handleUploadData}>Click to Upload data Source</Button>
          </p>
          {showText}
          <ul>
            {
              componentCharts.map((item: any,index:any)=>
                <div className="chart-wrap" key={index}>
                  <div key={index} style={{width: item.width}} className={curViewName === item.name?'shadow-box':''}>
                    {item.name==="PieChart"?<PieChart data={fileData} showData={showData} getCharts={this.getCharts.bind(this)}/>:null} 
                  </div>
                </div>
              )
            }
          </ul>
        </main>
        <div className="property">
          <ViewProperty showProperty={this.showProperty()}/>
        </div>
      </div>
    )
  };
}

export default App;
