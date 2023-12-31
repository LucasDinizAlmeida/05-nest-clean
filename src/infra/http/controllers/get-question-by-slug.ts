import { Controller, Get, Param } from '@nestjs/common'
import { QuestionPresenter } from '../presenters/question-presenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestion: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestion.execute({ slug })

    if (result.isLeft()) {
      throw new Error()
    }

    const { question } = result.value

    return {
      question: QuestionPresenter.toHTTP(question),
    }
  }
}
