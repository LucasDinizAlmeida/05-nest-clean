import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

import { hash as becryptHash, compare } from 'bcryptjs'

export class BcryptHasher implements HashComparer, HashGenerator {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return becryptHash(plain, this.HASH_SALT_LENGTH)
  }

  comparer(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
