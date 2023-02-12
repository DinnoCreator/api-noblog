import { Controller, Get, Post, Patch, Delete, UseGuards, Param, ParseIntPipe, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreatePostDto, EditPostDto, } from './dto';
import { PostsService } from './posts.service';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService){}

    @Get()
    getPosts(@GetUser('id') userId: number){
        return this.postService.getPosts(
            userId,
        );
    };

    @Get(':id')
    getPostById(@GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,){
        return this.postService.getPostById(
            userId,
            postId,
        );
    };

    @Post()
    createPost(@GetUser('id') userId: number, 
    @Body() dto: CreatePostDto,){
        return this.postService.createPost(
            userId,
            dto,
        )
    };

    @Patch(':id')
    editPostById(@GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: EditPostDto,){
        return this.postService.editPostById(
            userId,
            postId,
            dto
        )
    };

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deletePostById(@GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number){
        return this.postService.deletePostById(
            userId,
            postId
        )
    };
}
