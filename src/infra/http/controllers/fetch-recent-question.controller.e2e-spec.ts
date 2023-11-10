import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch Recent Questions (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[GET]/questions', async () => {
    const user = await studentFactory.CreatePrismaMakeStudent()

    await Promise.all([
      questionFactory.CreatePrismaMakeQuestion({
        authorId: user.id,
        title: 'Quesion 01',
      }),
      questionFactory.CreatePrismaMakeQuestion({
        authorId: user.id,
        title: 'Quesion 02',
      }),
    ])

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.questions).toHaveLength(2)

    // expect(response.body).toEqual({
    //   questions: [
    //     expect.objectContaining({ title: 'Question 02' }),
    //     expect.objectContaining({ title: 'Question 01' }),
    //   ],
    // })
  })
})
