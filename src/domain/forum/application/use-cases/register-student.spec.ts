import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-studens-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryStudentRepository: InMemoryStudentsRepository
let sut: RegisterStudentUseCase
let fakeHasher: FakeHasher
describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHasher)
  })

  it('should be able to register student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    })

    const passwordHashde = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentRepository.items[0].password).toEqual(passwordHashde)
  })
})
