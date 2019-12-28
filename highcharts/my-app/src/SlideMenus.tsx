import React from 'react';
import './SlideMenus.css'

// interface IProps{
//     getChartName?:any
// }
// interface IState {
//     lg?: any 
//   }
class SlideMenus extends React.Component<any,any>{
    constructor(props :any){
        super(props);
        this.state={
            domX:0,
            domY:0,
            msg:{},
            chartOptions:[
                {
                    title:'Line Chart',
                    charts:[
                        {
                            type:'LineChart',
                            vwidth:'100%',
                            icon:  require('./assets/images/LineCharts.svg')
                        }
                    ]
                },
                {
                    title:'Pie Chart',
                    charts:[
                        {
                            type:'PieChart',
                            vwidth:'50%',
                            icon: require('./assets/images/PieCharts.svg')
                        },
                        {
                            type: 'DoughnutChart',
                            vwidth: '50%',
                            icon: require('./assets/images/DoughnutCharts.svg')
                        }
                    ]
                },
                {
                    title:'Pivot Table',
                    charts:[
                        {
                            type: 'PivoteTable',
                            vwidth: '100%',
                            icon: require('./assets/images/PivotGrid.svg')
                        }
                    ]
                }
            ]
        }
    }
    fnDown = (chart:any, e:any) => {
        let nDom=e.target.cloneNode()
        let event=e||window.event;
        let target=event.target||event.srcElement;
        let disX=event.clientX-target.offsetLeft
        let disY=event.clientY-target.offsetTop;
        nDom.className='drag_box'
        nDom.style.width='30px';
        nDom.style.height='30px'
        nDom.style.position="absolute";
        nDom.style.left = (e.clientX - disX) + "px";
        nDom.style.top =  (e.clientY - disY)  + "px";
        nDom.style.zIndex="99999"
        document.body.appendChild(nDom)
        document.onmousemove=(e:any)=>{
            let event=e||window.event;
            let left = event.clientX - disX;
            let top = event.clientY - disY;
            nDom.style.left = left + "px";
            nDom.style.top = top + "px";
            // let target=event.target||event.srcElement;
            // this.setState({
            //     x:event.clientX-disX,
            //     y:event.clientY-disY
            // })
        }
        document.onmouseup=()=>{
            console.log(nDom.style)
            this.setState({
                msg:{
                    width: parseFloat(nDom.style.width),
                    height: parseFloat(nDom.style.width),
                    x: parseFloat(nDom.style.left),
                    y: parseFloat(nDom.style.top)
                }
            })
            console.log(this.state.msg)
            document.onmousemove=null
            document.onmouseup=null
            document.body.removeChild(nDom)  
            nDom=null;
            this.props.getChartName(chart.type,chart.vwidth,chart.icon,this.state.msg) 
        }
    }
    render(){
        const chartOptions=this.state.chartOptions
        return (
            <div className="slide-wrap">
                <p className="slide-title"><span style={{color:"red"}}>*</span>Chart Type</p>
                {chartOptions.map((chartItem:any)=>(
                    <div key={chartItem.title}>
                        <p>{chartItem.title}</p>
                        <ul>
                            {chartItem.charts.map((chart:any,index:any)=>(
                                <li className="line-item" key={chart.title + '_' + index} 
                                style={{backgroundImage: 'url('+chart.icon+')', backgroundSize: '100%',
                                position:'relative'}}
                                // onClick={()=>{this.props.getChartName(chart.type,chart.vwidth,chart.icon)}}
                                onMouseDown={this.fnDown.bind(this,chart)}
                                ></li>
                            ))}
                        </ul>
                    </div>)
                )}
            </div>
        )
    }
}
export default SlideMenus;