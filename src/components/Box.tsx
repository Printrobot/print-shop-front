import { Form, InputNumber, Select, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../context/ApiProvider";
import type { FC } from "react";
import { IBox } from "../types/types";
import { MILLIMETERS_IN_METERS } from "../constants/conversion";
import { CloseOutlined } from "@ant-design/icons";

interface IBoxProps {
  handleSelect: (box: IBox) => void;
}

type Option = {
  label: string;
  value: number;
};

const Box: FC<IBoxProps> = () => {
  const api = useApi();
  const form = Form.useFormInstance();

  const { data: boxes = [], isLoading } = useQuery({
    queryKey: ["boxes"],
    queryFn: () => api.getBoxes(),
  });

  const boxMap = new Map<number, Pick<IBox, "width" | "height" | "length">>();
  const boxOptions: Option[] = [];

  boxes?.forEach((b) => {
    boxMap.set(b.id, {
      width: b.width * MILLIMETERS_IN_METERS,
      height: b.height * MILLIMETERS_IN_METERS,
      length: b.length * MILLIMETERS_IN_METERS,
    });
    boxOptions.push({
      label: b.article,
      value: b.id,
    });
  });

  boxOptions.push({
    label: "---",
    value: 0,
  });

  const handleSelect = (_: number, option: Option) => {
    const selectedSize = boxMap.get(option.value);
    if (selectedSize) {
      form.setFieldsValue({
        boxWidth: selectedSize.width,
        boxHeight: selectedSize.height,
        boxLength: selectedSize.length,
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
      <Form.Item label={"Коробка"} name="size" required>
        <Select
          options={[...boxOptions]}
          loading={isLoading}
          onSelect={handleSelect}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }} required>
        <Space align="center">
          <Form.Item name="boxWidth" style={{ margin: 0 }}>
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
          <Form.Item name="boxHeight" style={{ margin: 0 }}>
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
          <Form.Item name="boxLength" style={{ margin: 0 }}>
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

export default Box;
