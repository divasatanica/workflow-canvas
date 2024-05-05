const BASE_URL = 'http://localhost:3000/workflow';

const fetchAPI = async (url: string, params: RequestInit) => {
  if (params?.method?.toLowerCase() === 'get') {
    const mockUrl = new URL(`${BASE_URL}${url}`);
    const { body = '{}', ...rest } = params;
    const _body = JSON.parse(body as string) as any;
    Object.keys(_body).forEach((key) => {
      const value = _body[key];
      mockUrl.searchParams.append(key, value as string);
      mockUrl.searchParams.append('_', `${Date.now()}`);
    });

    const res = await fetch(mockUrl, rest);

    return res.json();
  }

  const res = await fetch(`${BASE_URL}${url}?_=${Date.now()}`, params);
  return res.json();
}

export const SaveFlow = (params: any) => {

  return fetchAPI('/save', {
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const ListFlow = (params: any) => {
  return fetchAPI('/list', {
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const GetFlowById = (params: any) => {

  return fetchAPI(`/detail/${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};
