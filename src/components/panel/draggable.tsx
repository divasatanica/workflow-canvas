import { useRef } from "react";

interface IProps {
  onDrop(x: number, y: number): void;
}

export function Draggable(props: IProps) {
  const { onDrop } = props;
  const dxy = useRef<{ dx: number; dy: number}>({ dx: 0, dy: 0 });
  const eleRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={eleRef}
      draggable={true}
      className="m-4"
      style={{ width: 100, height: 80, border: '1px solid #000' }}
      onDragStart={(e) => {
        const bounding = eleRef.current!.getBoundingClientRect();
        dxy.current = {
          dx: bounding.left - e.screenX,
          dy: bounding.top - e.screenY,
        };
      }}
      onDragEnd={(e) => {
        console.log('E:', e);
        onDrop(e.screenX + dxy.current.dx, e.screenY + dxy.current.dy);
      }}
      onDrag={(e) => {
        console.log('E:ing', e, e.screenX, e.screenY);
      }}
    />
  );
}
