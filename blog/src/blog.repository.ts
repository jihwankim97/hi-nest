import { readFile, writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: PostDto);
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string);
  updatePost(id: string, postDto: PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = './src/blog.data.json';

  private async ensureFileExists(): Promise<void> {
    try {
      // 파일 접근 테스트 (읽기)
      await access(this.FILE_NAME, constants.F_OK);
    } catch (err) {
      // 파일이 없으면 빈 배열을 담은 파일 생성
      await writeFile(this.FILE_NAME, JSON.stringify([]), 'utf8');
    }
  }

  async getAllPost(): Promise<PostDto[]> {
    await this.ensureFileExists();
    const datas = await readFile(this.FILE_NAME, 'utf8');
    const post = JSON.parse(datas);
    return post;
  }

  async createPost(postDto: PostDto) {
    const posts = await this.getAllPost();
    const id = posts.length + 1;
    const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
    posts.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }

  async getPost(id: string) {
    const posts = await this.getAllPost();
    const result = posts.find((post) => post.id === id);
    return result;
  }

  async deletePost(id: string) {
    const posts = await this.getAllPost();
    const filteredPosts = posts.filter((post) => post.id != id);
    await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
  }

  async updatePost(id, postDto: PostDto) {
    const posts = await this.getAllPost();
    const index = posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updateDt: new Date() };
    posts[index] = updatePost;
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }
}
