import { BaseElementDataLayer } from './base';
import { ElementConnection } from './connection';
import { ElementExecutor, ExecutorType } from './executor';

class ShapeElement extends BaseElementDataLayer {
  intakeConnections: ElementConnection[] = [];
  exhaustConnections: ElementConnection[] = [];
  executor: ElementExecutor | null = null;
  constructor(name: string) {
    super('shape', name);
  }
  connect(element: ShapeElement) {
    const connection = new ElementConnection(this, element);
    connection.build();
  }
  setExecutor(executor: ElementExecutor) {
    this.executor = executor;
  }
}

export { ShapeElement };
