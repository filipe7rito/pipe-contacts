import axios from "axios";

const apiUrl = "https://api.pipedrive.com/v1/persons",
  apiToken = "9817d493980102e854c91ca8034cf742a26cb898";

export async function getUsers(startNumber, limit) {
  return await axios.get(apiUrl, {
    params: {
      user_id: 9598470,
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
