import {
	Delete,
	Get,
	JsonController,
	Param,
	Post as HttpPost,
	Put,
	Body,
} from 'routing-controllers'
import { EntityFromParam, EntityFromBody } from 'typeorm-routing-controllers-extensions'
import { getConnectionManager } from 'typeorm'

import Post from '../entity/Post'

@JsonController('/posts')
export default class PostController {

	private postRepository = getConnectionManager().get().getRepository(Post)

	@Get('/')
	async getAll() {
		return this.postRepository.find()
	}

	@Get('/:id')
	async get(@Param('id') id: number) {
		return this.postRepository.findOne(id)
	}

	@HttpPost('/')
	async save(@EntityFromBody() post: Post) {
		return this.postRepository.save(post)
	}

	@Put('/:id')
	async put(
		@Param('id') id: number,
		@Body() post: Post,
	) {
		return this.postRepository.update(id, post)
	}

	@Delete('/:id')
	async remove(@EntityFromParam('id') post: Post) {
		return post.remove()
	}

}
