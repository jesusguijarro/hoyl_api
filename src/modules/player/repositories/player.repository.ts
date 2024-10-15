import { Prisma, PrismaClient } from "@prisma/client";
import { Injectable } from "@tsed/di";

@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  get(id: number) {
    return this.prisma.player.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  getAll() {
    return this.prisma.player.findMany();
  }

  create(input: Prisma.PlayerCreateInput) {
    console.log("---------*************");
    return this.prisma.player.create({
      data: input
    });
  }

  delete(id: number) {
    return this.prisma.player.delete({
      where: {
        id: Number(id)
      }
    });
  }

  answers(id: number) {
    return this.prisma.answer.findMany({
      where: {
        playerId: id
      },
      orderBy: {
        question: "asc"
      }
    });
  }
}
