import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}

	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const {username, password} = authCredentialsDto;
		const user = this.create({ username, password});

		try {
			await this.save(user);
		} catch (error) {
			console.log('error', error);
			if (error.code === '23505')
				throw new ConflictException('Existing username');
			else
				throw new InternalServerErrorException();
		}
	}
}
