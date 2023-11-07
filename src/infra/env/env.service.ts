import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EnvService {
  constructor(private configSevice: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configSevice.get<T>(key, { infer: true })
  }
}
