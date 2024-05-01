import { ArrowElementEntity, ShapeElementEntity } from "shared/class/element";
import { ElementConnection } from "shared/class/element-data-layer/connection";
import { GhostArrowElementEntity } from "shared/class/element/arrow";

export type ElementEntity = ArrowElementEntity | ShapeElementEntity;

const elements: Array<ElementEntity> = [];
let connectingStart: ShapeElementEntity;
let connectingEnd: ShapeElementEntity;
let connectingArrow: GhostArrowElementEntity;

export function addElement(element: ElementEntity) {
  elements.push(element);
}

export function getElements() {
  return elements;
}

export function getConnecting(type: 'start' | 'end' | 'arrow') {
  switch(type) {
    case 'start': {
      return connectingStart;
    }
    case 'end': {
      return connectingEnd;
    }
    case 'arrow': {
      return connectingArrow;
    }
    default: {
      return null;
    }
  }
}

export function startConnect(element: ElementEntity, arrow: GhostArrowElementEntity) {
  connectingStart = element;
  connectingArrow = arrow;
}

export function endConnect(element: ElementEntity, ctx: CanvasRenderingContext2D) {
  const arrowEntity = new ArrowElementEntity(
    connectingStart,
    element,
    {
      visionInfo: {
        width: 0,
        height: 0,
        radius: 0,
        keyPoint: [],
      },
      ctx,
    }
  );

  addElement(arrowEntity);
}
