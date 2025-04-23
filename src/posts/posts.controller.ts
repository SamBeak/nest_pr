import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
	id: number;
	author: string;
	title: string;
	content: string;
	likeCount: number;
	commentCount: number;
}

let posts : PostModel[] = [
	{
		id: 1,
		author: 'John Doe',
		title: 'First Post',
		content: 'This is the content of the first post.',
		likeCount: 0,
		commentCount: 0,
	},
	{
		id: 2,
		author: 'Jane Smith',
		title: 'Second Post',
		content: 'This is the content of the second post.',
		likeCount: 0,
		commentCount: 0,
	},
	{
		id: 3,
		author: 'Alice Johnson',
		title: 'Third Post',
		content: 'This is the content of the third post.',
		likeCount: 19,
		commentCount: 0,
	},
]

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @Get()
  getPosts() : PostModel[] {
	return posts;
  }
  
  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
	const post = posts.find((post) => post.id === parseInt(id));
	if (!post) {
		throw new NotFoundException(`Post with id ${id} not found`);
	}
	return post;
  }
  
  @Post()
  postPost(
	@Body('author') author: string,
	@Body('title') title: string,
	@Body('content') content: string,
  ) {
	const post : PostModel = {
		id: posts[posts.length - 1].id + 1,
		author,
		title,
		content,
		likeCount: 0,
		commentCount: 0,
	}
	
	posts = [
		...posts,
		post,
	];
	
	return post;
  }
}
