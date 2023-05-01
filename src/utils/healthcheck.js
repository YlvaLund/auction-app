import axios from "axios";
export async function healthCheck() {
  const res = await axios.get("https://api.noroff.dev/status");
  return res;
}
