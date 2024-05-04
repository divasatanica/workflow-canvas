import G6, { Graph, IG6GraphEvent } from '@antv/g6';
import { KeyboardEventHandler, forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { getInitData } from 'shared/utils/store-v2';

interface IProps {
  width: number;
  height?: number;
  onEvent: (type: string, e: IG6GraphEvent) => void;
}

export const G6Stage = forwardRef<Graph, IProps>((props, ref) => {
  const { width, height = width, onEvent } = props;
  const graphRef = useRef<Graph | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isCreatingEdge = useRef(false);
  const initEventListener = useCallback((graph: Graph) => {
    const onNodeSelectChange = (e: IG6GraphEvent) => {
      if (isCreatingEdge.current) {
        return;
      }
      onEvent('nodeselectchange', e);
    };
    const onAfterCreateEdge = (e: IG6GraphEvent) => {
      onEvent('aftercreateedge', e);
    };
    const onAfterAddItem = (e: IG6GraphEvent) => {
      onEvent('afteradditem', e);
    };
    const onAfterRemoveItem = (e: IG6GraphEvent) => {
      onEvent('afterremoveitem', e);
    }
    graph.on('nodeselectchange', onNodeSelectChange);
    graph.on('aftercreateedge', onAfterCreateEdge);
    graph.on('afteradditem', onAfterAddItem);
    graph.on('afterremoveitem', onAfterRemoveItem);

    return function teardown() {
      graph.off('nodeselectchange', onNodeSelectChange);
      graph.off('aftercreateedge', onAfterCreateEdge);
      graph.off('afteradditem', onAfterAddItem);
      graph.off('afterremoveitem', onAfterRemoveItem);
    };
  }, []);

  useLayoutEffect(() => {
    const keypressHandler = (e: KeyboardEvent) => {
      if (e.code.includes('Alt')) {
        isCreatingEdge.current = true;
      }
    };
    const keyupHandler = (e: KeyboardEvent) => {
      if (e.code.includes('Alt')) {
        isCreatingEdge.current = false;
      }
    }
    window.addEventListener('keydown', keypressHandler);
    window.addEventListener('keyup', keyupHandler);

    const graph = new G6.Graph({
      container: containerRef.current!,
      width,
      height,
      modes: {
        default: ['zoom-canvas', 'drag-node', 'click-select', {
          type: 'create-edge',
          trigger: 'click',
          key: 'alt',
        }],
      },
      defaultEdge: {
        style: {
          endArrow: true,
        }
      }
    });
    graphRef.current = graph;
    const initData = getInitData();

    const teardown = initEventListener(graph);
    graph.data(initData);
    graph.render();

    return () => {
      graph.destroy();
      graph.destroyLayout();
      teardown();
      window.removeEventListener('keydown', keypressHandler);
      window.removeEventListener('keyup', keyupHandler);
    };
  }, [width, height]);

  useImperativeHandle(ref, () => graphRef.current!);

  return <div ref={containerRef} />
});
