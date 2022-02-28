import { BASE_SERVER, PORT } from "../utils/constants.js";

export const sendEventApi = async (event) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  };

  return fetch(`${BASE_SERVER}:${PORT}/events`, options)
    .then((response) => response)
    .catch((err) => console.error(err));
};
