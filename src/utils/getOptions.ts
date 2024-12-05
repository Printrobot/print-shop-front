interface Option {
  id: number;
  caption: string;
}

export const getOptions = <T extends Option>(data: T[]) => {
  return data.map((s) => ({
    label: s.caption,
    value: s.id,
  }));
};

export const getMap = <T extends { id: number }>(data: T[]) => {
  const map = new Map<number, T>();
  data.forEach((item) => {
    map.set(item.id, item);
  });
  return map;
};
