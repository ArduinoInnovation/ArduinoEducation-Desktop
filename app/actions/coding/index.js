// @flow
import type {
  CodingActionAddLine,
  CodingActionChangeDialog,
  CodingActionRemoveLine
} from './types';

export const CODING_CHANGE_DIALOG = 'CODING_CHANGE_DIALOG';
export const CODING_ADD_LINE = 'CODING_ADD_LINE';
export const CODING_REMOVE_LINE = 'CODING_REMOVE_LINE';

export const addLine: CodingActionAddLine = line => ({
  type: CODING_ADD_LINE,
  payload: line
});

export const removeLine: CodingActionRemoveLine = id => ({
  type: CODING_REMOVE_LINE,
  payload: id
});

export const changeDialog: CodingActionChangeDialog = isOpen => ({
  type: CODING_CHANGE_DIALOG,
  payload: isOpen
});
