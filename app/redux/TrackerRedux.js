import uniqBy from 'lodash/uniqBy'
import remove from 'lodash/remove'
const initState = {
  data: [],
  username: ''
}

const trackerRedux = (state = initState, action) => {
  switch (action.type) {
    case 'TRACKER_ADD':
      return {
        ...state,
        data: uniqBy([
          action.payload,
          ...state.data
        ], 'name')
      }
    case 'TRACKER_REMOVE':
      const deletedNewArray = remove(state.data, obj => {
        return obj.name !== action.payload
      })
      return {
        ...state,
        data: deletedNewArray
      }
    case 'RENAME_USERNAME':
      return {
        ...state,
        username: action.payload
      }
    default:
      return state
  }
}

export default trackerRedux
