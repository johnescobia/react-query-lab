import HTTP_CLIENT from "@/utils/api";
import { AxiosResponse } from 'axios';
import { Post } from '@/types';

export default {
  async getPost(): Promise<AxiosResponse<Post[]>> {
    return await HTTP_CLIENT.get<Post[]>('/posts');
  },
};