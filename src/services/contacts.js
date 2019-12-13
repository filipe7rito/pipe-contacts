import axios from "axios";

const apiUrl = "https://api.pipedrive.com/v1/persons",
  apiToken = "7a1120bb7e2deb97697d2011b0df8be007b34ca3";

export async function getUsers(startNumber, limit) {
  return await axios.get(apiUrl, {
    params: {
      user_id: 8960349,
      api_token: apiToken,
      limit: limit,
      start: startNumber > 0 ? startNumber : 0
    }
  });
}

export async function createUser(user) {
  return await axios.post(apiUrl + "?api_token=" + apiToken, {
    ...user
  });
}

export async function deleteUser(user_id) {
  return await axios.delete(apiUrl + "/" + user_id, {
    params: {
      api_token: apiToken
    }
  });
}

export async function findUser(query) {
  return await axios.get(apiUrl + "/find", {
    params: {
      start: 0,
      term: query,
      api_token: apiToken
    }
  });
}
