import React, { Component } from 'react'
import { connect } from 'react-redux';
import { equals, isEmpty, toLower, toUpper, map, pluck, max, reduce, any, findIndex, propEq } from 'ramda';
import { Tooltip, Breadcrumb, Button, Modal, Popover, Popconfirm } from 'antd';
import { MoreOutlined  } from '@ant-design/icons';

import { product } from '../redux/actions/index';
import AddProduct from './AddProduct';
import { LAPTOPS, MOBILES } from '../redux/actions/ActionTypes';

class DisplayDevices extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            editInfo:{},
            visible: false,
            overVisible: false,
        }
    }
    componentDidMount(){
        const { laptops, mobiles, type, category } = this.props;
        if(equals(type, LAPTOPS)){
            this.filterData(laptops);
        }else{
            this.filterData(mobiles);
        }
    }

     filterData=(data=[])=>{
         const { category } = this.props;
            const info=[];
            data && map(value=>{
                if(!any(equals(category), ['all', 'All'])&& equals(category,value.category)){
                    info.push(value)
                }else if(any(equals(category), ['all', 'All'])){
                    info.push(value)
                }
            }, data)
            this.setState({ data: info });
        
     }
    
    onCancel=()=>{
        this.setState({ visible: false, editInfo: {} });
    }

    onOpenModal=(e,editInfo={})=>{
        this.setState({ editInfo, visible: true, overVisible: false });
    }

    onSaveInfo=(data,mode)=>{
        const { type,product,laptops, mobiles } = this.props;
        const { editInfo } = this.state;
        let requiredType="";
        let info=[];
        let maxVal=0;
        if(equals(type,LAPTOPS)){
            const avaibleKeys=pluck("key", laptops);
            maxVal=reduce(max, 0, avaibleKeys)
            requiredType=LAPTOPS;
            if(equals(mode,"edit")){
                const laptopsDetails=[...laptops];
                const index = findIndex(propEq('key', editInfo.key))(laptopsDetails);
                if(index>-1){
                    laptopsDetails[index]={ ...data, key:editInfo.key};
                }
                console.log(data, index);
                info=[...laptopsDetails];
            }else {
            info=[...laptops, {...data, key: maxVal + 1}];
            }
        }else{
            const avaibleKeys=pluck("key", mobiles);
            maxVal=reduce(max, 0, avaibleKeys)
            requiredType=MOBILES;
            if(equals(mode,"edit")){
                const mobilesData=[...mobiles];
                const index = findIndex(propEq('key', editInfo.key))(mobilesData);
                if(index>-1){
                    mobilesData[index]={ ...data, key:editInfo.key};
                }
                info=[...mobilesData];
            }else {
            info=[...mobiles, {...data, key: maxVal + 1}];
            }
        }
        product(requiredType,info);
        this.filterData(info);
        this.onCancel();
    }
    
    handleVisibleChange = overVisible => {
        this.setState({ overVisible });
      }; 

      confirm=key=>{
        const { type,product,laptops, mobiles } = this.props;
        let requiredType="";
        let info=[];
        if(equals(type,LAPTOPS)){
            requiredType=LAPTOPS;
            const laptopsDetails=[...laptops];
            const index = findIndex(propEq('key', key))(laptopsDetails);
            laptopsDetails.splice(index,1);
            info=[...laptopsDetails];
        }else{
            const mobilesDetails=[...mobiles];
            const index = findIndex(propEq('key', key))(mobilesDetails);
            mobilesDetails.splice(index,1);
            info=[...mobilesDetails];
        }
        product(requiredType,info);
        this.filterData(info);
      }
    

    render() {
        const { type, category } = this.props;
        const { data, editInfo, visible } = this.state;
        return (
            <div>
                <Modal
						destroyOnClose
                        footer={false}
						maskClosable={false}
						title={isEmpty(editInfo) ? "Add Product" : "Edit Product"}
						visible={visible}
                        // onOk={this.saveUpdate}
						onCancel={this.onCancel}
					>
                        <AddProduct editInfo={editInfo} onProduct={this.onSaveInfo} type={type} mode={isEmpty(editInfo)? "add" : "edit"} onCancel={this.onCancel} />
					</Modal>
                <span>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{type}</Breadcrumb.Item>
              <Breadcrumb.Item>{toUpper(category)}</Breadcrumb.Item>
            </Breadcrumb>
            </span>
            <span className="add-product"><Button onClick={this.onOpenModal} type="primary">Add</Button></span>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {isEmpty(data)&& <div>No {toLower(type)} avaible.</div> }
                {data && data.map((item,index)=>{
                        return (
                            <>
                            <div className="item">
                            <h4>{toUpper(category)}</h4>
                             <p><b>Name: </b>{item.name}</p>
                             <p className="text-truncate"><b>Description: </b><Tooltip title={item.description}>{item.description}</Tooltip></p>
                             <p><b>Price: </b>{item.price}</p>
                             <span style={{ float: 'right' }}>
                                <Popover
                                placement="leftTop"
                                 content={<div>
                                     <p><span style={{ cursor: "pointer" }} onClick={e=>this.onOpenModal(e,item)}>Edit</span></p>
                                     <p>
                                     <Popconfirm
                                        title="Are you sure to delete this product?"
                                        onConfirm={()=>this.confirm(item.key)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                         <span style={{ cursor: "pointer" }} >Delete</span>
                                    </Popconfirm>
                                    </p>
                                    </div>}
                                 trigger="click"
                                >
                                 <MoreOutlined style={{ fontSize: 18 }} />
                                 </Popover>
                            </span>
                            </div>
                            </>
                        );
                    })
                    }
            </div>
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        laptops: state.laptops,
        mobiles: state.mobiles
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        product:(type,data)=>dispatch(product(type,data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayDevices);
