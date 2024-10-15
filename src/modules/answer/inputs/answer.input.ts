import { IsInt } from "class-validator";
import { Field, ID, InputType, Int } from "type-graphql";

@InputType({ description: "Inputs para registrar una respuesta." })
export class CreateAnswerInput {
  @Field(() => Int, { description: "Número de pregunta." })
  @IsInt()
  question: number;

  @Field(() => Int, { description: "Respuesta de la pregunta." })
  @IsInt()
  answer: number;

  @Field(() => ID, { description: "Id del jugador." })
  playerId: number;
}
