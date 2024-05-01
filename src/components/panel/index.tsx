import { Button } from '@mui/material';
import { ExecutorType } from "shared/class/element-data-layer/executor";
import { ShapeType } from 'shared/class/element-vision-layer';
import { Draggable } from './draggable';
import { getElements } from 'shared/utils/store';

interface IProps {
  onShapeAdd: (shapeType: ShapeType, type: ExecutorType, x: number, y: number) => void;
}

export function Panel(props: IProps) {
  const { onShapeAdd } = props;
  return <div>
    <section>
      <Draggable onDrop={(x, y) => {
        onShapeAdd('rect', 'task', x, y);
      }} />
      <Button onClick={() => {
        console.log('Elements:', getElements());
      }}>
        Check
      </Button>
    </section>
  </div>
}
