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
import { Button, Space, message } from 'antd';
import { Graph, IG6GraphEvent, INode } from '@antv/g6';
import { Panel } from '../shared/components/panel';
import { G6Stage } from 'shared/components/canvas-stage/g6';
import { IGraphData, addItem, getGraphData, getGraphModel, getInitData } from 'shared/utils/g6-util';
import { renderEditPanel } from 'shared/components/panel/edit';
import { SaveFlow } from 'api';
import { renderFlowListModal } from 'shared/components/flow-list-modal';
import { renderSaveModal } from 'shared/components/panel/save';

function App() {
  const graphRef = useRef<Graph | null>(null);
  const [graphData, setGraphData] = useAtom(GraphDataAtom);
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
            <div
              className="absolute m-4"
              style={{ bottom: 0, left: 0, right: 0 }}
            >
              <div>
                <section>
                  <span>ID: {graphData.id}</span>
                </section>
              </div>
              <Space>
                <Button
                  size="large"
                  type="primary"
                  onClick={async () => {
                    const newData: IGraphData = {
                      id: '',
                      name: '',
                      edges: [],
                      nodes: [],
                      form: [],
                    };

                    setGraphData(newData);
                    store.set(GraphDataAtom, newData);

                    graphRef.current!.read(getInitData());
                    const newGraphData = getGraphData(graphRef.current!);
                    store.set(GraphDataAtom, newGraphData);
                    setGraphData(newGraphData);
                  }}
                >
                  New
                </Button>
                <Button
                  size="large"
                  type="primary"
                  onClick={async () => {
                    const graphData = store.get(GraphDataAtom);
                    renderSaveModal({
                      graphData: {
                        id: graphData.id,
                        name: graphData.name,
                        ...getGraphModel(graphRef.current!)
                      },
                    });
                  }}
                >
                  Save
                </Button>

                <Button
                  size="large"
                  type="default"
                  onClick={async () => {
                    const detail = await renderFlowListModal({});

                    graphRef.current!.read({
                      nodes: detail.nodes,
                      edges: detail.edges,
                    });
                    store.set(GraphDataAtom, getGraphData(graphRef.current!));
                    const fullData = {
                      id: detail.id,
                      name: detail.name,
                      edges: graphRef.current!.getEdges(),
                      nodes: graphRef.current!.getNodes(),
                      form: detail.form,
                    };
                    store.set(GraphDataAtom, fullData);
                    setGraphData(fullData);
                  }}
                >
                  Load
                </Button>
                <Button
                  size="large"
                  type="default"
                  onClick={async () => {
                    console.log('Check:', getGraphData(graphRef.current!));
                  }}
                >
                  Check
                </Button>
              </Space>
            </div>
          </div>
        </NiceModalProvider>
      </JotaiProvider>
    </div>
  );
}

export default App;
