import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Layout,
  Menu,
  Table,
  theme,
} from "antd";
import Cookies from "js-cookie";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./home.css";
import attendance from "../imgs/icon_attendance.svg";
import employee from "../imgs/icon_employee.svg";
import global from "../imgs/icon_global.svg";
import leave from "../imgs/icon_leave.svg";
import master from "../imgs/icon_master.svg";
import payroll from "../imgs/icon_payroll.svg";
import user from "../imgs/icon_user.svg";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Attendance Management",
    "1",
    <img src={attendance} alt="" />
  ),
  getItem(
    "Leave Management",
    "2",
    <img src={leave} alt="" />
  ),
  getItem(
    "Payroll Management",
    "3",
    <img src={payroll} alt="" />
  ),

  getItem(
    "Employee Management",
    "sub1",
    <img src={employee} alt="" />,
    [getItem("Option 5", "5")]
  ),

  getItem(
    "User Management",
    "sub2",
    <img src={user} alt="" />,
    [getItem("Option 9", "9")]
  ),
  getItem(
    "Master Management",
    "sub3",
    <img src={master} alt="" />,
    [getItem("Option 11", "11")]
  ),
];

const columns = [
  {
    title: "Nik",
    dataIndex: "nik",
    key: "nik",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Bank Card No.",
    dataIndex: "bankcard",
    key: "bankcard",
  },
  {
    title: "Bank Account No.",
    dataIndex: "bankaccount",
    key: "bankaccount",
  },
  {
    title: "Family Card No.",
    dataIndex: "familycard",
    key: "familycard",
  },
  {
    title: "Marriage Status",
    dataIndex: "marriage",
    key: "marriage",
  },
  {
    title: "Mother Name",
    dataIndex: "mothername",
    key: "mothername",
  },
  {
    title: "Place of birth",
    dataIndex: "placeofbirth",
    key: "placeofbirth",
  },
  {
    title: "Date of birth",
    dataIndex: "dateofbirth",
    key: "dateofbirth",
  },
  {
    title: "Home Address",
    dataIndex: "homeaddress",
    key: "homeaddress",
  },
  {
    title: "National Card ID No.",
    dataIndex: "nationalcardid",
    key: "nationalcardid",
  },
  {
    title: "Date Start",
    dataIndex: "datestart",
    key: "datastart",
  },
  {
    title: "First Contract",
    dataIndex: "firstcontract",
    key: "firstcontract",
  },
  {
    title: "Second Contract",
    dataIndex: "secondcontract",
    key: "secondcontract",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Employee Type",
    dataIndex: "employeetype",
    key: "employeetype",
  },
  {
    title: "Salary Rp.",
    dataIndex: "salaryrp",
    key: "salaryrp",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "O/T Paid",
    dataIndex: "otpaid",
    key: "otpaid",
  },
  {
    title: "Meal Rp.",
    dataIndex: "mealrp",
    key: "mealrp",
  },
  {
    title: "Grading",
    dataIndex: "grading",
    key: "grading",
  },
];

const Home = () => {
  const { Header, Content, Sider } = Layout;
  var token = Cookies.get("token");

  let navigate = useNavigate();

  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-training.hrm.div4.pgtest.co/api/v1/employee",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        console.log(result);
        setDataa(result);
        console.log(dataa);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const data = [
    {
      key: "1",
      name: "Jasons",
      age: 32,
      gender: "male",
      bankcard: "22222",
      bankaccount: "222",
      familycard: "333",
      marriage: "no",
      mothername: "Maudie Ric",
      placeofbirth: "Viet Nam",
      dateofbirth: "23/3/2002",
      homeaddress:
        "3774 Kaia Neck Rosendoland, DC 38279-5713",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
    },
    {
      key: "4",
      name: "Joe Black",
      age: 32,
    },
  ];

  const dataq = dataa.map((data) => ({
    key: data.data.id,
    name: data.name,
  }));

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <h2
        style={{
          textAlign: "left",
          margin: 0,
          padding: "6px 0",
        }}
      >
        General
      </h2>
      <Layout>
        <Sider width={300}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              margin: 0,
              minHeight: 280,
            }}
          >
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: 1300 }}
            />
            {/* <Table columns={columns} dataSource={dataa} /> */}
            {/* </Table> */}
          </Content>
        </Layout>
      </Layout>
      <button onClick={handleLogout}>Logout</button>
    </Layout>
  );
};

export default Home;
