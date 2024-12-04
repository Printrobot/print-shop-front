export interface PackInBoxRequestDto {
  box: {
    format: string;
    thickness: number;
    margins: string;
    weight: number;
    maxWeight?: number;
  };
  product: {
    format: string;
    thickness: number;
    weightM2: number;
    quantity: number;
  };
}

export interface BoxResponseDto {
  weight: number;
  volume: number;
  innerVolume: number;
  productQuantity: number;
  productVolume: number;
  unusedVolumePercent: number;
}

export interface PackInBoxResponseDto {
  fullBox: BoxResponseDto;
  restBox: BoxResponseDto;
  boxesQuantity: number;
  boxesWeight: number;
  productsVolume: number;
  boxesVolume: number;
  boxesInnerVolume: number;
}

export interface ImpositionRequestDto {
  itemFormat: string;
  itemDistance: string;
  outFormat: string;
  disableRotation: boolean;
  useMirror: boolean;
}

export interface ImpositionResponseDto {
  layout: {
    width: number;
    height: number;
  };
  fragments: {
    byWidth: number;
    byHeight: number;
  }[];
  total: number;
  garbage: number;
}
