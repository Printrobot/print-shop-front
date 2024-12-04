import { Collapse, Divider, Form, message, Space } from "antd";
import Title from "antd/es/typography/Title";
import Material from "../components/Material";
import Lamination from "../components/Lamination";
import Size from "../components/Size";
import Quantity from "../components/Quantity";
import Border from "../ui/Border";
import { formConfig } from "../utils/formConfig";
import Pages from "../components/Pages";
import Controls from "../components/Controls";

const handleSelectNoop = () => {};

interface IMaterial {
  materialType: number;
  paperColor: number;
  paperFacture: number;
  paperDensity: number;
}

interface IForm {
  size: number;
  width: number;
  height: number;
  quantity: number;
  pagesInside: number;
  stitchingType: number;
  cover: IMaterial;
  block: IMaterial;
  isLaminationOn: boolean;
  sidesNumber: number;
  laminationSides: number;
  lamination: number;
  laminateThickness: number;
}

const items = [
  {
    key: "cover",
    label: "Обложка",
    children: (
      <>
        <Material handleSelect={handleSelectNoop} parentItems={["cover"]} />
        <Divider />
        <Lamination />
      </>
    ),
  },
  {
    key: "block",
    label: "Блок",
    children: (
      <>
        <Material handleSelect={handleSelectNoop} parentItems={["block"]} />
      </>
    ),
  },
];

const Booklets = () => {
  const [form] = Form.useForm<IForm>();

  const handleFinish = async (values: IForm) => {
    console.log(values);
    message.success("Переданные значения выведены в консоль");
  };

  return (
    <div>
      <Title level={3} style={{ alignSelf: "start" }}>
        Брошюры
      </Title>
      <Form
        {...formConfig}
        form={form}
        initialValues={{
          size: 1,
          width: 210,
          height: 297,
          quantity: 100,
          pagesInside: 1,
          stitchingType: 0,
          cover: {
            materialType: 1,
            paperColor: 1,
            paperFacture: 1,
            paperDensity: 0.08,
          },
          block: {
            materialType: 1,
            paperColor: 1,
            paperFacture: 1,
            paperDensity: 0.08,
          },
          sidesNumber: 1,
          isLaminationOn: false,
          laminationSides: 1,
          lamination: 1,
          laminateThickness: 0.00003,
        }}
        onFinish={handleFinish}
      >
        <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
          <Border>
            <Size />
          </Border>
          <Quantity />
          <Border>
            <Pages />
          </Border>
          <Collapse items={items} defaultActiveKey={["cover", "block"]} />
          <Controls />
        </Space>
      </Form>
    </div>
  );
};

export default Booklets;
