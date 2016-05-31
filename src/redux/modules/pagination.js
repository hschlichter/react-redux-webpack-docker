import Immutable from 'immutable';

const INCREMENT = 'redux/pagination/INCREMENT';

const initialState = Immutable.fromJS({});

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case INCREMENT:
			return state
				.updateIn([action.json.key, 'value'], 0, val => {
					const newVal = val + action.json.value;
					if (newVal < 0) {
						return 0;
					} else {
						return newVal;
					}
				});
		default:
			return state;
	}
}

export function incrementValue(storeKey, value) {
	let json = {};
	json = {
		key: storeKey,
		value: value
	};

	return {
		type: INCREMENT,
		json: json
	};
}

