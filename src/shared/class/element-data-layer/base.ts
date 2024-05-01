type ValidValue = string | number | Record<string, string>;
type PossibleValue = ValidValue | ValidValue[];

type ElementType = 'arrow' | 'shape' | '';

interface IElementMeta {
  type: ElementType;
  name: string;
  id: string;
}

export interface IElementSchema {
  type: string;
  name: string;
  id: string;
  executorId: string;
  intake: string[];
  exhaust: string[];
  options?: Record<string, any>;
}

export interface IElementDataLayer {
  // Element's metadata
  meta: IElementMeta;
  // Method that get out from element
  getOutput(): PossibleValue | null;
}

let idSeed = 0;

class BaseElementDataLayer implements IElementDataLayer {
  meta: IElementMeta = { id: `${idSeed++}`, name: '', type: '' };
  // Data that returned from the executor
  output: PossibleValue | null = null;

  layer: number = 0;

  constructor(type: ElementType, name: string) {
    this.meta.type = type;
    this.meta.name = name;
  }

  init() {}

  getOutput(): PossibleValue | null {
    return this.output;
  }
}

export { BaseElementDataLayer };
