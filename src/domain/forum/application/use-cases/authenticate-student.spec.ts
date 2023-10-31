import { InMemoryStudentsRepository } from 'test/repositories/in-memory-studens-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { Encrypter } from '../cryptography/encrypter'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeStudent } from 'test/factories/make-student'

let sut: AuthenticateStudentUseCase
let inMemoryStudentRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: Encrypter
describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate student', async () => {
    const student = makeStudent({
      name: 'John Doe',
      email: 'john@email.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentRepository.items.push(student)

    const result = await sut.execute({
      email: 'john@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      access_token: expect.any(String),
    })
  })
})
