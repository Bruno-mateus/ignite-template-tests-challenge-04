import { hash } from 'bcryptjs'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'

let authenticateUserCase: AuthenticateUserUseCase;
let userRepository: IUsersRepository;

describe("Authenticate user", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    authenticateUserCase = new AuthenticateUserUseCase(userRepository)
  })
  it("should be able authenticate user", async () => {
    const user = await userRepository.create({
      name: "admin",
      email: "admin_fin@hotmail.com",
      password: await hash('1234', 8)
    })
    const authUser = await authenticateUserCase.execute({
      email: user.email,
      password: '1234'
    })

    expect(authUser).toHaveProperty('token')
  })
})
