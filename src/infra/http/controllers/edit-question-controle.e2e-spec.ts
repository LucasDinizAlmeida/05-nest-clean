import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Edit question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFatory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFatory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[PUT]/questions/:id', async () => {
    const user = await studentFactory.CreatePrismaMakeStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })
    const question = await questionFatory.CreatePrismaMakeQuestion({
      authorId: user.id,
    })

    const response = await request(app.getHttpServer())
      .put(`/questions/${question.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'new title',
        content: 'new content',
      })

    expect(response.statusCode).toBe(204)

    const questionRefactore = await prisma.question.findFirst({
      where: {
        title: 'new title',
      },
    })

    expect(questionRefactore).toBeTruthy()
  })
})
