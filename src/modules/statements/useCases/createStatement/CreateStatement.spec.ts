import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";



let createUserUseCase: CreateUserUseCase;
let inMemoryStatementsRepository: IStatementsRepository;
let inMemoryUsersRepository: IUsersRepository;
let createStatementUseCase: CreateStatementUseCase;

describe('Create statement', () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  })
  it('should be able to crete a new deposit ', async () => {
    const user = await createUserUseCase.execute({
      name: "user",
      email: "user@example.com",
      password: "0000"
    })

    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: 'desposit'
    })

    expect(statement).toHaveProperty('id')
  })
  it('should be able to create a new withdraw with a valid value', async () => {
    const user = await createUserUseCase.execute({
      name: "user",
      email: "user@example.com",
      password: "0000"
    })

    await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: 'desposit'
    })
    const statementWithdraw = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.WITHDRAW,
      amount: 100,
      description: 'withdraw'
    })
    expect(statementWithdraw).toHaveProperty('id')
  })

})
