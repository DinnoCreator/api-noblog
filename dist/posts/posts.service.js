"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getPosts(userId) {
        return this.prisma.post.findMany({
            where: {
                authorId: userId,
            }, orderBy: [
                {
                    updatedAt: 'desc',
                },
            ]
        });
    }
    getPostById(userId, postId) {
        return this.prisma.post.findFirst({
            where: {
                authorId: userId,
                postId,
            }
        });
    }
    async createPost(userId, dto) {
        const post = await this.prisma.post.create({
            data: {
                authorId: userId,
                title: dto.title,
                post: dto.post,
            }
        });
        if (dto.link == null)
            return post;
        return await this.prisma.link.create({
            data: {
                title: dto.linkName,
                link: dto.link,
                noteId: post.postId,
            }
        });
    }
    async editPostById(userId, postId, dto) {
        const postGetter = await this.prisma.post.findUnique({
            where: {
                postId,
            },
        });
        if (!postGetter || postGetter.authorId !== userId)
            throw new common_1.ForbiddenException('Access to resources denied');
        return this.prisma.post.update({
            where: {
                postId,
            },
            data: Object.assign({}, dto)
        });
    }
    async deletePostById(userId, postId) {
        const postGetter = await this.prisma.post.findUnique({
            where: {
                postId,
            },
        });
        if (!postGetter || postGetter.postId !== userId)
            throw new common_1.ForbiddenException('Access to resources denied');
        await this.prisma.post.delete({
            where: {
                postId: postGetter.postId,
            },
        });
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map