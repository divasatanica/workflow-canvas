import { IFormItemConfig } from "shared/types/form";

export const LINE_WIDTH = 8;

export const BASE_FORM_ITEM_CONFIGS: IFormItemConfig[] = [
  {
    key: 'label',
    type: 'input',
    title: 'Title',
    itemProps: {
      maxLength: 50,
      placeholder: 'Please input the title for this node'
    },
    required: true,
  }
]

export const TASK_FORM_ITEM_CONFIGS: IFormItemConfig[] = [
  ...BASE_FORM_ITEM_CONFIGS,

]
export const DECISION_FORM_ITEM_CONFIGS: IFormItemConfig[] = [
  ...BASE_FORM_ITEM_CONFIGS,

]
export const DATA_TRANSFORMER_FORM_ITEM_CONFIGS: IFormItemConfig[] = [
  ...BASE_FORM_ITEM_CONFIGS,

]
