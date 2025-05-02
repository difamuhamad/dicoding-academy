const baseURL = "https://notes-api.dicoding.dev/v2";

export const postData = async (newNote) => {
  try {
    const response = await fetch(baseURL + "/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    const responseJson = await response.json();
    return responseJson.status;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (id) => {
  try {
    const response = await fetch(baseURL + `/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    return responseJson.status;
  } catch (error) {
    return error;
  }
};

export const postArchiveData = async (id) => {
  try {
    const response = await fetch(baseURL + `/notes/${id}/archive`, {
      method: "POST",
    });
    const responseJson = await response.json();
    return responseJson.status;
  } catch (error) {
    return error;
  }
};

export const patchArchiveData = async (id) => {
  try {
    const response = await fetch(baseURL + `/notes/${id}/unarchive`, {
      method: "POST",
    });
    const responseJson = await response.json();
    return responseJson.status;
  } catch (error) {
    return error;
  }
};

export const getOneData = async (id) => {
  try {
    const response = await fetch(baseURL + `/notes/${id}`);
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    return error;
  }
};

export const putMethod = async (newNoteItem, id) => {
  try {
    const response1 = await fetch(baseURL + "/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNoteItem),
    });
    const response2 = await fetch(baseURL + `/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson1 = await response1.json();
    const responseJson2 = await response2.json();
    const status1 = responseJson1;
    const status2 = responseJson2;
    if (status1 && status2) {
      return "success";
    }
  } catch (error) {
    return error;
  }
};
