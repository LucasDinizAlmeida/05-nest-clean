import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Comment as PrismaAnswerComment, Prisma } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaAnswerComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerComment.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        answerId: new UniqueEntityID(raw.answerId),
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    answercomment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answercomment.id.toString(),
      authorId: answercomment.authorId.toString(),
      answerId: answercomment.answerId.toString(),
      content: answercomment.content,
      createdAt: answercomment.createdAt,
      updatedAt: answercomment.updatedAt,
    }
  }
}
