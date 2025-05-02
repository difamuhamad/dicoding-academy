const baseURL = "https://notes-api.dicoding.dev/v2";

export async function getData() {
  try {
    const response = await fetch(baseURL + "/notes", {
      method: "GET",
    });
    const responseJson = await response.json();
    const data = responseJson.data;
    return data;
  } catch (error) {
    return error;
  }
}

export async function getArchivedData() {
  try {
    const response = await fetch(baseURL + "/notes/archived");
    const responseJson = await response.json();
    const data = responseJson.data;
    return data;
  } catch (error) {
    return error;
  }
}

export const sessionDisclaimer = "SHOW_DISCLAIMER";

export const sortNotes = "SORT_NOTES_KEY";
