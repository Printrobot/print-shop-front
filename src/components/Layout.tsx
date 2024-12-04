import { CloseOutlined } from "@ant-design/icons";
import { Form, InputNumber, Space } from "antd";

const Layout = () => {
  return (
    <>
      <Form.Item label="Разместить на листе:" colon={false}>
        <Space align="center">
          <Form.Item name="paperWidth" style={{ margin: 0 }}>
            <InputNumber min={1} max={1000} style={{ width: "100%" }} />
          </Form.Item>
          <div>
            <CloseOutlined />
          </div>
          <Form.Item name="paperHeight" style={{ margin: 0 }}>
            <InputNumber min={1} max={1000} style={{ width: "100%" }} />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item
        label="Сверху пустое поле"
        name="topEmptyField"
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 16 }}
      >
        <InputNumber min={1} max={100_000} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Снизу пустое поле"
        name="bottomEmptyField"
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 16 }}
      >
        <InputNumber min={1} max={100_000} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Слева пустое поле"
        name="leftEmptyField"
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 16 }}
      >
        <InputNumber min={1} max={100_000} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Справа пустое поле"
        name="rightEmptyField"
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 16 }}
      >
        <InputNumber min={1} max={100_000} style={{ width: "100%" }} />
      </Form.Item>
    </>
  );
};

export default Layout;
