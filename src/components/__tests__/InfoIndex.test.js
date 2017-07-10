import React from 'react';
import ReactDOM from 'react-dom';
import InfoIndex from '../InfoIndex';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { postIndex, commentIndex } from '../../testUtils/InfoIndexHelper.js';

describe('InfoIndex', () => {
	it('it renders the post index', () => {
		const renderedIndex = shallow(<InfoIndex index={postIndex} />);
		expect(shallowToJson(renderedIndex)).toMatchSnapshot();
	});

	it ('it renders the comment index', () => {
		const renderedIndex = shallow(<InfoIndex index={commentIndex} />);
		expect(shallowToJson(renderedIndex)).toMatchSnapshot();
	});

	it("it renders 'no data' if index is empty", () => {
		const index = [];
		const renderedIndex = shallow(<InfoIndex index={index} />);
		expect(shallowToJson(renderedIndex)).toMatchSnapshot();
	});
});



