import { Table, Modal, TableColumnProps, Button, message, Space } from 'antd';
import { create, useModal, register, show } from '@ebay/nice-modal-react';
import { useEffect, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { GetFlowById, ListFlow } from 'api';

interface IProps {}

const FlowListModal = create<IProps>((props) => {
  const modal = useModal();
  const columns = useMemo<TableColumnProps<any>[]>(() => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: 'Id',
        dataIndex: 'id',
        width: 160,
      },
      {
        title: 'Action',
        width: 120,
        render(_, record) {
          return (
            <div>
              <Button
                type="text"
                onClick={async () => {
                  const res = await GetFlowById({ id: record.id });

                  if (res.code === 0) {
                    modal.resolve(res.data.detail);
                    modal.hide();
                  } else {
                    message.error(`Loading flow failed: ${res.message}`);
                  }
                }}
              >
                Load
              </Button>
            </div>
          );
        },
      },
    ];
  }, []);

  const {
    data = [],
    run,
    loading,
  } = useRequest(async () => {
    const res = await ListFlow({});

    if (res.code === 0) {
      return res.data?.list;
    }

    return [];
  });

  useEffect(() => {
    run();
  }, []);

  return (
    <Modal
      width={700}
      title="Flow List"
      open={modal.visible}
      onOk={() => {
        modal.resolve();
        modal.hide();
      }}
      onCancel={() => {
        modal.reject();
        modal.hide();
      }}
      afterClose={() => {
        modal.remove();
      }}
    >
      <div>
        <Space>
          <Button onClick={() => run()}>Reload</Button>
        </Space>
        <Table rowKey="id" dataSource={data || []} columns={columns} loading={loading} />
      </div>
    </Modal>
  );
});

const id = 'flow-list-modal';

register(id, FlowListModal);

export const renderFlowListModal = (props: IProps) =>
  show<any, IProps>(id, props);
