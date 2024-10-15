//import { email, string } from "@tsed/schema/lib/types/utils/from";
import { Forbidden } from "@tsed/exceptions";
import { ResolverService } from "@tsed/typegraphql";
import { Arg, Authorized, Ctx, ID, Mutation, Query } from "type-graphql";
import { UpdateUserInput } from "./inputs/update.input";
import { CreateUserInput } from "./inputs/user.input";
import { ToDoContext } from "./models/context.model";
import { User } from "./models/user";
import { UserRepository } from "./repositories/user.repository";

@ResolverService(User)
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {}

  @Authorized()
  @Query((returns) => User)
  user(@Arg("id", (type) => ID) id: number) {
    return this.userRepository.getUser(id);
  }

  @Authorized()
  @Query((returns) => [User])
  users() {
    return this.userRepository.getAll();
  }

  @Authorized()
  @Query((returns) => User)
  currentUser(@Ctx() context: ToDoContext) {
    if (context.user) {
      return this.userRepository.getUser(context.user?.id);
    }
    throw new Forbidden("Usuario no encontrado.");
  }

  //Crear un usuario
  @Mutation((returns) => User, {
    description: "Mutación para crear un nuevo ususario."
  })
  registerUser(@Arg("create", (type) => CreateUserInput) create: CreateUserInput) {
    return this.userRepository.createUser({
      ...create
    });
  }

  @Authorized()
  @Mutation((returns) => User, { description: "Mutación para elminar un usuario" })
  deleteUser(@Arg("delete", (type) => ID) id: number) {
    return this.userRepository.deleteUser(id);
  }

  @Authorized()
  @Mutation((returns) => User, { description: "Mutación para actualizar un usuario" })
  updateUser(@Arg("update", (type) => UpdateUserInput) update: UpdateUserInput, @Ctx() context: ToDoContext) {
    if (context.user) {
      return this.userRepository.updateUser(context.user?.id, update);
    }
    throw new Forbidden("Usuario no encontrado.");
  }
}
