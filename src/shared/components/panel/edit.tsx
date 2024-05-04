import { Drawer, Form, Button, Space } from 'antd';
import { useUpdate } from 'ahooks';
import { create, register, useModal, show } from '@ebay/nice-modal-react';
import { useEffect, useMemo, useState } from 'react';
import { IFormItemConfig } from 'shared/types/form';
import { DynamicFormItem } from './components/dynamic-form-item';

interface IProps {
  optionsMeta: IFormItemConfig[];
  options: any;
  onRemove: () => void;
}

const EditPanel = create((props: IProps) => {
  const { optionsMeta = [], options, onRemove } = props;
  const modal = useModal();
  const [form] = Form.useForm();
  const update = useUpdate();
  const [formValue, setFormValue] = useState<any>({});

  useEffect(() => {
    form.setFieldsValue(options);
    update();
  }, [options]);

  const normalizedOptionsMeta = useMemo(() => {
    return optionsMeta;
  }, [optionsMeta]);

  return (
    <Drawer
      title="Configure Nodes"
      open={modal.visible}
      destroyOnClose={true}
      onClose={() => {
        modal.reject();
        modal.hide();
      }}
    >
      <Form form={form} onChange={val => setFormValue(val)}>
        {normalizedOptionsMeta.map(item => {
          return <Form.Item key={item.key} name={item.key} required={item.required} label={item.title}>
            <DynamicFormItem type={item.type} itemProps={item.itemProps} />
          </Form.Item>
        })}
      </Form>
      <footer>
        <Space>
          <Button type="default" size="large" onClick={async () => {
            onRemove();
            modal.reject();
            modal.hide();
          }}>
            Remove
          </Button>
          <Button type="primary" size="large" onClick={async () => {
            try {
              await form.validateFields();
            } catch {
              return;
            }
            const model = form.getFieldsValue();

            console.log('Model:', model);

            modal.resolve(model);
            modal.hide();
          }}>
            Confirm
          </Button>
        </Space>

      </footer>
    </Drawer>
  );
});

export const EditDrawerId = 'edit-drawer';

register(EditDrawerId, EditPanel);

export const renderEditPanel = (props: IProps) => show<any, IProps>(EditDrawerId, props);

