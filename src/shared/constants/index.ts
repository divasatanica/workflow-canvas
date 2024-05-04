import { IFormItemConfig } from "shared/types/form";

export const LINE_WIDTH = 8;

export const BASE_FORM_ITEM_CONFIGS: IFormItemConfig[] = [
  {
    key: 'id',
    type: 'input',
    title: 'Node Id',
    itemProps: {
      disabled: true,
    },
    required: false,
  },
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
  {
    key: 'api',
    type: 'input',
    title: 'Task API',
    itemProps: {
      maxLength: 50,
      placeholder: 'Please input address of task api for this task',
    },
    required: true,
  },
  {
    key: 'timeout',
    type: 'input',
    title: 'Timeout(ms)',
    itemProps: {
      maxLength: 50,
      placeholder: 'Please input address of task api for this task',
      type: 'number',
      step: 100,
      min: 0,
    },
    required: true,
  }
]
export const DECISION_FORM_ITEM_CONFIGS: IFormItemConfig[] = [
  ...BASE_FORM_ITEM_CONFIGS,
  {
    key: 'task',
    type: 'select',
    title: 'Decision Type',
    itemProps: {
      options: [
        {
          label: 'Equal',
          value: 1,
        },
        {
          label: 'Greater than',
          value: 2,
        },
        {
          label: 'Greater than & equal',
          value: 3,
        },
        {
          label: 'Less than',
          value: 4,
        },
        {
          label: 'Less than & equal',
          value: 5,
        }
      ]
    },
    required: true,
  },
  {
    key: 'target_value',
    type: 'input',
    title: 'Target Value',
    itemProps: {
      maxLength: 50,
      placeholder: 'Please input target value of the comparison',
    },
    required: false,
  },
]
export const DATA_TRANSFORMER_FORM_ITEM_CONFIGS: IFormItemConfig[] = [
  ...BASE_FORM_ITEM_CONFIGS,

]
