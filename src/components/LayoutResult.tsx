import { FC } from "react";
import { Typography, Card, List, Row, Col, Statistic } from "antd";
import { ImpositionResponseDto } from "../types/dto";

const { Title, Text } = Typography;

interface ILayoutResultProps {
    data: ImpositionResponseDto;
}

const LayoutResult: FC<ILayoutResultProps> = ({ data }) => {
    const { layout, fragments, total, garbage } = data;

    const formatNumber = (num: number, suffix: string) =>
        `${num.toFixed(4)} ${suffix}`;

    const renderLayout = (layout: ImpositionResponseDto["layout"]) => (
        <Card title="Layout Dimensions" style={{ marginBottom: 20 }}>
            <List>
                <List.Item>
                    <Text strong>Width:</Text> {formatNumber(layout.width, "m")}
                </List.Item>
                <List.Item>
                    <Text strong>Height:</Text>{" "}
                    {formatNumber(layout.height, "m")}
                </List.Item>
            </List>
        </Card>
    );

    const renderFragments = (fragments: ImpositionResponseDto["fragments"]) => (
        <Card title="Fragments" style={{ marginBottom: 20 }}>
            {fragments.map((fragment, index) => (
                <List key={index}>
                    <List.Item>
                        <Text strong>By Width:</Text> {fragment.byWidth}
                    </List.Item>
                    <List.Item>
                        <Text strong>By Height:</Text> {fragment.byHeight}
                    </List.Item>
                </List>
            ))}
        </Card>
    );

    return (
        <div>
            <Title level={3}>Результаты</Title>
            {renderLayout(layout)}
            {renderFragments(fragments)}

            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Total" value={total.toLocaleString()} />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Garbage (m³)"
                        value={formatNumber(garbage, "m³")}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default LayoutResult;
