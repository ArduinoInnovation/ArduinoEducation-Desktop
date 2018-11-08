// @flow
import type { Action } from '../reducers/types';
import type { CodingLineItem } from '../reducers/coding';

export const CODING_ADD_LINE = 'CODING_ADD_LINE';
export const CODING_REMOVE_LINE = 'CODING_REMOVE_LINE';

export type CodingPayload = CodingLineItem | number;

export type CodingActionAddLine = (
  line: CodingLineItem
) => Action<CodingLineItem>;

export type CodingActionRemoveLine = (id: number) => Action<CodingLineItem>;

export const addLine: CodingActionAddLine = line => ({
  type: CODING_ADD_LINE,
  payload: line
});

export const removeLine: CodingActionRemoveLine = id => ({
  type: CODING_REMOVE_LINE,
  payload: id
});
