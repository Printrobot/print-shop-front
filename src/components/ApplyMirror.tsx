import { Form, Checkbox } from "antd";

const ApplyMirror = () => {
  return (
    <Form.Item
      label="Зеркально по одной оси"
      labelCol={{ span: 16 }}
      wrapperCol={{ span: 8 }}
      name="applyMirror"
      valuePropName="checked"
    >
      <Checkbox />
    </Form.Item>
  );
};

export default ApplyMirror;
