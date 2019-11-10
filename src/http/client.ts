import axios from "axios";

export function getAnonymousHttpClient(bridgeUrl: string) {
  return axios.create({
    baseURL: `${bridgeUrl}/api`
  });
}

export function getAuthenticatedHttpClient(
  bridgeUrl: string,
  userName: string
) {
  return axios.create({
    baseURL: `${bridgeUrl}/api/${userName}`
  });
}
