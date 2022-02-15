import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authcredentialsdto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authcredentialsdto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
