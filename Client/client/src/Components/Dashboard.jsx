import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import "../Styles/Dashboard.css";
import Layout from "./Layout";
import FormItem from "antd/es/form/FormItem";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [Frequency,setFrequency] = useState('7')

  
  // table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Actions',
      // Add action buttons here if needed
    }
  ];
  
  useEffect(() => {
   try{
   axios.get(`http://localhost:3000/getTransaction/${localStorage.getItem("id")}`)
    .then((res) =>{
      console.log(res.data)
      setTransactions(res.data)
    })
   }
   catch(err){
    console.error(err)
   }
  }, []);

 

  const handleSubmit = async (values) => {
    try {
      const user = localStorage.getItem("id");
      setLoading(true);

      // Save to MongoDB
      await axios.post("http://localhost:3000/addTransaction", {
        data: values,
        email: user,
      })
      .then((res)=>{
        console.log(res)
        
        setLoading(false);
        
      // Update state with new transaction
      const newTransaction = { ...values, userid: user._id };
      setTransactions([...transactions, newTransaction]);

      
      // Save to localStorage
      localStorage.setItem("transactions", JSON.stringify([...transactions, newTransaction]));
      
      message.success("Transaction Added successfully");
      setShowModal(false);
    })
    .catch((err)=>{
      console.log(err , "Error mil gaya")
    })
    } catch (error) {
      setLoading(false);
      message.error("Failed to add the transaction");
      console.error(error);
    }
  };
  useEffect(()=>{
    handleSubmit()
  },[Frequency])

  return (
    <Layout>
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={Frequency} onChange={(value)=>setFrequency(value)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value='30'>Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
        </div>

        <div>
          <button className="addnewtrans" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        <Table columns={columns} dataSource={transactions} />
      </div>

      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <FormItem label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </FormItem>
          <FormItem label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </FormItem>

          <FormItem label="Date" name="date">
            <Input type="date" />
          </FormItem>
          <FormItem label="Reference" name="reference">
            <Input type="text" />
          </FormItem>
          <FormItem label="Description" name="description">
            <Input type="text" />
          </FormItem>

          <div className="d-flex">
            <button type="submit" className="save">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
}

export default Dashboard;
