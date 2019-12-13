import axios from "axios";

const apiUrl = "https://api.pipedrive.com/v1/organizations",
  apiToken = "7a1120bb7e2deb97697d2011b0df8be007b34ca3";

export async function getOrganizations() {
  return await axios.get(apiUrl, {
    params: {
      api_token: apiToken
    }
  });
}
