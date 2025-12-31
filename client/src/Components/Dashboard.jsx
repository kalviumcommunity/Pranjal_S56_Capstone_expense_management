import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import Layout from "./Layout";
import moment from "moment";
import { DatePicker } from "antd";
const { MonthPicker, RangePicker } = DatePicker;
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaChartArea } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import API_URL from "../config";
import { BiSolidSave } from "react-icons/bi";
import Analytics from "./Analytics";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [frequency, setFrequency] = useState("all");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [editableRow, setEditableRow] = useState(null);
  const [activeList, setActiveList] = useState(true);
  const [activeComponent, setActiveComponent] = useState("table");
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setEditableRow(record.key);
  };

  const handleSave = async (record) => {
    try {
      const updatedTransaction = { ...record };
      setLoading(true);

      // Make PUT request to update transaction
      await axios.put(
        `${API_URL}/updateTransaction/${record._id}`,
        updatedTransaction
      );
      setLoading(false);
      message.success("Transaction updated successfully");
      setEditableRow(null);
      handleNewData();
    } catch (error) {
      setLoading(false);
      message.error("Failed to update the transaction");
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this transaction?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        confirmDelete(record);
      },
    });
  };

  const confirmDelete = async (record) => {
    try {
      setLoading(true);
      // Make DELETE request to delete transaction
      await axios.delete(
        `${API_URL}/deleteTransaction/${record._id}`
      );
      setLoading(false);
      message.success("Transaction deleted successfully");
      handleNewData();
    } catch (error) {
      setLoading(false);
      message.error("Failed to delete the transaction");
    }
  };

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
      title: "Description",
      dataIndex: "description",
      render: (text, record) =>
        editableRow === record.key ? (
          <Input
            defaultValue={text}
            onChange={(e) => (record.description = e.target.value)}
          />
        ) : (
          <span style={{ display: "block", width: "200px" }}>{text}</span>
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <span className="flex items-center space-x-2">
          {editableRow === record.key ? (
            <button
              onClick={() => handleSave(record)}
              className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-all duration-300"
            >
              <BiSolidSave size={20} />
            </button>
          ) : (
            <button
              onClick={() => handleEdit(record)}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
            >
              <MdModeEditOutline size={20} />
            </button>
          )}
          <button
            onClick={() => handleDelete(record)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
          >
            <MdDelete size={20} />
          </button>
        </span>
      ),
    },
  ];

  const handleNewData = async () => {
    try {
      const user = localStorage.getItem("id");
      const res = await axios.get(
        `${API_URL}/getTransaction/${user}`
      );
      setTransactions(res.data);
    } catch (err) {
      message.error("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    handleNewData();
  }, []);

  let filteredData = [...transactions];

  if (type !== "all") {
    filteredData = filteredData.filter(
      (transaction) => transaction.type === type
    );
  }

  if (frequency === "custom" && selectedDate.length === 2) {
    const startDate = selectedDate[0];
    const endDate = selectedDate[1];

    filteredData = transactions.filter((transaction) => {
      const transactionDate = moment(transaction.date);
      return transactionDate.isBetween(startDate, endDate, null, "[]");
    });
  } else if (frequency === "7") {
    const oneWeekAgo = moment().subtract(7, "days").toDate();
    filteredData = transactions.filter((transaction) =>
      moment(transaction.date).isAfter(oneWeekAgo)
    );
  } else if (frequency === "30") {
    const oneMonthAgo = moment().subtract(1, "months").toDate();
    filteredData = transactions.filter((transaction) =>
      moment(transaction.date).isAfter(oneMonthAgo)
    );
  } else if (frequency === "365") {
    const oneYearAgo = moment().subtract(1, "years").toDate();
    filteredData = transactions.filter((transaction) =>
      moment(transaction.date).isAfter(oneYearAgo)
    );
  }

  const handleSubmit = async (values) => {
    try {
      const user = localStorage.getItem("id");
      setLoading(true);

      // Save to MongoDB
      await axios.post(`${API_URL}/addTransaction`, {
        data: values,
        id: user,
      });
      setLoading(false);

      message.success("Transaction Added successfully");
      setShowModal(false);
      form.resetFields();
      handleNewData();
    } catch (error) {
      setLoading(false);
      message.error("Failed to add the transaction");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Header Section with Title */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Overview of your financial transactions and analytics.</p>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Frequency Filter */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Select Frequency</h4>
                <Select
                  value={frequency}
                  onChange={(value) => setFrequency(value)}
                  className="w-40"
                >
                  <Select.Option value="all">All Data</Select.Option>
                  <Select.Option value="7">Last 1 Week</Select.Option>
                  <Select.Option value="30">Last 1 Month</Select.Option>
                  <Select.Option value="365">Last 1 Year</Select.Option>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Select Type</h4>
                <Select
                  value={type}
                  onChange={(value) => setType(value)}
                  className="w-40"
                >
                  <Select.Option value="all">All Types</Select.Option>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg">
                <button
                  onClick={() => setActiveComponent("table")}
                  className={`p-2 rounded-lg transition-all duration-300 ${activeComponent === "table"
                    ? "bg-primary-500 text-gray shadow-md"
                    : "text-gray-500 hover:bg-gray-200"
                    }`}
                >
                  <AiOutlineUnorderedList size={24} />
                </button>
                <button
                  onClick={() => setActiveComponent("analytics")}
                  className={`p-2 rounded-lg transition-all duration-300 ${activeComponent === "analytics"
                    ? "bg-primary-500 text-gray shadow-md"
                    : "text-gray-500 hover:bg-gray-200"
                    }`}
                >
                  <FaChartArea size={24} />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Add +
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {activeComponent === "table" ? (
              <Table
                columns={columns}
                dataSource={filteredData}
                className="custom-table"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} transactions`,
                }}
              />
            ) : (
              <Analytics transactions={transactions} />
            )}
          </div>

          {/* Add Transaction Modal */}
          <Modal
            title={<span className="text-xl font-bold text-gray-800">Add Transaction</span>}
            open={showModal}
            onCancel={() => {
              setShowModal(false);
              form.resetFields();
            }}
            footer={null}
            centered
            width={600}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              className="mt-6"
            >
              <Form.Item label="Amount" name="amount">
                <Input type="text" className="rounded-lg" placeholder="Enter amount" />
              </Form.Item>

              <Form.Item label="Type" name="type">
                <Select placeholder="Select type">
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Category" name="category">
                <Select placeholder="Select category">
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
              </Form.Item>

              <Form.Item label="Date" name="date">
                <Input type="date" className="rounded-lg" />
              </Form.Item>

              <Form.Item label="Reference" name="reference">
                <Input type="text" className="rounded-lg" placeholder="Enter reference" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input type="text" className="rounded-lg" placeholder="Enter description" />
              </Form.Item>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                >
                  SAVE
                </button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
