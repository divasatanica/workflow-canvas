import { useCallback, useRef } from 'react';
import { onEventCallbackPayload } from 'shared/class/canvas-stage';
import { CanvasStage } from 'shared/components/canvas-stage';
import { Button } from '@mui/material';
import { Panel } from './panel';
import { ShapeElementEntity } from 'shared/class/element';
import { addElement, getElements } from 'shared/utils/store';

function App() {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  return (
    <div className="relative overflow-hidden bg-white flex">
      <CanvasStage
        // onCanvasEvent={onEvent}
        onCtxInit={ctx => ctxRef.current = ctx}
        width={3000}
        height={3000}
        displayHeight="1000px"
        displayWidth="1000px"
      />
      <Panel onShapeAdd={(shapeType, type, x, y) => {
        const elementEntity = new ShapeElementEntity('asd', shapeType, {
          visionInfo: {
            keyPoint: [
              {
                x: x * 3,
                y: y * 3,
              }
            ],
            width: 300,
            height: 240,
            radius: 150,
          },
          ctx: ctxRef.current!,
          executorType: type,
        });

        elementEntity.draw();
        addElement(elementEntity);
      }} />
    </div>
  );
}

export default App;
