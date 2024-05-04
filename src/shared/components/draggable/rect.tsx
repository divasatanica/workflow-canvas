import { useRef } from 'react';
import { CommonProps } from './type';

interface IProps extends CommonProps {
  id?: string;
}

export function DraggableRect(props: IProps) {
  const { onDrop, title } = props;
  const dxy = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const eleRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div
        ref={eleRef}
        draggable={true}
        className="m-4"
        style={{ width: 50, height: 40, border: '1px solid #000' }}
        onDragStart={(e) => {
          const bounding = eleRef.current!.getBoundingClientRect();
          dxy.current = {
            dx: bounding.left - e.screenX,
            dy: bounding.top - e.screenY,
          };
        }}
        onDragEnd={(e) => {
          onDrop(e.screenX + dxy.current.dx, e.screenY + dxy.current.dy);
        }}
      />
      <section>
        {title}
      </section>
    </div>
  );
}
