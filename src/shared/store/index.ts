import { atom, createStore } from 'jotai';
import { GraphData, Graph, INode, IEdge } from '@antv/g6';
import { DATA_TRANSFORMER_FORM_ITEM_CONFIGS, DECISION_FORM_ITEM_CONFIGS, TASK_FORM_ITEM_CONFIGS } from 'shared/constants';
import { IFormItemConfig } from 'shared/types/form';
import { IGraphData } from 'shared/utils/g6-util';

export const store = createStore();

export const GraphDataAtom = atom<IGraphData>({
  id: '',
  name: '',
  nodes: [],
  edges: [],
  form: [],
});

export const FormMetaAtom = atom<Record<string, IFormItemConfig[]>>({
  task: TASK_FORM_ITEM_CONFIGS,
  decision: DECISION_FORM_ITEM_CONFIGS,
  transformer: DATA_TRANSFORMER_FORM_ITEM_CONFIGS,
});

export const getBusinessTypeOfNode = (node: INode) => {
  const nodeList = store.get(GraphDataAtom).nodes || [];

  const found = nodeList.find(item => item.getID() === node.getID());

  if (!found) {
    return '';
  }

  console.log('Found', found);

  return {
    rect: 'task',
    circle: 'transformer',
    diamond: 'decision',
  }[found.getModel().type as string];
}

export const getOptionsOfNode = (node: INode) => {
  const nodeList = store.get(GraphDataAtom).form || [];

  const found = nodeList.find(item => item.id === node.getID());

  if (!found) {
    return {};
  }

  console.log('Found', found);

  return found;
}

export const updateOptionsOfNode = (node: INode, model: any) => {
  const graphData = store.get(GraphDataAtom);
  const formList = graphData.form || [];

  const foundIndex = formList.findIndex(item => item.id === node.getID());

  if (foundIndex < 0) {
    return;
  }

  const newList = [...formList];
  newList[foundIndex] = {
    id: formList[foundIndex].id,
    ...(model || {})
  };

  store.set(GraphDataAtom, {
    ...graphData,
    form: newList,
  });

  return;
}
