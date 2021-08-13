export async function getData() {
  const axios = require("axios");
  const config = {
    method: "get",
    url: "https://opentdb.com/api.php?amount=10&type=multiple"
  };
  const response = await axios(config);
  return response;
}
