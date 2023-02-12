import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, EditPostDto } from './dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    getPosts(userId: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Post[]>;
    getPostById(userId: number, postId: number): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post, never>;
    createPost(userId: number, dto: CreatePostDto): Promise<import(".prisma/client").Post | import(".prisma/client").Link>;
    editPostById(userId: number, postId: number, dto: EditPostDto): Promise<import(".prisma/client").Post>;
    deletePostById(userId: number, postId: number): Promise<void>;
}
