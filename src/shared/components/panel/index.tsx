import { Collapse, CollapseProps } from 'antd';
import { DraggableCircle, DraggableDiamond, DraggableRect } from '../draggable';
import { useMemo } from 'react';

export type ExecutorType = 'task' | 'transformer' | 'decision';

interface IProps {
  onShapeAdd: (type: ExecutorType, x: number, y: number) => void;
}

export function Panel(props: IProps) {
  const { onShapeAdd } = props;
  const items = useMemo<CollapseProps['items']>(() => {
    return [
      {
        key: 'task',
        label: 'Tasks',
        children: (
          <section>
            <DraggableRect
              onDrop={(x, y) => {
                onShapeAdd('task', x, y);
              }}
              title="Normal Task"
            />
          </section>
        ),
      },
      {
        key: 'decision',
        label: 'Decisions',
        children: (
          <section>
            <DraggableDiamond
              onDrop={(x, y) => {
                onShapeAdd('decision', x, y);
              }}
              title="Normal Decision"
            />
          </section>
        ),
      },
      {
        key: 'data_transform',
        label: 'Data Transformations',
        children: (
          <section>
            <DraggableCircle
              onDrop={(x, y) => {
                onShapeAdd('transformer', x, y);
              }}
              title="Normal Data Transformation"
            />
          </section>
        ),
      },
    ];
  }, []);
  return (
    <div>
      <Collapse items={items} className="w-full" style={{ borderRadius: 0 }} />
    </div>
  );
}
