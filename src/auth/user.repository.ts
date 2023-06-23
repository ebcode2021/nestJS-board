import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}
}
