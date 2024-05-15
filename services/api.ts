import HTTP_CLIENT from "@/utils/api";
import { AxiosResponse } from 'axios';
import { Post } from '@/types';

export default {
  async getPost(): Promise<Post[]> {
    const res: AxiosResponse<Post[]> = await HTTP_CLIENT.get('/posts');
    return res.data.map((post: Post) => ({
      ...post,
      body: post.body.replace(/\n/g, '') // Strip newlines right after fetching
    }));
  },
  async getDummyError(): Promise<unknown> {
    return Promise.reject(new Error('Dummy error message'));
  }
};