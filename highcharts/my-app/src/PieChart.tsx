import * as React from 'react';
// import * as ReactDom from 'react-dom';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import data from './assets/textData'

class MyApp extends React.Component<any,any>{
    constructor(props: any){
        super(props)
        this.state={
            data:this.props.data,
            name:'PieChart',
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
        // this.getChartBindData=this.getChartBindData.bind(this)
    }
    render(){
        const options: Highcharts.Options = {
            title: {
                text: 'My chart'
            },
            series: [{
                type: 'pie',
                data: this.props.showData
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
            <div onClick={this.props.getCharts.bind(this, this.state.name)}>
                <PieChart onClick={this.props.getCharts.bind(this, this.state.name)} /> 
            </div>
        )
    }
}
export default MyApp