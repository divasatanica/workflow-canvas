import { BaseElementDataLayer } from '../element-data-layer/base';

type Point = {
  x: number;
  y: number;
};

export interface IVisionInfo {
  keyPoint: Point[];
  width: number;
  height: number;
  radius: number;
}

interface IElementVisionLayer {
  draw(): void;
  elementData: BaseElementDataLayer | null;
  visionInfo: IVisionInfo;
  layer: number;
}

class BaseElementVisionLayer implements IElementVisionLayer {
  elementData: BaseElementDataLayer | null;
  visionInfo: IVisionInfo;
  ctx: CanvasRenderingContext2D;
  layer: number = 0;

  constructor(
    elementData: BaseElementDataLayer | null,
    visionInfo: IVisionInfo,
    ctx: CanvasRenderingContext2D
  ) {
    this.elementData = elementData;
    this.visionInfo = visionInfo;
    this.ctx = ctx;
  }

  draw() {
    throw new Error('Please implement in sub-class');
  }

  contain(x: number, y: number) {
    return false;
  }

  containStroke(x: number, y: number) {
    return false;
  }

  move(x: number, y: number) {
    throw new Error('Please implement in sub-class');
  }
}

export { BaseElementVisionLayer };
