import { PrismaClient } from "@prisma/client";
import { ResolverService } from "@tsed/typegraphql";
import { AnswerRepository } from "src/repositories";
import { Arg, FieldResolver, Mutation, Query, Root } from "type-graphql";
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
  player(@Arg("username", () => String) username: string) {
    return this.playerRepository.get(username);
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
    return this.playerRepository.answers(player.username);
  }

  @Mutation(() => Boolean, { description: "Mutación para elminar uno o más jugadores, y sus respuestas relacionadas." })
  async deleteManyPlayerAndAnswers(@Arg("usernames", () => [String]) usernames: string[]): Promise<boolean> {
    try {
      await this.playerRepository.deleteManyPlayerAndAnswers(usernames);
      return true;
    } catch (error) {
      console.error("Error deleting players and answers.", error);
      throw new Error("No se pudieron eliminar los jugadores y sus respuestas relacionadas.");
    }
  }
}
