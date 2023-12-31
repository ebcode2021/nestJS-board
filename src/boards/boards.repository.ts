import { User } from "src/auth/user.entity";
import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";
import { DataSource, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./boards.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
	constructor(private dataSource: DataSource) {
		super(Board, dataSource.createEntityManager());
	}

	async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
		const {title, description} = createBoardDto;
		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
			user
		})

		await this.save(board);
		return board;
	}

}
