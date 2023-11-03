import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

import { hash as becryptHash, compare } from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashComparer, HashGenerator {
  private HASH_SALT_LENGTH = 8

  async hash(plain: string): Promise<string> {
    return await becryptHash(plain, this.HASH_SALT_LENGTH)
  }

  async comparer(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash)
  }
}
