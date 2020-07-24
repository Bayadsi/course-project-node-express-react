import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '.';

export default function createAsyncThunk<R, S, F>(
  actionBuilder: any,
  worker: (
    params: R,
    getState: () => RootState,
    dispatch: ThunkDispatch<any, any, any>
  ) => Promise<S>
) {
  return (params: R) => async (
    dispatch: ThunkDispatch<any, any, any>,
    getState: () => RootState,
  ) => {
    dispatch(actionBuilder.request);
    try {
      const result = await worker(params, getState, dispatch);

      dispatch(actionBuilder.success(result));
      return result;
    } catch (error) {
      dispatch(actionBuilder.failure(error as F));
    }
    return {};
  };
}
