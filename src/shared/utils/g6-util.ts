import { GraphData, Graph, INode, IEdge, ModelConfig } from '@antv/g6';
import { GraphDataAtom , store } from 'shared/store';

export function getInitData() {
  const startId = `start-${Date.now()}`;
  const endId = `end-${Date.now()}`;
  const data: GraphData = {
    // 点集
    nodes: [
      {
        id: startId, // String，该节点存在则必须，节点的唯一标识
        x: 100, // Number，可选，节点位置的 x 值
        y: 500, // Number，可选，节点位置的 y 值
        label: 'Start',
        size: 25,
        type: 'triangle',
      },
      {
        id: endId, // String，该节点存在则必须，节点的唯一标识
        x: 900, // Number，可选，节点位置的 x 值
        y: 500, // Number，可选，节点位置的 y 值
        label: 'End',
        size: 25,
        type: 'triangle',
      },
    ],
    // // 边集
    // edges: [
    //   {
    //     source: startId, // String，必须，起始点 id
    //     target: endId, // String，必须，目标点 id
    //   },
    // ],
  };

  return data;
}

export interface IGraphData {
  id: string;
  name: string;
  nodes: INode[];
  edges: IEdge[];
  form: Array<{
    id: string;
    [x: string]: any;
  }>;
}

export function getGraphData(graph: Graph): IGraphData {
  const graphData = store.get(GraphDataAtom);
  const nodes = graph.getNodes();
  const edges = graph.getEdges();

  return {
    id: graphData.id,
    name: graphData.name,
    nodes,
    edges,
    form: nodes.map(item => {
      const found = graphData.form.find(i => i.id === item.getID());
      return {
        ...(found || {}),
        id: item.getID(),
      }
    }),
  };
}

export function addItem(graph: Graph, model: ModelConfig) {
  const { x, y, size, type } = model;
  graph?.addItem('node', {
    type,
    x,
    y,
    size,
    labelCfg: {
      position: 'bottom',
    },
  });
}

export function getGraphModel(graph: Graph) {
  const data = getGraphData(graph);

  const result = {
    nodes: data.nodes.map(item => item.getModel()),
    edges: data.edges.map(item => item.getModel()),
    form: data.form,
  };

  return result;
}
