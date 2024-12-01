export const getData = async (url: string) => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(url, { signal });
    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message || 'Request failed' };
    }

    return data;
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      throw error;
    }
  } finally {
    controller.abort();
  }
};

export const postData = async (url: string, body: any) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message || 'Request failed' };
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const putData = async (url: string, body: any) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message || 'Request failed' };
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message || 'Request failed' };
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};
