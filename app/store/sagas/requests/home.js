import { HTTP_REST_URLS } from "../../../config/urls";

export async function getConsent() {
    return await api.get(`${HTTP_REST_URLS.getConsent}`)
  }