import { BaseElementDataLayer } from '../element-data-layer/base';
import { BaseElementVisionLayer, IVisionInfo } from './base';

export type ArrowType = 'arrow';

class ArrowVisionLayer extends BaseElementVisionLayer {
  type: ArrowType = 'arrow';
  path: Path2D | null = null;
  constructor(
    elementData: BaseElementDataLayer | null,
    visionInfo: IVisionInfo,
    ctx: CanvasRenderingContext2D,
  ) {
    super(elementData, visionInfo, ctx);
  }

  move(x: number, y: number) {
    const [_, end] = this.visionInfo.keyPoint;

    const oldStrokeStyle = this.ctx.strokeStyle;
    this.ctx.strokeStyle = '#fff';
    this.ctx.stroke(this.path!);
    this.ctx.strokeStyle = oldStrokeStyle;
    console.log('End:', end);
    end.x = x;
    end.y = y;
    this.draw();
  }

  draw(): void {
    const [start, end] = this.visionInfo.keyPoint;

    const path = new Path2D();
    this.path = path;
    path.moveTo(start.x, start.y);
    path.lineTo(end.x, end.y);
    path.closePath();
    this.ctx.stroke(path);
  }

  contain(x: number, y: number) {
    if (!this.path) {
      return false;
    }
    return this.ctx.isPointInStroke(this.path, x, y);
  }
}

export { ArrowVisionLayer };
