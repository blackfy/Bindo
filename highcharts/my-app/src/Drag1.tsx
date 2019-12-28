import React from 'react';

class Drag1 extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={x:0,y:0}
    }
    fn(ev: { pageX: number; pageY: number; }){
        var disx=ev.pageX-this.state.x
        var disy=ev.pageY-this.state.y

        var _this=this
        document.onmousemove=function(ev){
            _this.setState({
                x:ev.pageX-disx,
                y:ev.pageY-disy
            })
        }
        document.onmouseup=function(){
            document.onmousemove=null
            document.onmousedown=null
        }
    }
    render(){
        return <div className="box" style={{left:this.state.x+'px',top:this.state.y+'px'
    ,width:'100px',height:'100px',backgroundColor:'green',position:'absolute'}} onMouseDown={this.fn.bind(this)}></div>
    }
}
export default Drag1;