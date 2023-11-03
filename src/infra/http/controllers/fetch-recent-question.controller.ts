import { Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes'
import { z } from 'zod'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { QuestionPresenter } from '../presenters/question-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
export class FetchRecentQuestionController {
  constructor(private fetchRecents: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe)
    page: PageQueryParamsSchema,
  ) {
    const result = await this.fetchRecents.execute({ page })

    if (result.isLeft()) {
      throw new Error()
    }

    const { questions } = result.value

    return {
      questions: questions.map((question) =>
        QuestionPresenter.toHTTP(question),
      ),
    }
  }
}
