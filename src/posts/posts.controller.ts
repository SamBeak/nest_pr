import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @Get()
  getPosts() {
	return this.postsService.getPosts();
  }
  
  @Get(':id')
  getPost(@Param('id') id: string) {
	return this.postsService.getPostById(id);
  }
  
  @Post()
  postPost(
	@Body('author') author: string,
	@Body('title') title: string,
	@Body('content') content: string,
  ) {
	return this.postsService.createPost(author, title, content);
  }
  
  @Put(':id')
  putPost(
	@Param('id') id: string,
	@Body('author') author?: string,
	@Body('title') title?: string,
	@Body('content') content?: string,
  )
  {
	return this.postsService.updatePost(id, author, title, content);
  }
  
  @Delete(':id')
  deletePost(@Param('id') id: string): string {
	return this.postsService.deletePost(id);
  }
}

