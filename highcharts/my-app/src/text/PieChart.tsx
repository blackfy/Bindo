import * as React from 'react';
// import * as ReactDom from 'react-dom';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import data from '../assets/textData'

class MyApp extends React.Component<any,any>{
    constructor(props: any){
        super(props)
        this.state={
            data:data,
            months: ['January','February','March','April','May', 'June','July','August','September','October','November','December'],
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
            showData:[]
        }
        this.getChartBindData=this.getChartBindData.bind(this)
    }
    getChartBindData(){
        let datas=this.state.data
        let len=datas.length
        let resultInfo:any = {}
        let property = this.state.pieProperties.property;
        let argumentField = property[0].value 
        let valueField = property[1].options[property[1].value]
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
        console.log(argumentField)
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
    render(){
        const options: Highcharts.Options = {
            title: {
                text: 'My chart'
            },
            series: [{
                type: 'pie',
                data: this.state.showData
            }]
        }
        const PieChart = (props: HighchartsReact.Props) => <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                {...props}
            />
        </div>
        
        return (
            <div onClick={this.getChartBindData}>
                <PieChart /> 
            </div>
        )
    }
}
export default MyApp