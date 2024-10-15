import { PrismaClient } from "@prisma/client";
import { ResolverService } from "@tsed/typegraphql";
import { AnswerRepository } from "src/repositories";
import { Arg, FieldResolver, ID, Mutation, Query, Root } from "type-graphql";
import { Answer } from "../answer/models/answer.model";
import { CreatePlayerInput } from "./inputs/player.input";
import { Player } from "./models/player";
import { PlayerRepository } from "./repositories/player.repository";

@ResolverService(Player)
export class PlayerResolver {
  constructor(
    readonly playerRepository: PlayerRepository,
    readonly answerRepository: AnswerRepository,
    private readonly prisma: PrismaClient
  ) {}

  @Query(() => Player, {
    description: "Query para obtener un jugador."
  })
  player(@Arg("id", () => ID) id: number) {
    return this.playerRepository.get(id);
  }

  @Query(() => [Player], { description: "Query para obtener todos los jugadores." })
  players() {
    return this.playerRepository.getAll();
  }

  @Mutation(() => Player, { description: "Mutación para registrar un jugador." })
  registerPlayer(@Arg("create", () => CreatePlayerInput) create: CreatePlayerInput) {
    return this.playerRepository.create({
      ...create
    });
  }

  @FieldResolver(() => [Answer], { description: "" })
  answers(@Root() player: Player) {
    return this.playerRepository.answers(player.id);
  }
}
