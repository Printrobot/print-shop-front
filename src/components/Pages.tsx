import { Form, InputNumber, Select } from "antd";

const Pages = () => (
  <>
    <Form.Item label="Страниц внутри" name="pagesInside">
      <InputNumber min={1} max={100_000} />
    </Form.Item>
    <Form.Item label="Брошюровка" name="stitchingType">
      <Select options={[{ value: 0, label: "spiral wire-o" }]} />
    </Form.Item>
  </>
);

export default Pages;
