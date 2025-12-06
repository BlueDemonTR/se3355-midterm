const defaultState = {  }

const data = (state = defaultState, action) => {
	const { payload, type } = action

	switch (type) {
		case 'SET_SUMMARY':
			return {
				...state,
				summary: payload
			}
		
		default:
			return state
	}
}

export default data