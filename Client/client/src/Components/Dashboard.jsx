import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import "../Styles/Dashboard.css";
import Layout from "./Layout";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";
import { DatePicker } from "antd";
const { MonthPicker, RangePicker } = DatePicker;

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [frequency, setFrequency] = useState("all");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, SetType] = useState("all");
  const [editableRow, setEditableRow] = useState([]);

  const handleEdit = (record) => {
    setEditableRow(record.key);
  };

  const handleSave = async (record) => {
    console.log(record);
    try {
      const updatedTransaction = { ...record };
      setLoading(true);

      // Make PUT request to update transaction
      await axios
        .put(
          `http://localhost:3000/updateTransaction/${record._id}`,
          updatedTransaction
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
          message.success("Transaction updated successfully");
          setEditableRow(null);
          handleNewData();
        });
    } catch (error) {
      setLoading(false);
      // message.error("Failed to update the transaction");
      console.error(error, "Failed to update the transaction");
    }
  };
  // table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) =>
        editableRow === record.key ? (
          <DatePicker
            defaultValue={moment(text)}
            onChange={(value) => (record.date = value)}
          />
        ) : (
          <span>{moment(text).format("YYYY-MM-DD")}</span>
        ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) =>
        editableRow === record.key ? (
          <Input
            defaultValue={text}
            onChange={(e) => (record.amount = e.target.value)}
          />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) =>
        editableRow === record.key ? (
          <Select
            defaultValue={text}
            onChange={(value) => (record.type = value)}
          >
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) =>
        editableRow === record.key ? (
          <Input
            defaultValue={text}
            onChange={(e) => (record.category = e.target.value)}
          />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) =>
        editableRow === record.key ? (
          <Input
            defaultValue={text}
            onChange={(e) => (record.reference = e.target.value)}
          />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) =>
        editableRow === record.key ? (
          <button onClick={() => handleSave(record)}>Save</button>
        ) : (
          <button
            onClick={() => {
              console.log(record);
              handleEdit(record);
            }}
          >
            Edit
          </button>
        ),
    },
  ];

  const handleNewData = async () => {
    try {
      const user = localStorage.getItem("id");
      const res = await axios.get(
        `http://localhost:3000/getTransaction/${user}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleNewData();
  }, []);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  let filteredData = [];

  if (frequency === "all") {
    filteredData = transactions;
  } else if (frequency === "7") {
    filteredData = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const daysDifference = Math.ceil(
        (new Date() - transactionDate) / (1000 * 60 * 60 * 24)
      );
      return daysDifference <= 7;
    });
  } else if (frequency === "30") {
    filteredData = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      const monthDifference =
        today.getMonth() +
        1 -
        transactionDate.getMonth() +
        12 * (today.getFullYear() - transactionDate.getFullYear());
      return monthDifference <= 1;
    });
  } else if (frequency === "365") {
    filteredData = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      const yearDifference =
        today.getFullYear() - transactionDate.getFullYear();
      return yearDifference <= 1;
    });
  }

  useEffect(() => {
    if (frequency === "custom" && selectedDate.length === 2) {
      const startDate = selectedDate[0];
      const endDate = selectedDate[1];

      filteredData = transactions.filter((transaction) => {
        const transactionDate = moment(transaction.date);
        return transactionDate.isBetween(startDate, endDate, null, "[]");
      });
    } else {
      // Apply other frequency-based filtering logic here...
      if (frequency === "all") {
        filteredData = transactions;
      } else if (frequency === "7") {
        // Filtering for last 7 days
      } else if (frequency === "30") {
        // Filtering for last 30 days
      } else if (frequency === "365") {
        // Filtering for last 365 days
      }
    }
  }, [frequency, selectedDate]);

  const handleSubmit = async (values) => {
    try {
      const user = localStorage.getItem("id");
      setLoading(true);

      // Save to MongoDB
      await axios
        .post("http://localhost:3000/addTransaction", {
          data: values,
          id: user,
        })
        .then((res) => {
          console.log(res);

          setLoading(false);

          // Update state with new transaction
          const newTransaction = { ...values, userid: user._id };
          setTransactions([...transactions, newTransaction]);

          // Save to localStorage
          localStorage.setItem(
            "transactions",
            JSON.stringify([...transactions, newTransaction])
          );

          message.success("Transaction Added successfully");
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err, "Found the error");
        });
    } catch (error) {
      setLoading(false);
      message.error("Failed to add the transaction");
      console.error(error);
    }
  };
  // useEffect(() => {
  //   handleSubmit();
  // }, []);

  return (
    <Layout>
      <div className="filters">
        <div>
          <h4>Select Frequency</h4>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="all">All Data</Select.Option>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {/* {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>} */}
        </div>

        <div>
          <button className="addnewtrans" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        <Table columns={columns} dataSource={filteredData} />
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
