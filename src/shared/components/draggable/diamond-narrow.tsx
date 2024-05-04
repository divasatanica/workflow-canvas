

import { useRef } from 'react';
import { CommonProps } from './type';
import './style.css';

interface IProps extends CommonProps {
  id?: string;
}

export function DraggableDiamond(props: IProps) {
  const { onDrop, title } = props;
  const dxy = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const eleRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div style={{ height: 100, marginTop: 24 }}>
        <div
          ref={eleRef}
          draggable={true}
          className="m-4 diamond-narrow"
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
      </div>
      <section>
        {title}
      </section>
    </div>
  );
}
