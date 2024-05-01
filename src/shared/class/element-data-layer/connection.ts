import { ShapeElement } from './shape';

export interface IConnection {
  startingPoint: ShapeElement;
  endingPoint: ShapeElement;
  // These two methods will be called when interaction with connections happened.
  build(): void;
  destroy(): void;
}

class ElementConnection implements IConnection {
  startingPoint: ShapeElement;
  endingPoint: ShapeElement;

  constructor(start: ShapeElement, end: ShapeElement) {
    this.startingPoint = start;
    this.endingPoint = end;
  }

  build(): void {
    this.startingPoint.exhaustConnections.push(this);
    this.endingPoint.intakeConnections.push(this);
  }

  destroy(): void {
    this.startingPoint.exhaustConnections = this.startingPoint.exhaustConnections.filter(conn => conn !== this);
    this.endingPoint.intakeConnections = this.endingPoint.intakeConnections.filter(conn => conn !== this);
  }
}

export { ElementConnection };
