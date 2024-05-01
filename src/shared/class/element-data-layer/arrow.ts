import { BaseElementDataLayer } from './base';
import { ElementConnection } from './connection';

let arrowSeed = 0;

class ArrowElement extends BaseElementDataLayer {
  connection: ElementConnection;

  constructor(connection: ElementConnection) {
    super('arrow', `${arrowSeed++}`);
    this.connection = connection;
  }
}

export { ArrowElement }
