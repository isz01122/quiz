import axios from "axios";

class API {
  async getQuizzes() {
    const config = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=10&type=multiple"
    };
    const response = await axios(config);
    return response;
  }
}

const instance = new API();
export default instance;
