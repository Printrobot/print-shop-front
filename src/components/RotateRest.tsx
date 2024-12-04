import { Form, Checkbox } from "antd";

const RotateRest = () => {
  return (
    <Form.Item
      label="Разрешить поворот остатка на 90°"
      labelCol={{ span: 16 }}
      wrapperCol={{ span: 8 }}
      name="allowRotateRest"
      valuePropName="checked"
    >
      <Checkbox />
    </Form.Item>
  );
};

export default RotateRest;
