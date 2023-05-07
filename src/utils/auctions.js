import axios from "axios";
import { getToken } from "./token";

export async function getAuctions(offset) {
  const res = await axios.get(`https://api.noroff.dev/api/v1/auction/listings?offset=${offset}&_active=true&_seller=false&_bids=false`);
  return res;
}

export async function getAuction(id) {
  const res = await axios.get("https://api.noroff.dev/api/v1/auction/listings/" + id + "?_bids=true&_seller=true");
  return res;
}

export async function setNewBid(id, price) {
  const res = await axios.post(
    "https://api.noroff.dev/api/v1/auction/listings/" + id + "/bids?_seller=true&_bids=true",
    {
      amount: price,
    },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
  return res;
}

export async function createAuction(data) {
  const res = await axios.post("https://api.noroff.dev/api/v1/auction/listings", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res;
}
