import { all, call } from 'typed-redux-saga/macro';

// Sagas
import { categoriesSaga } from './categories/categorySaga';
import { userSagas } from './user/userSaga';

// Generator Function
export function* rootSaga() {
	yield* all([call(categoriesSaga), call(userSagas)]);
}
