const BASE_URL = 'http://localhost:3000/workflow';

const fetchAPI = async (url: string, params: RequestInit) => {
  if (params?.method?.toLowerCase() === 'get') {
    const mockUrl = new URL(`${BASE_URL}${url}`);
    const { body, ...rest } = params;
    (body as FormData).forEach((value, key) => {
      mockUrl.searchParams.append(key, value as string);
    });

    const res = await fetch(mockUrl, rest);

    return res.json();
  }

  const res = await fetch(`${BASE_URL}${url}`, params);
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
}
