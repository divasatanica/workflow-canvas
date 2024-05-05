import { existsSync, writeFileSync } from 'fs';
import { appendFile, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import uuid from 'uuid-v4';

const getDBFilePath = (table: string) => {
  const path = resolve(__dirname, `../../db/${table}`);

  return [path, existsSync(path)];
}

export const getFlowByIdService = async (id: string) => {
  const [csvPath, exists] = getDBFilePath('flow');

  if (!exists) {
    return null;
  }

  const csvFile = (await readFile(csvPath as string, { encoding: 'utf-8' })).toString();

  const recordList = csvFile.split('\n').filter(Boolean);
  console.log('File:', csvFile, recordList, id);

  for (let i = 0; i < recordList.length; i ++) {
    const item = recordList[i];

    if (item.includes(id)) {
      return JSON.parse(item);
    }
  }

  return null;
}

export const saveFlowService = async (flowData: any) => {
  const [csvPath, exists] = getDBFilePath('flow');

  console.log('CSVPath:', csvPath);

  if (!exists) {
    console.log('WriteFile', csvPath);
    await writeFile(csvPath as string, '', { encoding: 'utf-8' });
  }

  if (!flowData.id) {
    const result = {
      ...flowData,
      id: uuid(),
    };
    await appendFile(csvPath as string, `${JSON.stringify(result)}\n`);
  } else {

    const csvFile = (await readFile(csvPath as string, { encoding: 'utf-8' })).toString();

    const recordList = csvFile.split('\n').filter(Boolean);

    for (let i = 0; i < recordList.length; i ++) {
      const item = recordList[i];

      if (item.includes(flowData.id)) {
        recordList[i] = JSON.stringify(flowData);
        break;
      }
    }

    await writeFile(csvPath as string, recordList.join('\n'), { encoding: 'utf-8', flag: 'w+' });
  }

  return null;
}

export const listFlowService = async () => {
  const [csvPath, exists] = getDBFilePath('flow');

  console.log('CSVPath:', csvPath);

  if (!exists) {
    return [];
  }

  const csvFile = (await readFile(csvPath as string, { encoding: 'utf-8' })).toString();

  const recordList = csvFile.split('\n').filter(Boolean);
  console.log('File:', csvFile, recordList);


  return recordList.map(item => JSON.parse(item));
}
