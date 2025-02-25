import { useState } from "react";
import { Form, Space, message } from "antd";
import Title from "antd/es/typography/Title";
// import Material from "../components/Material";
// import Lamination from "../components/Lamination";
import Result from "../components/Result";
// import Size from "../components/Size";
// import Quantity from "../components/Quantity";
import Border from "../ui/Border";
import { formConfig } from "../utils/formConfig";
import Controls from "../components/Controls";
import { useMutation } from "@tanstack/react-query";
import Box from "../components/Box";
import { PackInBoxRequestDto, PackInBoxResponseDto } from "../types/dto";
// import { IBox, IPaper } from "../types/types";
import { useApi } from "../context/ApiProvider";
import {
  GRAMS_IN_KILOGRAM,
  MICROMETERS_IN_METER,
  MILLIMETERS_IN_METERS,
} from "../constants/conversion";

const BOX_MARGINS = "0x0x0";

interface IForm {
  size: number;
  width: number;
  height: number;
  quantity: number;
  paper: number;
  materialType: number;
  paperColor: number;
  paperFacture: number;
  paperDensity: number;
  sidesNumber: number;
  isLaminationOn: boolean;
  laminationSides: number;
  lamination: number;
  laminateThickness: number;
  box: number;
  boxMargins: string;
  boxWidth: string;
  boxHeight: string;
  boxLength: string;
}

interface ICalculatedFields {
  paperThickness: number;
  boxThickness: number;
  boxWeight: number;
  boxDimensions: string;
}

const initialResult = {
  fullBox: {
    weight: 0,
    volume: 0,
    innerVolume: 0,
    productQuantity: 0,
    productVolume: 0,
    unusedVolumePercent: 0,
  },
  restBox: {
    weight: 0,
    volume: 0,
    innerVolume: 0,
    productQuantity: 0,
    productVolume: 0,
    unusedVolumePercent: 0,
  },
  boxesQuantity: 0,
  boxesWeight: 0,
  productsVolume: 0,
  boxesVolume: 0,
  boxesInnerVolume: 0,
};

const BoxesInBox = () => {
  const [form] = Form.useForm<IForm>();
  const [result, setResult] = useState<PackInBoxResponseDto>(initialResult);

  const [calculatedFields] = useState<ICalculatedFields>({
    paperThickness: 0.0001,
    boxThickness: 2,
    boxDimensions: "310x260x380",
    boxWeight: 1,
  });

  const api = useApi();

  const { mutate: packInBoxMutate } = useMutation({
    mutationFn: (data: PackInBoxRequestDto) => api.postPackInBox(data),
    onSuccess: (result) => {
      console.log(result);
      setResult(result);
      message.success("Расчет произведен успешно!");
    },
    onError: () => message.error(`Ошибка. См. консоль`),
  });

  const handleFinish = async (values: IForm) => {
    const { width, height, quantity, paperDensity } = values;

    const { paperThickness, boxThickness, boxDimensions, boxWeight } =
      calculatedFields;

    console.log({ formValues: values, calculatedFields });

    const requestBody = {
      product: {
        format: `${width}x${height}`,
        thickness: paperThickness * MICROMETERS_IN_METER,
        weightM2: paperDensity * GRAMS_IN_KILOGRAM,
        quantity,
      },
      box: {
        format: boxDimensions,
        thickness: boxThickness * MILLIMETERS_IN_METERS,
        margins: BOX_MARGINS,
        weight: boxWeight * GRAMS_IN_KILOGRAM,
        maxWeight: 1,
      },
    };

    console.log({ requestBody });

    packInBoxMutate(requestBody);
  };

  return (
    <div>
      <Title level={3} style={{ alignSelf: "start" }}>
        Коробок в коробку
      </Title>
      <Form
        {...formConfig}
        form={form}
        onFinish={handleFinish}
        initialValues={{
          size: 1,
          width: 210,
          height: 297,
          quantity: 100,
          materialType: 1,
          paper: 1,
          paperColor: 1,
          paperFacture: 1,
          paperDensity: 0.08,
          sidesNumber: 1,
          isLaminationOn: false,
          laminationSides: 1,
          lamination: 1,
          laminateThickness: 0,
          box: 1,
          boxWidth: 100,
          boxHeight: 100,
          boxLength: 100,
        }}
        autoComplete="off"
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Border>
            <Box />
          </Border>
          <Border>
            <Box />
          </Border>
          <Controls />
          <Result data={result} />
        </Space>
      </Form>
    </div>
  );
};

export default BoxesInBox;
