import { CloseOutlined } from "@ant-design/icons";
import { Form, InputNumber, Select, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../context/ApiProvider";
import { PrintFormat } from "../types/types";
import { MILLIMETERS_IN_METERS } from "../constants/conversion";
import { useEffect, useMemo } from "react";

type Option = {
  label: string;
  value: number;
};

const Size = () => {
  const form = Form.useFormInstance();
  const api = useApi();

  const { data = [], isLoading } = useQuery({
    queryKey: ["print-formats"],
    queryFn: () => api.getPrintFormats(),
  });

  const { sizeMap, sizeOptions } = useMemo(() => {
    const map = new Map<number, Pick<PrintFormat, "width" | "height">>();
    const options: Option[] = [];

    data.forEach((s) => {
      map.set(s.id, {
        width: s.width * MILLIMETERS_IN_METERS,
        height: s.height * MILLIMETERS_IN_METERS,
      });
      options.push({
        label: s.caption,
        value: s.id,
      });
    });

    options.push({
      label: "---",
      value: 0,
    });

    return { sizeMap: map, sizeOptions: options };
  }, [data]);

  useEffect(() => {
    if (sizeOptions.length > 1 && sizeOptions[0].value !== 0) {
      const defaultOption = sizeOptions[0];
      const defaultSize = sizeMap.get(defaultOption.value);

      if (defaultSize) {
        form.setFieldsValue({
          size: defaultOption.value,
          width: defaultSize.width,
          height: defaultSize.height,
        });
      }
    }
  }, [sizeOptions, sizeMap, form]);

  const handleSelect = (_: number, option: Option) => {
    const selectedSize = sizeMap.get(option.value);
    if (selectedSize) {
      form.setFieldsValue({
        width: selectedSize.width,
        height: selectedSize.height,
      });
    }
  };

  const handleManualChange = (_: any) => {
    form.setFieldsValue({
      size: 0,
    });
  };

  return (
    <Form.Item noStyle>
      <Form.Item label={"Размер"} name="size" required>
        <Select
          options={sizeOptions}
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
              onChange={handleManualChange}
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
              onChange={handleManualChange}
            />
          </Form.Item>
        </Space>
      </Form.Item>
    </Form.Item>
  );
};

export default Size;
