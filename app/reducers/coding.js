// @flow
import type { Action } from './types';
import type { CodingPayload } from '../actions/coding';
import { CODING_ADD_LINE, CODING_REMOVE_LINE } from '../actions/coding';

export type CodingState = {
  lines: CodingLineItem[]
};

export type CodingLineItem = {
  id: string,
  name: string,
  params?: Parameter[]
};

export type Parameter = {
  id: string,
  name: string,
  value?: string
};

export default function coding(
  state: CodingState = { lines: [] },
  action: Action<CodingPayload>
): CodingState {
  const { lines = [] } = state;
  switch (action.type) {
    case CODING_ADD_LINE:
      return { ...state, lines: [...lines, action.payload] };
    case CODING_REMOVE_LINE:
      return {
        ...state,
        lines: lines.filter(
          (item: CodingLineItem) => item.id !== action.payload
        )
      };
    default:
      return state;
  }
}
