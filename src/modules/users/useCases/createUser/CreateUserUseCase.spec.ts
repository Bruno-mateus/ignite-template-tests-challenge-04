import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserError } from "./CreateUserError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"

let createUserUseCase: CreateUserUseCase;
let userRepository: IUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  })
  it("should be able create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "admin",
      email: "admin_fin@hotmail.com",
      password: '1234'
    })

    expect(user).toHaveProperty('id')
  });
  it('should not be able to create a new user with existent email', async () => {

    await expect(async () => {
      await createUserUseCase.execute({
        name: "admin",
        email: "admin_fin@hotmail.com",
        password: '1234'
      });
      await createUserUseCase.execute({
        name: "admin",
        email: "admin_fin@hotmail.com",
        password: '1234'
      });
    }).rejects.toBeInstanceOf(CreateUserError)
  });

})
