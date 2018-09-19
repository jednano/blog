import {
	BaseEntity,
	Column,
	Entity,
	ObjectID,
	ObjectIdColumn,
} from 'typeorm'

import Category from './Category'

@Entity()
export default class Post extends BaseEntity {

	@ObjectIdColumn()
	id: ObjectID

	@Column()
	title: string

	@Column()
	text: string

	@Column(() => Category)
	categories: Category[]

}
