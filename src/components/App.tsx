import { useCallback, useRef } from 'react';
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react';
import { useAtom, Provider as JotaiProvider } from 'jotai';
import {
  FormMetaAtom,
  GraphDataAtom,
  getBusinessTypeOfNode,
  getOptionsOfNode,
  store,
  updateOptionsOfNode,
} from 'shared/store';
import { Button } from 'antd';
import { Graph, IG6GraphEvent, INode } from '@antv/g6';
import { Panel } from '../shared/components/panel';
import { G6Stage } from 'shared/components/canvas-stage/g6';
import { addItem, getGraphData, getGraphModel } from 'shared/utils/g6-util';
import { renderEditPanel } from 'shared/components/panel/edit';

function App() {
  const graphRef = useRef<Graph | null>(null);
  const [formMeta, __] = useAtom(FormMetaAtom);
  const onEvent = useCallback(async (type: string, e: IG6GraphEvent) => {
    console.log('onEvent', type, e, graphRef.current);
    if (!graphRef.current) {
      return;
    }

    switch (type) {
      case 'aftercreateedge': {
        store.set(GraphDataAtom, getGraphData(graphRef.current));
        break;
      }
      case 'afteradditem': {
        store.set(GraphDataAtom, getGraphData(graphRef.current));
        break;
      }
      case 'nodeselectchange': {
        if (!e.select) {
          return;
        }
        // Find the businessType of target node
        // And pass the form config in the panel
        const node = e.target as unknown as INode;
        const businessType = getBusinessTypeOfNode(node);
        const foundOptions = getOptionsOfNode(node);
        try {
          const model = await renderEditPanel({
            optionsMeta: formMeta[businessType || ''],
            options: foundOptions,
            onRemove: () => {
              graphRef.current?.removeItem(node);
            },
          });

          // Save the model as configs for the node
          updateOptionsOfNode(node, model);

          // Update label for naming the node in the graph
          graphRef.current.updateItem(node, {
            label: model.label,
          });
        } catch (e) {
          console.error('Error:', e);
        } finally {
          console.log('Node:', node);
          if (!node.destroyed) {
            node.clearStates(['selected']);
          }
        }
        break;
      }
      case 'afterremoveitem': {
        store.set(GraphDataAtom, getGraphData(graphRef.current));
        break;
      }
    }
  }, []);
  return (
    <div className="relative overflow-hidden bg-white flex">
      <JotaiProvider store={store}>
        <NiceModalProvider>
          <G6Stage
            width={1000}
            height={1000}
            ref={graphRef}
            onEvent={onEvent}
          />
          <div
            className="relative box-border"
            style={{
              borderLeft: '1px solid #ddd',
              width: 'calc(100vw - 1000px)',
              paddingBottom: 72,
              height: '100vh',
            }}
          >
            <Panel
              onShapeAdd={(type, x, y) => {
                switch (type) {
                  case 'decision': {
                    addItem(graphRef.current!, {
                      type: 'diamond',
                      x,
                      y,
                      size: [80, 60],
                    });
                    break;
                  }
                  case 'task': {
                    addItem(graphRef.current!, {
                      type: 'rect',
                      x,
                      y,
                      size: [50, 40],
                    });
                    break;
                  }
                  case 'transformer': {
                    addItem(graphRef.current!, {
                      type: 'circle',
                      x,
                      y,
                      size: 50,
                    });
                    break;
                  }
                }
              }}
            />
            <section
              className="absolute m-4"
              style={{ bottom: 0, left: 0, right: 0, height: 40 }}
            >
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  const graphData = store.get(GraphDataAtom);

                  console.log('GraphData', graphData);

                  const graphModel = getGraphModel(graphRef.current!);

                  console.log('GraphModel:', graphModel);
                }}
              >
                Save
              </Button>
            </section>
          </div>
        </NiceModalProvider>
      </JotaiProvider>
    </div>
  );
}

export default App;
