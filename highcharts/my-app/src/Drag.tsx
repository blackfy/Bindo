import React from 'react';
import { getStyle } from 'highcharts';
// import { getStyle } from 'highcharts';

class Drag extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state={
            x:0,
            y:0
        }
    }
    fnDown(e:any){
        console.log(1)
        console.log(e.target)
        let nDom=e.target.cloneNode()
        let event=e||window.event;
        let target=event.target||event.srcElement;
        let disX=event.clientX-this.state.x
        let disY=event.clientY-this.state.y;
        nDom.style.position="absolute";
        nDom.style.left = (e.clientX - disX) + "px";
        nDom.style.top =  (e.clientY - disY)  + "px";
        nDom.style.zIndex="99999"
        nDom.style.width= getStyle(e.target,'width')
        nDom.style.height= getStyle(e.target,'height')
        document.body.appendChild(nDom)
        document.onmousemove=(e:any)=>{
            console.log(2)
            let event=e||window.event;
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            nDom.style.left = left + "px";
            nDom.style.top = top + "px";
            // let target=event.target||event.srcElement;
            // this.setState({
            //     x:event.clientX-disX,
            //     y:event.clientY-disY
            // })
        }
        document.onmouseup=function(){
            console.log(target)
            document.onmousemove=null
            document.onmouseup=null
            document.body.removeChild(nDom)  
            nDom=null   
        }
    }
    render(){
        return(
            <div id='parent'>
            <div style={{width:this.props.style.width,height:this.props.style.height,
            backgroundColor:this.props.style.backgroundColor,position:this.props.style.position,
          }} onMouseDown={this.fnDown.bind(this)}>
            </div>
            </div>
        )
    }
}
export default Drag