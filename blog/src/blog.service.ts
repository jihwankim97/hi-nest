import { PostDto } from './blog.model';
import { BlogMongoRepository } from './blog.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    return this.blogRepository.getAllPost();
  }

  async createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  async getPost(id) {
    return await this.blogRepository.getPost(id);
  }

  async delete(id) {
    this.blogRepository.deletePost(id);
  }

  async updatePost(id, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}
