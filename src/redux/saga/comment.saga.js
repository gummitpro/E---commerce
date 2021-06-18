import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {URL} from '../../contrains/App'

function* commentSaga(action) {
	try {
	const {productId, inforComment, currentTime} = action.payload;
	const result = yield axios({
		method: 'POST',
		url: URL + '/comments',
		data: {
			productId,
			inforComment,
			currentTime
		}
	});
	if (result.data) {
		yield put({
			type: "ADD_COMMENT_SUCCESS",
			payload: {
				// data: result.data[0],
				data: result.data,
			},
		});
		
		// yield put({
		// 	type: "GET_COMMENT_LIST_REQUEST",
		// 	payload: {
		// 		// data: result.data[0],
		// 		data: result.data,
		// 	},
		// });
	} else {
		yield put({
			type: "ADD_COMMENT_FAIL",
			payload: {
				error: 'FAIL',
			},
		});
		
	}} catch (error) {
		console.log(error)
	}
	
}

function* getCommentListSaga(action) {
	try {
		const { id } = action.payload;
		const result = yield axios({
		  method: 'GET',
		  url: URL + '/comments?productId='+id+ '&_sort=id&_order=desc'
		});
		yield put({
		  type: "GET_COMMENT_SUCCESS",
		  payload: {
			 data: result.data
		  },
		});
		
	 } catch (e) {
		yield put({
		  type: "GET_COMMENT_FAIL",
		  payload: {
			 error: e.error
		  },
		});
	 }
}

export default function* productSaga() {
	yield takeEvery('GET_COMMENT_LIST_REQUEST', getCommentListSaga);
	yield takeEvery('ADD_COMMENT_REQUEST', commentSaga);
}
