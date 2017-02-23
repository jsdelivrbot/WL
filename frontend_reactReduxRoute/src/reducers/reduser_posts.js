import { FETCH_POSTS, FETCH_POST, SORT_LIST, GET_NEXT, RESET_VALUE } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

function sort(newState, value) {

    switch (value) {
        case 'title_az':
            newState.sort((a, b) => {
                if (a['Title'] > b['Title']) return 1;
                if (a['Title'] < b['Title']) return -1;
                return 0;
            });

            return newState;

        case 'title_za':
            newState.sort((a, b) => {
                if (a['Title'] > b['Title']) return -1;
                if (a['Title'] < b['Title']) return 1;
                return 0;
            });
            return newState;

        case 'year_az':
            newState.sort((a, b) => {
                if (a['Release Year'] > b['Release Year']) return 1;
                if (a['Release Year'] < b['Release Year']) return -1;
                return 0;
            });
            return newState;

        case 'year_za':
            newState.sort((a, b) => {
                if (a['Release Year'] > b['Release Year']) return -1;
                if (a['Release Year'] < b['Release Year']) return 1;
                return 0;
            });
            return newState;
    }
}

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_POSTS:
            return {...state, all: action.payload.data};

        case FETCH_POST:
            return {...state, post: action.payload.data};

        case SORT_LIST:
            const newState = state.all.slice();
            return {...state, all: sort(newState, action.payload)};

        case GET_NEXT:
            return {...state, all: [...state.all, ...action.payload.data]};

        case RESET_VALUE:
            return { all: [], post: null };

        default:
            return state;
    }

}