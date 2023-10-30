import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '../repositories/students-repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialError } from './erros/wrong-Credential-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialError,
  {
    access_token: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialError())
    }

    const isPasswordValid = await this.hashComparer.comparer(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({
      access_token: accessToken,
    })
  }
}