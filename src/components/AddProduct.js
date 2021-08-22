import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox,Radio, Select } from 'antd';
import { equals, toLower, map } from 'ramda';
import { LAPTOPS } from '../redux/actions/ActionTypes';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
};

const laptopCategories=[{name: "Lenovo", value: "lenovo"},{ name:"Dell", value: "dell"},{name: "Others", value: "others"}];
const mobileCategories=[{name: "Samsung", value: "samsung"},{ name:"Oppo", value: "oppo"},{name: "Others", value: "others"}];

const AddProduct = props => {
    const { type,onCancel, mode, onProduct, editInfo } = props;
    const category=equals(type,LAPTOPS) ? laptopCategories : mobileCategories;
  const [form] = Form.useForm();
  useEffect(()=>{
      console.log("ee",editInfo, mode)
      if(equals(mode, 'edit')){
        form.setFieldsValue({ ...editInfo})
      }else{
        form.setFieldsValue({ type: toLower(type) })
      }
  },[type,mode, form, editInfo])

 const onSaveInfo=()=>{
    form.validateFields()
    .then(values => {
        onProduct({...values, price: values.price}, mode)
    })
    .catch(errorInfo => {
      console.log(errorInfo)
    });
  } 

  return (
    <Form form={form} name="AddProduct">
      <Form.Item
        {...formItemLayout}
        name="name"
        label="name"
        rules={[
          {
            required: true,
            message: 'Please enter product name',
          },
        ]}
      >
        <Input placeholder="Please enter product name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please enter description',
          },
        ]}
      >
        <Input.TextArea placeholder="Please enter description" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="type"
        label="Type"
        rules={[
          {
            required: true,
            message: 'Please select type',
          },
        ]}
      >
       <Radio.Group disabled name="radiogroup">
         <Radio value={"laptops"}>Laptops</Radio>
         <Radio value={"mobiles"}>Mobiles</Radio>
    </Radio.Group>
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="category"
        label="Category"
        rules={[
          {
            required: true,
            message: 'Please select category',
          },
        ]}
      >
        <Select placeholder="Please select category">
            {
                map(value=><Option value={value.value} >{value.name}</Option>, category)
            }
        </Select>
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="price"
        label="Price"
        rules={[
          {
            required: true,
            message: 'Please enter price',
          },
        ]}
      >
        <Input placeholder="Please enterprice" />
      </Form.Item>
      <Form.Item>
          <div>
              <span><Button onClick={onSaveInfo} type="primary">{equals(mode, "edit") ? "Update" : "Save"}</Button></span>
              <span style={{ marginLeft: 10 }}><Button onClick={onCancel}>Cancel</Button></span>
              </div>
      </Form.Item>
    </Form>
  );
};
export default AddProduct;