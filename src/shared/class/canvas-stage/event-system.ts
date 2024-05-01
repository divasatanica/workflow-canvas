import { CanvasCoordinates } from './coordinates';

interface ICanvasEventSystem {
  coordinates: CanvasCoordinates;
  canvas: HTMLCanvasElement;
}

export type EventType = 'click' | 'mousedown' | 'mouseup' | 'mousemove' | 'dragend';

export interface onEventCallbackPayload {
  type: EventType;
  x: number;
  y: number;
}

class CanvasEventSystem implements ICanvasEventSystem {
  canvas: HTMLCanvasElement;
  coordinates: CanvasCoordinates;
  constructor(
    canvas: HTMLCanvasElement,
    onEvent: (payload: onEventCallbackPayload) => void
  ) {
    this.canvas = canvas;
    this.coordinates = new CanvasCoordinates(canvas);
    this.init(onEvent);
  }

  private init(onEvent: (payload: onEventCallbackPayload) => void) {
    console.log('Init Event');
    const types: EventType[] = ['click', 'mousedown', 'mouseup', 'mousemove', 'dragend'];
    types.forEach((type) => {
      this.canvas.addEventListener<EventType>(type, (e) => {
        const { x, y } = this.coordinates.getCoordinate(e.clientX, e.clientY);

        onEvent({
          type,
          x,
          y
        });
      });
    });
  }
}

export { CanvasEventSystem };
