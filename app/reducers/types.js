import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import type { CodingState } from './coding';

export type RootStateType = {
  +counter: number,
  +coding: CodingState
};

export type Action<T> = {
  +type: string,
  +payload: T
};

export type GetState = () => RootStateType;

export type Dispatch<T> = ReduxDispatch<Action<T>>;

export type Store<T> = ReduxStore<GetState, Action<T>>;
