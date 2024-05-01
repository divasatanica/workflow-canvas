import { CSSProperties, useCallback, useLayoutEffect, useRef } from 'react';
import {
  CanvasEventSystem,
  EventType,
  onEventCallbackPayload
} from 'shared/class/canvas-stage';
import { GhostArrowElementEntity } from 'shared/class/element/arrow';
import { LINE_WIDTH } from 'shared/constants';
import { ElementEntity, endConnect, getConnecting, getElements, startConnect } from 'shared/utils/store';

interface IProps {
  displayWidth?: CSSProperties['width'];
  displayHeight?: CSSProperties['height'];
  width: number;
  height: number;
  // onCanvasEvent: (payload: {
  //   type: EventType,
  //   x: number,
  //   y: number,
  // }) => void;
  onCtxInit: (ctx: CanvasRenderingContext2D) => void;
}

export function CanvasStage(props: IProps) {
  const {
    width,
    height,
    displayWidth = width,
    displayHeight = height,
    onCtxInit
  } = props;
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const selected = useRef<ElementEntity | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const operationType = useRef<'drag' | 'connect' | ''>('');
  const onEvent = useCallback((payload: onEventCallbackPayload) => {
    const { type, x, y } = payload;

    switch (type) {
      case 'dragend': {
        console.log('Dragend', payload);
        break;
      }
      case 'mousedown': {
        isMouseDown.current = true;
        const elements = getElements();
        const targets = elements.filter((i) => i.contain(x, y));
        const strokeTargets = elements.filter(i => i.containStroke(x, y));

        if (strokeTargets.length > 0) {
          strokeTargets.sort((a, b) => b.vision.layer - a.vision.layer);

          const [target] = strokeTargets;
          console.log('Stroke Target:', target);
          selected.current = target;
          operationType.current = 'connect';
          const arrow = new GhostArrowElementEntity({
            visionInfo: {
              keyPoint: [
                {
                  x,
                  y,
                }
              ],
              width: 0,
              height: 0,
              radius: 0,
            },
            ctx: ctxRef.current!,
          });
          startConnect(target, arrow);
        } else if (targets.length > 0) {
          targets.sort((a, b) => b.vision.layer - a.vision.layer);

          const [target] = targets;
          console.log('Target:', target);
          selected.current = target;
          operationType.current = 'drag';
        } else {
          operationType.current = '';
          selected.current = null;
        }


        break;
      }
      case 'mouseup': {
        if (!selected.current || !isMouseDown.current) {
          return;
        }

        const elements = getElements();
        const targets = elements.filter((i) => i.contain(x, y));
        const strokeTargets = elements.filter(i => i.containStroke(x, y));
        debugger;
        switch (operationType.current) {
          case 'connect': {
            const [target] = [...targets, ...strokeTargets];
            endConnect(target, ctxRef.current!);
            break;
          }
          case 'drag': {

            break;
          }
        }
        isMouseDown.current = false;
        selected.current = null;
        break;
      }
      case 'mousemove': {
        if (!selected.current || !isMouseDown.current) {
          return;
        }

        switch (operationType.current) {
          case 'connect': {
            const arrow = getConnecting('arrow');

            console.log('arrow:', arrow);
            arrow?.draw(x, y);
            break;
          }
          case 'drag': {
            selected.current.vision.move(x, y);
            break;
          }
        }
      }
    }
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eventSystemRef = useRef<CanvasEventSystem | null>(null);

  useLayoutEffect(() => {
    eventSystemRef.current = new CanvasEventSystem(canvasRef.current!, onEvent);
    const context = canvasRef.current!.getContext('2d')!;
    ctxRef.current = context;
    onCtxInit(context);
    context.lineWidth = LINE_WIDTH;
  }, [onEvent]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: displayWidth,
        height: displayHeight,
        border: '1px solid #000'
      }}
      onDragOver={e => {
        e.preventDefault();
      }}
    />
  );
}
