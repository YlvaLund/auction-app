import axios from "axios";

export async function getAuctions() {
  const res = await axios.get("https://api.noroff.dev/api/v1/auction/listings?_active=true&_bids=true&_seller=true");
  return res;
}

export async function getAuction(id) {
  const res = await axios.get("https://api.noroff.dev/api/v1/auction/listings/" + id + "?_bids=true&_seller=true");
  return res;
}
