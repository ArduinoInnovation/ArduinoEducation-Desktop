// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as CodingActions from '../actions/coding';
import type { RootStateType } from '../reducers/types';
import type { CodingState } from '../reducers/coding';
import type {
  CodingActionAddLine
  // CodingActionRemoveLine
} from '../actions/coding';

type Props = {
  coding: CodingState,
  addLine: CodingActionAddLine
  // removeLine: CodingActionRemoveLine
};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    const { coding, addLine } = this.props;
    addLine({ id: '1', name: '2' });
    return <div>{coding}</div>;
  }
}

function mapStateToProps(state: RootStateType) {
  return {
    coding: state.coding
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CodingActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
