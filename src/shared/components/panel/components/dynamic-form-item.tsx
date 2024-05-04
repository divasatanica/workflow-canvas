import { Input, Select } from 'antd';
import { IFormItemConfig, FormItemType } from "shared/types/form";

interface IProps {
  type: FormItemType;
  itemProps: any;
  value?: any;
  onChange?: (val?: any) => void;
}

export function DynamicFormItem(props: IProps) {
  const { type, itemProps, value, onChange } = props;

  switch (type) {
    case 'input': {
      return <Input {...itemProps} value={value} onChange={onChange} />
    }
    case 'select': {
      return <Select {...itemProps} value={value} onChange={onChange} />
    }
    default: {
      return null;
    }
  }
}
