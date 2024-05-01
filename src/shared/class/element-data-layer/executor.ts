export type ExecutorType = 'task' | 'transformer' | 'decision';

interface IExecutor {
    id: string;
    // It's an API link which takes standard executor inputs and returns standard response
    // indicating the task's result and status.
    api: string;
    type: ExecutorType;
    // If it resolved, that means execution is finished.
    clock: Promise<void>;
    // Define how to check if execution is finished.
    check(): Promise<void>;
    // To bootstrap the executor, if it's a built-in executor
    // call 'run()' will run the local logic.
    run(): Promise<void>;
}

let idSeed = 0;

class ElementExecutor implements IExecutor {
  id = `${idSeed++}`;

  api = '';

  type: ExecutorType;

  clock: Promise<void>;

  constructor(type: ExecutorType) {
    this.type = type;
    this.clock = new Promise(resolve => {});
  }

  async check() {

  }

  async run() {

  }
}

export { ElementExecutor }
