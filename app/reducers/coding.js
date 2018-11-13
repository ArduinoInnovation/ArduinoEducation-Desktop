// @flow
import type { Action } from './types';
import {
  ADD_MODULE,
  ADD_PROCESS,
  CODING_ADD_LINE,
  CODING_CHANGE_DIALOG,
  CODING_REMOVE_LINE,
  CODING_SET_LINES
} from '../actions/coding';
import type { CodingPayload } from '../actions/coding/types';

export type CodingState = {
  lines: CodingLineItem[],
  isCodingDialogOpen: boolean,
  processes: [],
  modules: []
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
  state: CodingState = {
    lines: [],
    isCodingDialogOpen: false,
    process: [],
    modules: []
  },
  action: Action<CodingPayload>
): CodingState {
  const { lines = [], process, modules } = state;
  switch (action.type) {
    case CODING_CHANGE_DIALOG:
      return { ...state, isCodingDialogOpen: action.payload };
    case ADD_PROCESS:
      return { ...state, process: [...process, action.payload] };
    case ADD_MODULE:
      return { ...state, modules: [...modules, action.payload] };
    case CODING_SET_LINES:
      return { ...state, lines: action.payload };
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
