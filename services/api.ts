import HTTP_CLIENT from "@/utils/api";

export default {
  async getPost() {
    return await HTTP_CLIENT.get('/posts');
  },
};