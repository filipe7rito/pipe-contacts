import axios from "axios";

const apiUrl = "https://api.pipedrive.com/v1/organizations",
  apiToken = "9817d493980102e854c91ca8034cf742a26cb898";

export async function getOrganizations() {
  return await axios.get(apiUrl, {
    params: {
      api_token: apiToken
    }
  });
}
