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
