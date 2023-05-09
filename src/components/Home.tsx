import React from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import attendance from "../imgs/icon_attendance.svg";
import employee from "../imgs/icon_employee.svg";
import global from "../imgs/icon_global.svg";
import leave from "../imgs/icon_leave.svg";
import master from "../imgs/icon_master.svg";
import payroll from "../imgs/icon_payroll.svg";
import user from "../imgs/icon_user.svg";

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
  getItem("Attendance Management", "1", <img src={attendance} alt="" />),
  getItem("Leave Management", "2", <img src={leave} alt="" />),
  getItem("Payroll Management", "3", <img src={payroll} alt="" />),

  getItem("Employee Management", "sub1", <img src={employee} alt="" />, [
    getItem("Option 5", "5"),
  ]),

  getItem("User Management", "sub2", <img src={user} alt="" />, [
    getItem("Option 9", "9"),
  ]),
  getItem("Master Management", "sub3", null, [getItem("Option 11", "11")]),
];

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Home = () => {
  const { Header, Content, Sider } = Layout;

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        dssss
      </Header>
      <h2 style={{ textAlign: "left", margin: 0, padding: "6px 0" }}>
        General
      </h2>
      <Layout>
        <Sider width={200}>
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
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
{
}

export default Home;
