// @flow
import type { Action } from '../../reducers/types';
import type { CodingLineItem, CodingState } from '../../reducers/coding';

export type CodingProps = {
  coding?: CodingState,
  addLine?: CodingActionAddLine,
  removeLine?: CodingActionRemoveLine,
  changeDialog?: CodingActionChangeDialog,
  addProcess?: CodingActionAddProcess,
  addModules?: CodingActionAddModule,
  setLines?: CodingActionSetLines
};

export type CodingPayload = CodingLineItem | number | boolean;

export type CodingActionAddLine = (
  line: CodingLineItem
) => Action<CodingLineItem>;

export type CodingActionSetLines = (
  lines: CodingLineItem[]
) => Action<CodingLineItem[]>;

export type CodingActionRemoveLine = (id: number) => Action<CodingLineItem>;

export type CodingActionChangeDialog = (isOpen: boolean) => Action<boolean>;

export type CodingActionAddProcess = (process: any) => Action<any>;

export type CodingActionAddModule = (module: any) => Action<any>;
