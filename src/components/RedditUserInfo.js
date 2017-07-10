import React from 'react';

import axios from 'axios';
import InfoIndex from './InfoIndex';

export default class RedditUserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			userComments: [],
			userPosts: [],
			shownInfo: 'posts',
			error: '',
		};
		this.updateUsername = this.updateUsername.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateUsername(e) {
		this.setState({ username: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		const { username } = this.state;
		axios.get(`https://www.reddit.com/user/${username}/submitted.json`)
			.then((postsResponse) => {
				const posts = [];
				postsResponse.data.data.children.forEach((postData) => {
					const userPost = {};
					userPost.title = postData.data.title;
					userPost.score = postData.data.score;
					userPost.url = postData.data.url;
					posts.push(userPost);
				});
				this.setState({ userPosts: posts, error: '' });
			})
			.catch((error) => {
				console.log(error);
				this.setState({ 
					error: 'Unable to fetch the data; please input a valid username',
				});
			});
			
		axios.get(`https://www.reddit.com/user/${username}/comments.json`)
			.then((commentsResponse) => {
				const comments = [];
				commentsResponse.data.data.children.forEach((commentData) => {
					const userComment = {};
					userComment.body = commentData.data.body;
					userComment.score = commentData.data.score;
					userComment.url = commentData.data.link_url;
					comments.push(userComment);
				});
				this.setState({ userComments: comments, error: '' });
			})
			.catch((error) => {
				console.log(error);
				this.setState({ 
					error: 'Unable to fetch the data; please input a valid username', 
				});
			});
	}
	

	shownInfo() {
		const { userPosts, userComments, username, shownInfo } = this.state;

		let index;
		if (shownInfo === "posts") {
			index = userPosts;
		} else {
			index = userComments;
		}

		const props = {
			index,
			shownInfo,
			username,
		};

		return <InfoIndex {...props} />;
	}

	toggle(option) {
		return () => {
			this.setState({ shownInfo: option });
		};
	}

	render() {
		let postsTabClass = "tab";
		let commentsTabClass = "tab";

		if (this.state.shownInfo === "posts") {
			postsTabClass = "tab selected";
		} else {
			commentsTabClass = "tab selected";
		}
		return(
			<div className="reddit-info">
				<form className="username-form" onSubmit={this.handleSubmit}>
					<label>
						Enter Username:
						<input 
							type="text" 
							name="username" 
							onChange={this.updateUsername}
						/>
					</label>
					<input type="submit" value="Submit" />
					<div className="error">
						{ this.state.error }
					</div>
				</form>
				<div className="tabs">
					<div className={postsTabClass} onClick={this.toggle('posts')}>
						Posts
					</div>
					<div className={commentsTabClass} onClick={this.toggle('comments')}>
						Comments
					</div>
				</div>
				{ this.shownInfo() }
			</div>
		);
	}
}
           