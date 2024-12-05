import { Form, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../context/ApiProvider";
import { getMap, getOptions } from "../utils/getOptions";
import { FC } from "react";
import { GRAMS_IN_KILOGRAM } from "../constants/conversion";

interface IMaterialProps {
  parentItems?: string[];
}

const Material: FC<IMaterialProps> = ({ parentItems = [] }) => {
  const api = useApi();
  const form = Form.useFormInstance();

  const { data: papers = [], isLoading: isPaperOptionsLoading } = useQuery({
    queryKey: ["papers"],
    queryFn: () => api.getPapers(),
  });

  const { data: materialTypes = [], isLoading: isMaterialTypesLoading } =
    useQuery({
      queryKey: ["material-types"],
      queryFn: () => api.getMaterialTypes(),
    });

  const { data: paperFactures = [], isLoading: isPaperFacturesLoading } =
    useQuery({
      queryKey: ["paper-factures"],
      queryFn: () => api.getPaperFactures(),
    });

  const { data: paperColors = [], isLoading: isPaperColorsLoading } = useQuery({
    queryKey: ["paper-colors"],
    queryFn: () => api.getPaperColors(),
  });

  const paperDensities = [0.08, 0.13, 0.17];

  // TODO: Remove hardcoded when API stops returning empty array
  //   const {
  //     data: paperDensities = [],
  //     isLoading: isPaperDensitiesLoading,
  //   } = useQuery({
  //     queryKey: ["paper-densities"],
  //     queryFn: () => api.getPaperDensities(),
  //   });

  const papersMap = getMap(papers);
  const paperOptions = papers.map((p) => ({
    label: p.article,
    value: p.id,
  }));

  const materialTypesOptions = getOptions(materialTypes);
  const paperColorsOptions = getOptions(paperColors);
  const paperFacturesOptions = getOptions(paperFactures);
  const paperDensitiesOptions = paperDensities.map((d) => ({
    label: `${d * GRAMS_IN_KILOGRAM} г/м²`,
    value: d,
  }));

  const handleSelectMaterial = (id: number) => {
    const paper = papersMap.get(id);
    if (!paper) return;

    form.setFieldsValue({
      materialType: paper.typeId,
      paperColor: paper.colorId,
      paperFacture: paper.factureId,
      paperDensity: paper.density,
    });
  };

  return (
    <>
      <Form.Item label={"Бумага"} name={[...parentItems, "paper"]}>
        <Select
          options={[...paperOptions]}
          loading={isPaperOptionsLoading}
          onSelect={handleSelectMaterial}
        />
      </Form.Item>
      <Form.Item label={"Материал"} name={[...parentItems, "materialType"]}>
        <Select
          options={[...materialTypesOptions]}
          loading={isMaterialTypesLoading}
          disabled
        />
      </Form.Item>
      <Form.Item
        name={[...parentItems, "paperDensity"]}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Select
          options={[...paperDensitiesOptions]}
          //   loading={isPaperDensitiesLoading}
          disabled
        />
      </Form.Item>
      <Form.Item
        name={[...parentItems, "paperFacture"]}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Select
          options={[...paperFacturesOptions]}
          loading={isPaperFacturesLoading}
          disabled
        />
      </Form.Item>
      <Form.Item
        name={[...parentItems, "paperColor"]}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Select
          options={[...paperColorsOptions]}
          loading={isPaperColorsLoading}
          disabled
        />
      </Form.Item>
    </>
  );
};

export default Material;
