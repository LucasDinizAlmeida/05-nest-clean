import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller('/api')
export class AppController {
  constructor(
    private appService: AppService,
    private prismaService: PrismaService,
  ) {}

  @Get('/hello')
  async getUsers() {
    return await this.prismaService.user.findMany()
  }
}
