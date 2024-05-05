import { ComboConfig, EdgeConfig, NodeConfig, TreeGraphData } from '@antv/g6';
import { create, register, show, useModal } from '@ebay/nice-modal-react';
import { Form, Input, Modal, message } from 'antd';
import { SaveFlow } from 'api';
import { useLayoutEffect } from 'react';

type ModelConfig = (NodeConfig | EdgeConfig | ComboConfig | TreeGraphData);
interface IProps {
  graphData: {
    id: string;
    name: string;
    nodes: ModelConfig[];
    edges: ModelConfig[];
    form: any[];
  };
}

const SaveModal = create<IProps>((props) => {
  const { graphData } = props;
  const modal = useModal();
  const [form] = Form.useForm();

  useLayoutEffect(() => {
    form.resetFields();
    form.setFieldsValue(graphData);
  }, []);

  const onOk = async () => {
    const model = form.getFieldsValue();

    const res = await SaveFlow({
      flow: {
        ...graphData,
        ...model,
      },
    });

    if (res.code === 0) {
      message.success('Successfully saved!');
      modal.resolve();
      modal.hide();
    } else {
      message.error(`Saving failed: ${res.message}`);
    }
  };

  return (
    <Modal
      title="Save Workflow"
      open={modal.visible}
      onCancel={() => {
        modal.resolve();
        modal.hide();
      }}
      afterClose={() => modal.remove()}
      onOk={onOk}
    >
      <Form form={form}>
        <Form.Item name="id" label="ID">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input placeholder="Please enter name for the workflow" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

const id = 'save-modal';
register(id, SaveModal);

export const renderSaveModal = (props: IProps) => show<any, IProps>(id, props);
