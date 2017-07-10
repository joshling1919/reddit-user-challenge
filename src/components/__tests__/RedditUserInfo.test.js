import React from 'react';
import ReactDOM from 'react-dom';
import RedditUserInfo from '../RedditUserInfo';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('RedditUserInfo', () => {
	const RedditUserInfoWrapper = shallow(<RedditUserInfo />);
	const usernameInput = RedditUserInfoWrapper.find('input[type="text"]');

	it('updates the username on input', () => {
		usernameInput.simulate('change', { target: { value: 'a' }});
		expect(RedditUserInfoWrapper.state().username).toEqual('a');
	});

	it('renders the username input and tabs', () => {
		expect(shallowToJson(RedditUserInfoWrapper)).toMatchSnapshot();
	});
});



