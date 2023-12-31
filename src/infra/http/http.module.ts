import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-question.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { EditQuestionController } from './controllers/edit-question-controller'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    EditQuestionController,
    CreateAccountController,
    GetQuestionBySlugController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
    DeleteQuestionController,
  ],
  providers: [
    EditQuestionUseCase,
    CreateQuestionUseCase,
    GetQuestionBySlugUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    DeleteQuestionUseCase,
  ],
})
export class HttpModule {}
