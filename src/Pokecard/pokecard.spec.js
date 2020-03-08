import React from 'react';
import { shallow } from 'enzyme';

import Pokecard from './pokecard';

describe('Pokecard', () => {
	const baseProps = {
		wasJustClickedOn: false,
		flipCard: jest.fn(),
		uniqueId: 'so-unique',
		name: 'name',
		imageId: 'imageId',
		isCurrentName: true,
		isPrevName: false,
		isMatched: false,
		exp: 'unknown',
		type: 'unknown'
	};
	it('should render correctly in "debug" mode', () => {
		const wrapper = shallow(<Pokecard debug />);

		expect(wrapper).toMatchSnapshot();
	});
	it('should render with card closed on initialy', () => {
		const wrapper = shallow(<Pokecard {...baseProps} />);

		expect(wrapper.find('.flip-card-action')).toHaveLength(0);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with card open when clicked on', () => {
		const props = {
			...baseProps,
			wasJustClickedOn: true
		};
		const wrapper = shallow(<Pokecard {...props} />);

		expect(wrapper.find('.flip-card-action')).toHaveLength(1);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with card open when matching card has just been clicked on', () => {
		const props = {
			...baseProps,
			isPrevName: true
		};
		const wrapper = shallow(<Pokecard {...props} />);

		expect(wrapper.find('.flip-card-action')).toHaveLength(1);
		expect(wrapper).toMatchSnapshot();
	});
	it('should always render with card open after being matched', () => {
		const props = {
			...baseProps,
			isCurrentName: true,
			isMatched: true
		};
		const wrapper = shallow(<Pokecard {...props} />);

		expect(wrapper.find('.flip-card-action')).toHaveLength(1);
		expect(wrapper).toMatchSnapshot();
	});
	it('should flip card when clicked', () => {
		const props = {
			...baseProps,
			wasJustClickedOn: false
		};
		const wrapper = shallow(<Pokecard {...props} />);
		wrapper.find('.Pokecard-front').simulate('click');
		expect(baseProps.flipCard).toHaveBeenCalled();
		baseProps.flipCard.mockClear();
	});
	it('should not flip already opened card', () => {
		const props = {
			...baseProps,
			wasJustClickedOn: true
		};
		const wrapper = shallow(<Pokecard {...props} />);
		wrapper.find('.Pokecard-front').simulate('click');
		expect(baseProps.flipCard).not.toHaveBeenCalled();
	});
});
