import { BaseElementDataLayer } from './base';
import { ElementConnection } from './connection';
import { ElementExecutor, ExecutorType } from './executor';

class ShapeElement extends BaseElementDataLayer {
  intakeConnections: ElementConnection[] = [];
  exhaustConnections: ElementConnection[] = [];
  executor: ElementExecutor;
  constructor(name: string, executorType: ExecutorType) {
    super('shape', name);
    this.executor = new ElementExecutor(executorType);
  }
  connect(element: ShapeElement) {
    const connection = new ElementConnection(this, element);
    connection.build();
  }
}

export { ShapeElement };
