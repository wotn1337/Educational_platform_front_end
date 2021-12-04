import {fragmentsAPI} from "../api/api";


const SET_FRAGMENTS = 'catalogFragments/SET_FRAGMENTS';
const SET_CURRENT_PAGE = 'catalogFragments/SET_CURRENT_PAGE';
const SET_IS_FETCHING = 'catalogFragments/SET_IS_FETCHING';
const SET_SEARCH_TITLE = 'catalogFragments/SET_SEARCH_TITLE';
const SET_SEARCH_TYPE = 'catalogFragments/SET_SEARCH_TYPE';
const ADD_SEARCH_TAG = 'catalogFragments/ADD_SEARCH_TAG';
const DELETE_SEARCH_TAG = 'catalogFragments/DELETE_SEARCH_TAG';


const initState = {
	fragments: [],
	currentPage: 1,
	pageSize: 6,
	totalFragmentsCount: 0,
	currentFragmentsCount: 0,
	prevPage: 1,
	nextPage: 1,
	lastPage: 1,
	isFetching: false,
	searchTitle : '',
	searchType: '',
	searchTags: [],
};

const myFragmentsReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_FRAGMENTS:
			return {
				...state,
				fragments: action.data.fragments.data,
				currentFragmentsCount: action.data.meta.total,
				totalFragmentsCount: action.data.fragments.all_count,
				lastPage: action.data.meta.last_page,
				pageSize: action.data.meta.per_page
			};

		case SET_CURRENT_PAGE:
			const prevPage = action.page === 1 ? 1 : action.page - 1;
			const nextPage = action.page === state.lastPage ? state.lastPage : action.page + 1;
			return {
				...state,
				currentPage: action.page,
				nextPage: nextPage,
				prevPage: prevPage
			};

		case SET_IS_FETCHING:
			return {...state, isFetching: action.isFetching};

		case SET_SEARCH_TITLE:
			return {
				...state,
				searchTitle: action.searchTitle
			};

		case SET_SEARCH_TYPE:
			return {
				...state,
				searchType: action.searchType
			};

		case ADD_SEARCH_TAG:
			return {
				...state,
				searchTags: [...state.searchTags, action.tag],
			};

		case DELETE_SEARCH_TAG:
			return {
				...state,
				searchTags: state.searchTags.filter(tag => tag.id !== action.tag.id),
			};

		default:
			return state;
	}
};

const setFragments = (data) => ({type: SET_FRAGMENTS, data});
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});
const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});

export const setSearchTitle = (searchTitle) => ({type: SET_SEARCH_TITLE, searchTitle});
export const setSearchType = (searchType) => ({type: SET_SEARCH_TYPE, searchType});
export const addSearchTag = (tag) => ({type: ADD_SEARCH_TAG, tag});
export const deleteSearchTag = (tag) => ({type: DELETE_SEARCH_TAG, tag});

export const getFragments = (page, pageNumber, title, type, tags) => (dispatch) => {
	let getFragments;
	switch (page) {
		case 'catalog':
			getFragments = fragmentsAPI.getFragments;
			break;

		case 'my-fragments':
			getFragments = fragmentsAPI.geMyFragments;
			break;

		case 'favorite':
			getFragments = fragmentsAPI.getFavorites;
			break;

		default:
			getFragments = fragmentsAPI.getFragments;
			break;
	}
	dispatch(setIsFetching(true));
	getFragments(pageNumber, title, type, tags)
		.then(res => {
			dispatch(setFragments(res.data));
			dispatch(setCurrentPage(pageNumber));
			dispatch(setIsFetching(false));
		})
		.catch(err => {
			console.log(err.response);
			dispatch(setIsFetching(false));
		})
};

export const changeFavorite = (id) => () => {
	return fragmentsAPI.changeFavorite(id)
		.then(() => {})
		.catch(() => {})
};

export default myFragmentsReducer;