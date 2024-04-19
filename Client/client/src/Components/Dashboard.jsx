import React, { useState } from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import axios from 'axios';
import "../Styles/Dashboard.css"
import Layout from './Layout';
import FormItem from 'antd/es/form/FormItem';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = localStorage.getItem('user');
      console.log(user)
      // Save to MongoDB
      setLoading(true);
      await axios.post('http://localhost:3000/add-transaction', {data : values , email : user})
        .then((res)=>{
          setLoading(false);
      
      // Save to localStorage
          const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
          const newTransaction = { ...values, userid: user._id };
          localStorage.setItem('transactions', JSON.stringify([...transactions, newTransaction]));
          
          message.success('Transaction Added successfully');
          setShowModal(false);
        })
      
    } catch (error) {
      setLoading(false);
      message.error('Failed to add the transaction');
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="filters">
        <div>range filters</div>

        <div>
          <button className="addnewtrans" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>

      <div className="content"></div>

      <Modal title="Add Transaction" open={showModal} onCancel={() => setShowModal(false)} footer={null}>
        
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <FormItem label="Type" name="type">
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </FormItem>
          <FormItem label='Category' name='category'>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='tax'>TAX</Select.Option>
            </Select>
          </FormItem>

          <FormItem label='Date' name='date'>
            <Input type='date'/>
          </FormItem>
          <FormItem label='Reference' name='reference'>
            <Input type='text'/>
          </FormItem>
          <FormItem label='Description' name='description'>
            <Input type='text'/>
          </FormItem>

          <div className="d-flex">
            <button type='submit' className='save' >SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
}

export default Dashboard;
