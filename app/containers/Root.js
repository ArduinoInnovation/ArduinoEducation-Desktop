// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  store: Store<any>,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <CssBaseline />
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}
