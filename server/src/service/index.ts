import { appendFile, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import uuid from 'uuid-v4';

const getDBFilePath = (table: string) => {
  const path = resolve(__dirname, `../../db/${table}`);

  return path;
}

export const getFlowByIdService = async (id: string) => {
  const csvPath = getDBFilePath('flow');

  if (!csvPath) {
    return null;
  }

  const csvFile = (await readFile(csvPath, { encoding: 'utf-8' })).toString();

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
  const csvPath = getDBFilePath('flow');

  console.log('CSVPath:', csvPath);

  if (!csvPath) {
    await writeFile(csvPath, '', { encoding: 'utf-8', flag: 'a+' });
  }

  const result = {
    id: uuid(),
    ...flowData,
  };
  await appendFile(csvPath, `${JSON.stringify(result)}\n`);

  return null;
}
