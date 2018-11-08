import axios from 'axios'
import * as React from 'react'

import Post from '../../server/src/entity/Post'

import './App.css'
import logo from './logo.svg'

class App extends React.Component<{}, { posts: Post[] }> {

	public state = {
		posts: [],
	}

	public componentDidMount() {
		this.getPosts()
	}

	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
				</p>
				{this.renderPosts()}
				<form action="/api/posts" method="post">
					<input type="text" name="title" />
					<textarea name="text" />
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}

	private async getPosts() {
		const posts = (await axios.get<Post[]>('/api/posts')).data
		this.setState({
			posts: Object.keys(posts).map(key => posts[key]),
		})
	}

	private renderPosts() {
		return (this.state.posts).map((post: Post, index: number) => {
			const { str: id } = post.id as any
			return (
				<button key={index} onClick={this.deletePost.bind(this, id)}>
					{JSON.stringify(id)}
				</button>
			)
		})
	}

	private async deletePost(id: string) {
		return axios.delete(`/posts/${id}`)
	}
}

export default App
