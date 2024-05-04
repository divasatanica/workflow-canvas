import { ShapeElementData } from "../element-data-layer";
import { BaseElementDataLayer } from "../element-data-layer/base";
import { BaseElementVisionLayer } from "../element-vision-layer/base";
import { ShapeType, ShapeVisionLayer } from "../element-vision-layer";
import { IElementEntity, IShapeOptions } from "./base";
import { ElementConnection } from "../element-data-layer/connection";
import { ArrowElementEntity } from "./arrow";


class ShapeElementEntity implements IElementEntity {
  data: BaseElementDataLayer;
  vision: BaseElementVisionLayer;

  constructor(name: string, type: ShapeType, options: IShapeOptions) {
    this.data = new ShapeElementData(name);
    this.vision = new ShapeVisionLayer(this.data, options.visionInfo, options.ctx, type);
  }

  draw() {
    this.vision.draw();
  }

  contain(x: number, y: number) {
    return this.vision.contain(x, y);
  }

  containStroke(x: number, y: number) {
    return this.vision.containStroke(x, y);
  }
}

export { ShapeElementEntity };

