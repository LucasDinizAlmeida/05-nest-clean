import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPlayoad } from '@/infra/auth/jwt.strategy'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private deleteQuestion: DeleteQuestionUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPlayoad, @Param('id') id: string) {
    const { sub: userId } = user

    const result = await this.deleteQuestion.execute({
      authorId: userId,
      questionId: id,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
