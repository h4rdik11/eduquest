import { Layout, theme } from "antd";
import React, { PropsWithChildren } from "react";
import "./style.css";

const { Content } = Layout;

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-full">
      <Content style={{ padding: "20px" }}>
        <div
          className="h-full"
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
