import { ShowUserProfileUseCase } from './ShowUserProfileUseCase'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { ShowUserProfileError } from "./ShowUserProfileError";
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { hash } from 'bcryptjs';

let showUserProfileUseCase: ShowUserProfileUseCase;
let userRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('ShowUser profile user', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepository)
    createUserUseCase = new CreateUserUseCase(userRepository)
  })
  it('should be able to show user profiler', async () => {
    const user = await createUserUseCase.execute({
      name: "admin",
      email: "admin_fin@hotmail.com",
      password: await hash('1234', 8)
    })
    await showUserProfileUseCase.execute(user.id)
  })
})
