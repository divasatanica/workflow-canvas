export type FormItemType = 'input' | 'select';

export interface IFormItemConfig {
  key: string;
  type: FormItemType;
  title: string;
  required: boolean;
  itemProps: any;
}

