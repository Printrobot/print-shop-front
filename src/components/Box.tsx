import { Form, InputNumber, Select, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../context/ApiProvider";
import { useEffect, useMemo } from "react";
import { IBox } from "../types/types";
import { MILLIMETERS_IN_METERS } from "../constants/conversion";
import { CloseOutlined } from "@ant-design/icons";

type Option = {
  label: string;
  value: number;
};

const Box = () => {
  const api = useApi();
  const form = Form.useFormInstance();

  const { data: boxes = [], isLoading } = useQuery({
    queryKey: ["boxes"],
    queryFn: () => api.getBoxes(),
  });

  const { boxMap, boxOptions } = useMemo(() => {
    const map = new Map<number, Pick<IBox, "width" | "height" | "length">>();
    const options: Option[] = [];

    boxes.forEach((b) => {
      map.set(b.id, {
        width: b.width * MILLIMETERS_IN_METERS,
        height: b.height * MILLIMETERS_IN_METERS,
        length: b.length * MILLIMETERS_IN_METERS,
      });
      options.push({
        label: b.article,
        value: b.id,
      });
    });

    options.push({
      label: "---",
      value: 0,
    });

    return { boxMap: map, boxOptions: options };
  }, [boxes]);

  useEffect(() => {
    if (boxOptions.length > 1 && boxOptions[0].value !== 0) {
      const defaultOption = boxOptions[0];
      const defaultSize = boxMap.get(defaultOption.value);

      if (defaultSize) {
        form.setFieldsValue({
          boxWidth: defaultSize.width,
          boxHeight: defaultSize.height,
          boxLength: defaultSize.length,
        });
      }
    }
  }, [boxOptions, boxMap, form]);

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

  const handleManualChange = (_: any) => {
    form.setFieldsValue({
      box: 0,
    });
  };

  return (
    <Form.Item noStyle>
      <Form.Item label={"Коробка"} name="box" required>
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
              onChange={handleManualChange}
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
              onChange={handleManualChange}
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
              onChange={handleManualChange}
            />
          </Form.Item>
        </Space>
      </Form.Item>
    </Form.Item>
  );
};

export default Box;
