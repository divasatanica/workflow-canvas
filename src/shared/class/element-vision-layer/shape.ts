import { LINE_WIDTH } from 'shared/constants';
import { BaseElementDataLayer } from '../element-data-layer/base';
import { BaseElementVisionLayer, IVisionInfo } from './base';

export type ShapeType = 'rect' | 'circle';

const cutCircle = function(context: CanvasRenderingContext2D, x: number, y: number, radius: number){
  const old = context.globalCompositeOperation;
  context.globalCompositeOperation = 'destination-out';
  context.arc(x, y, radius, 0, Math.PI*2, true);
  context.fill();
  context.globalCompositeOperation = old;
}

class ShapeVisionLayer extends BaseElementVisionLayer {
  type: ShapeType;
  name: string = '';
  path: Path2D | null = null;
  constructor(
    elementData: BaseElementDataLayer,
    visionInfo: IVisionInfo,
    ctx: CanvasRenderingContext2D,
    type: ShapeType,
  ) {
    super(elementData, visionInfo, ctx);
    this.type = type;
  }

  setName(name: string) {
    this.name = name;
  }

  move(x: number, y: number) {
    switch (this.type) {
      case 'circle': {
        const { keyPoint, radius } = this.visionInfo;
        const center = keyPoint[0];
        cutCircle(this.ctx, center.x, center.y, radius + 1);
        this.visionInfo.keyPoint[0] = {
          x,
          y,
        };
        console.log(this.ctx.globalCompositeOperation);
        this.draw();
        break;
      }
      case 'rect': {
        const { keyPoint, width, height } = this.visionInfo;
        const topLeft = keyPoint[0];
        console.log('Clear', topLeft, width, height);
        this.ctx.clearRect(topLeft.x - LINE_WIDTH, topLeft.y - LINE_WIDTH, width + 2 * LINE_WIDTH, height + 2 * LINE_WIDTH);
        this.visionInfo.keyPoint[0] = {
          x,
          y,
        };
        this.draw();
      }
    }
  }

  draw(): void {
    const path = new Path2D();
    this.path = path;
    switch(this.type) {
      case 'circle': {
        const { keyPoint, radius } = this.visionInfo;
        const center = keyPoint[0];
        const { x, y } = center;
        path.arc(x, y, radius, 0, Math.PI * 2);
        path.closePath();
        this.ctx.stroke(path);
        break;
      }
      case 'rect': {
        const { keyPoint, width, height } = this.visionInfo;
        const topLeft = keyPoint[0];
        const { x, y } = topLeft;
        path.rect(x, y, width, height);
        path.closePath();
        this.ctx.stroke(path);
        break;
      }
    }
  }

  contain(x: number, y: number) {
    if (!this.path) {
      return false;
    }
    return this.ctx.isPointInPath(this.path, x, y);
  }

  containStroke(x: number, y: number) {
    if (!this.path) {
      return false;
    }
    return this.ctx.isPointInStroke(this.path, x, y);
  }
}

export { ShapeVisionLayer };
