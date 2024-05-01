import { ArrowElementData, ShapeElementData } from '../element-data-layer';
import { BaseElementDataLayer } from '../element-data-layer/base';
import { ElementConnection } from '../element-data-layer/connection';
import { BaseElementVisionLayer, ArrowVisionLayer } from '../element-vision-layer';
import { IArrowOptions, IElementEntity } from './base';
import { ShapeElementEntity } from './shape';

class ArrowElementEntity implements IElementEntity {
  data: BaseElementDataLayer;
  vision: BaseElementVisionLayer;

  constructor(start: ShapeElementEntity, end: ShapeElementEntity, options: IArrowOptions) {
    const connection = new ElementConnection(start.data as ShapeElementData, end.data as ShapeElementData);
    connection.build();
    this.data = new ArrowElementData(connection);
    this.vision = new ArrowVisionLayer(
      this.data,
      options.visionInfo,
      options.ctx
    );
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

class GhostArrowElementEntity {
  vision: ArrowVisionLayer;
  constructor(options: IArrowOptions) {
    this.vision = new ArrowVisionLayer(
      null,
      options.visionInfo,
      options.ctx
    );
  }

  draw(x: number, y: number) {
    this.vision.visionInfo.keyPoint[1] = {
      x,
      y,
    };
    if (!this.vision.path) {
      this.vision.draw();
    }
    this.vision.move(x, y);
  }
}

export { ArrowElementEntity, GhostArrowElementEntity };
