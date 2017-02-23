import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POSTS = 'CREATE_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const SORT_LIST = 'SORT_LIST';
export const GET_NEXT = 'GET_NEXT';
export const RESET_VALUE = 'RESET_VALUE';

const ROOT_URL = 'http://localhost:3012/films';

export function fetchPosts() {
    const request = axios.get(ROOT_URL);

    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function createPost(props) {
    const request = axios.post(ROOT_URL, props);

    return {
        type: CREATE_POSTS,
        payload:request
    }
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/${id}`);

    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id) {
    const request = axios.delete(`${ROOT_URL}/${id}`);

    return {
        type: DELETE_POST,
        payload: request
    }
}

export function editPost(id, props) {
    const request = axios.put(`${ROOT_URL}/${id}`, props);


    return {
        type: EDIT_POST,
        payload: request
    }
}

export function sortList(target) {

    return {
        type: SORT_LIST,
        payload: target
    }
}

export function getNext() {
    const request = axios.get(`${ROOT_URL}/next`);

    return {
        type: GET_NEXT,
        payload: request
    }
}

export function resetValue() {
    axios.get(`${ROOT_URL}/reset`);

    return {
        type: RESET_VALUE,
        payload: null
    }
}