import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, EditPostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }
  getPosts(userId: number) {
    return this.prisma.post.findMany({
      where: {
        authorId: userId,
      }, orderBy: [
        {
          updatedAt: 'desc',
        },]
    });
  }

  getPostById(userId: number, postId: number) {
    return this.prisma.post.findFirst({
      where: {
        authorId: userId,
        postId,
      }
    })
  }

  async createPost(userId: number, dto: CreatePostDto) {

    const post = await this.prisma.post.create({
      data: {
        authorId: userId,
        title: dto.title,
        post: dto.post,
      }
    })

    if (dto.link == null) return post;

    return await this.prisma.link.create({
      data: {
        title: dto.linkName,
        link: dto.link,
        noteId: post.postId,
      }
    })

  }

  async editPostById(userId: number, postId: number, dto: EditPostDto) {
    // get the post by id
    const postGetter =
      await this.prisma.post.findUnique({
        where: {
          authorId: userId,
          postId,
        },
      });

    // check if user owns the post
    if (!postGetter)
      throw new ForbiddenException(
        'Access to resources denied',
      );
    return this.prisma.post.update({
      where: {
        postId,
      },
      data: {
        ...dto,
      }
    })
  }

  async deletePostById(userId: number, postId: number) {
    const postGetter =
      await this.prisma.post.findUnique({
        where: {
          authorId: userId,
          postId,
        },
      });

    // check if user owns the bookmark
    if (!postGetter)
      throw new ForbiddenException(
        'Access to resources denied',
      );

   await this.prisma.link.delete({
      where: {
        noteId: postGetter.postId,
      },
    });

   return await this.prisma.post.delete({
      where: {
        postId: postGetter.postId,
      },
    });
  }

}
