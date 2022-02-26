const BASE_SERVER = "http://localhost";
const PORT = 8081;

export const fetchAgreement = async (price) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  return fetch(
    `${BASE_SERVER}:${PORT}/credit_agreements?totalWithTax=${price}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
};
