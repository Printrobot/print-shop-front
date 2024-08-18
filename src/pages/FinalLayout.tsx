import { useState } from "react";
import Title from "antd/es/typography/Title";
import Layout from "../components/Layout";
import { Form, message, Space } from "antd";
import LayoutResult from "../components/LayoutResult";
import Distance from "../components/Distance";
import Size from "../components/Size";
import Border from "../ui/Border";
import RotateRest from "../components/RotateRest";
import { formConfig } from "../utils/formConfig";
import Controls from "../components/Controls";
import { useForm } from "antd/es/form/Form";
import { useMutation } from "@tanstack/react-query";
import { useApi } from "../context/ApiProvider";
import { ImpositionRequestDto, ImpositionResponseDto } from "../types/dto";

interface IForm {
    size: number;
    width: number;
    height: number;
    verticalSpacing: number;
    horizontalSpacing: number;
    allowRotateRest: boolean;
    paperWidth: number;
    paperHeight: number;
    topEmptyField: number;
    leftEmptyField: number;
    rightEmptyField: number;
    bottomEmptyField: number;
}

const initialResult = {
    layout: {
        width: 0,
        height: 0,
    },
    fragments: [
        {
            byWidth: 0,
            byHeight: 0,
        },
    ],
    total: 0,
    garbage: 0,
};

const FinalLayout = () => {
    const [form] = useForm<IForm>();
    const [result, setResult] = useState<ImpositionResponseDto>(initialResult);

    const api = useApi();

    const { mutate: impositionMutate } = useMutation({
        mutationFn: (data: ImpositionRequestDto) => api.postImposition(data),
        onSuccess: (result) => {
            console.log(result);
            setResult(result);
            message.success("Расчет произведен успешно!");
        },
        onError: () => message.error(`Ошибка. См. консоль`),
    });

    const handleFinish = async (values: IForm) => {
        console.log(values);

        impositionMutate({
            itemFormat: `${values.width}x${values.height}`,
            itemDistance: `${values.verticalSpacing}x${values.horizontalSpacing}`,
            outFormat: `${values.paperWidth}x${values.paperHeight}`,
            disableRotation: !values.allowRotateRest,
            useMirror: false,
        });
    };

    return (
        <div>
            <Title level={3} style={{ alignSelf: "start" }}>
                Раскладка на листе
            </Title>
            <Form
                form={form}
                {...formConfig}
                initialValues={{
                    size: 1,
                    width: 210,
                    height: 297,
                    verticalSpacing: 1,
                    horizontalSpacing: 1,
                    allowRotateRest: false,
                    paperWidth: 1000,
                    paperHeight: 1000,
                    topEmptyField: 1,
                    leftEmptyField: 1,
                    rightEmptyField: 1,
                    bottomEmptyField: 1,
                }}
                onFinish={handleFinish}
            >
                <Space
                    direction="vertical"
                    size={"middle"}
                    style={{ width: "100%" }}
                >
                    <Border>
                        <Size />
                        <Distance />
                        <RotateRest />
                    </Border>
                    <Border>
                        <Layout />
                    </Border>
                    <Controls />
                    <LayoutResult data={result} />
                </Space>
            </Form>
        </div>
    );
};

export default FinalLayout;
