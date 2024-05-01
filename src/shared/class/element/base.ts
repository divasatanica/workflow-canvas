import { ArrowElementData, ShapeElementData } from "../element-data-layer";
import { BaseElementDataLayer } from "../element-data-layer/base";
import { ExecutorType } from "../element-data-layer/executor";
import { ArrowType } from "../element-vision-layer/arrow";
import { BaseElementVisionLayer, IVisionInfo } from "../element-vision-layer/base";
import { ShapeType } from "../element-vision-layer/shape";

export type EntityShapeType = ShapeType | ArrowType;

export interface IOptions {
  visionInfo: IVisionInfo;
  ctx: CanvasRenderingContext2D;
}

export interface IArrowOptions extends IOptions {

}

export interface IShapeOptions extends IOptions {
  executorType: ExecutorType;
}

export interface IElementEntity {
  data: BaseElementDataLayer;
  vision: BaseElementVisionLayer;
}
