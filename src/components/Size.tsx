import { CloseOutlined } from "@ant-design/icons";
import { Form, InputNumber, Select, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../context/ApiProvider";
import { PrintFormat } from "../types/types";
import { MILLIMETERS_IN_METERS } from "../constants/conversion";

type Option = {
  label: string;
  value: number;
};

const Size = () => {
  const form = Form.useFormInstance();
  const api = useApi();

  const { data, isLoading } = useQuery({
    queryKey: ["print-formats"],
    queryFn: () => api.getPrintFormats(),
  });

  const sizeMap = new Map<number, Pick<PrintFormat, "width" | "height">>();
  const sizeOptions: Option[] = [];

  data?.forEach((s) => {
    sizeMap.set(s.id, {
      width: s.width * MILLIMETERS_IN_METERS,
      height: s.height * MILLIMETERS_IN_METERS,
    });
    sizeOptions.push({
      label: s.caption,
      value: s.id,
    });
  });

  sizeOptions.push({
    label: "---",
    value: 0,
  });

  const handleSelect = (_: number, option: Option) => {
    const selectedSize = sizeMap.get(option.value);
    if (selectedSize) {
      form.setFieldsValue({
        width: selectedSize.width,
        height: selectedSize.height,
      });
    }
  };

  const handleChange = (_: any) => {
    form.setFieldsValue({
      size: 0,
    });
  };

  return (
    <Form.Item noStyle>
      <Form.Item label={"Размер"} name="size" required>
        <Select
          options={[...sizeOptions]}
          loading={isLoading}
          onSelect={handleSelect}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }} required>
        <Space align="center">
          <Form.Item name="width" style={{ margin: 0 }}>
            <InputNumber
              min={1}
              max={10000}
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </Form.Item>
          <div>
            <CloseOutlined />
          </div>
          <Form.Item name="height" style={{ margin: 0 }}>
            <InputNumber
              min={1}
              max={10000}
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </Form.Item>
        </Space>
      </Form.Item>
    </Form.Item>
  );
};

export default Size;
