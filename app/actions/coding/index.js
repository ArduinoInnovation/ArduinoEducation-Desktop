// @flow
import type {
  CodingActionAddLine,
  CodingActionAddModule,
  CodingActionAddProcess,
  CodingActionChangeDialog,
  CodingActionRemoveLine,
  CodingActionSetLines
} from './types';
import generateId from '../../utils/idGenerator';

export const CODING_CHANGE_DIALOG = 'CODING_CHANGE_DIALOG';
export const CODING_ADD_LINE = 'CODING_ADD_LINE';
export const CODING_SET_LINES = 'CODING_SET_LINES';
export const CODING_REMOVE_LINE = 'CODING_REMOVE_LINE';
export const ADD_PROCESS = 'ADD_PROCESS';
export const ADD_MODULE = 'ADD_MODULE';

export const addLine: CodingActionAddLine = line => ({
  type: CODING_ADD_LINE,
  payload: line
});

export const removeLine: CodingActionRemoveLine = id => ({
  type: CODING_REMOVE_LINE,
  payload: id
});

export const setLines: CodingActionSetLines = lines => ({
  type: CODING_SET_LINES,
  payload: lines
});

export const changeDialog: CodingActionChangeDialog = isOpen => ({
  type: CODING_CHANGE_DIALOG,
  payload: isOpen
});

export const addProcess: CodingActionAddProcess = process => ({
  type: ADD_PROCESS,
  payload: { id: generateId(), ...process }
});

export const addModules: CodingActionAddModule = module => ({
  type: ADD_MODULE,
  payload: { id: generateId(), ...module }
});
