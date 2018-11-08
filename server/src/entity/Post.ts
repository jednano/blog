import {
	BaseEntity,
	Column,
	Entity,
	Index,
	ObjectID,
	ObjectIdColumn,
} from 'typeorm'

import Category from './Category'

@Entity()
export default class Post extends BaseEntity {

	@ObjectIdColumn()
	public id: ObjectID

	@Column()
	@Index()
	public title: string

	@Column()
	public text: string

	@Column(() => Category)
	public categories: Category[]

}
