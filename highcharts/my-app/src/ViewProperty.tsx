import React from 'react';
import './ViewProperty.css'
import { Checkbox, Select} from 'antd';

class ViewProperty extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={}
    }
    handleChange(value:string) {
        console.log(`selected ${value}`);
      }
    render(){
        const { Option } = Select;
        const properties=this.props.showProperty
        console.log(properties)
        return (
            <div className="peropty-wrap">
                <p className="peropty-title">
                    <span style={{fontSize:"20px",fontWeight:"bold"}}>属性</span>
                </p>
                <div className="peropty-item">
                    {properties && properties.property &&
                        <ul>
                            <li>
                                {properties.property.map((property:any,index:any)=>
                                <div key={index}>
                                    <div className={`${property.required?'required-field':''}${'title'}`}>
                                        {
                                            property.type ==='inline-checkbox' ? <Checkbox checked={property.value}>{property.title}</Checkbox>
                                            :<div>{property.title}</div>
                                        }
                                    </div>
                                    <div>
                                        {
                                            Array.isArray(property.options)&&
                                            <Select defaultValue={property.options[0].label} style={{ width: "120px" }} onChange={this.handleChange.bind(this)}>
                                                {
                                                    property.options.map((item: any,index:any)=>
                                                        <Option key={index} value={item.value}>{item.label}</Option>
                                                    )
                                                }
                                            </Select>
                                        }
                                    </div>
                                    <div>
                                        {/* {
                                            property.type == 'input'?
                                        } */}
                                    </div>
                                </div>
                                )}
                            </li>
                        </ul>}
                    <div>
                        {
                            (!properties || !properties.property || !properties.property.length)&&
                            <h4>请先选择图表</h4>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewProperty