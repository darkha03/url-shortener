import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Url, Prisma } from "./generated/prisma/client";

@Injectable()
export class UrlService {
    constructor(private prisma: PrismaService){}

    async url(urlWhereUniqueInput: Prisma.UrlWhereUniqueInput): Promise<Url | null>{
        return this.prisma.url.findUnique({
            where: urlWhereUniqueInput,
        });
    }

    async createUrl(data: Prisma.UrlCreateInput): Promise<Url>{
        return this.prisma.url.create({
            data,
        });
    }

    async getAllUrl(): Promise<Url[]> {
        return this.prisma.url.findMany();
    }

    async count(): Promise<number> {
        return this.prisma.url.count();
    }

    async incrementCount(id: number): Promise<Url> {
        return this.prisma.url.update({
            where: { id },
            data: { count: { increment: 1 } },
        });
    }
}