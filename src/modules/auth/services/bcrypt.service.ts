import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async check(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  async set(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }
}
