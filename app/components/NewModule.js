import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import withStyles from '@material-ui/core/es/styles/withStyles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import type { CodingProps } from '../actions/coding/types';
import type { RootStateType } from '../reducers/types';
import * as CodingActions from '../actions/coding';
import Styles from './NewModule.scss';

const styles = theme => ({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

type Props = CodingProps & {
  classes?: Class
};

class NewModule extends Component<Props> {
  props: Props;

  state = {};

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { name = '' } = this.state;
    return (
      <div className={Styles.newModule}>
        <div className={classes.button}>
          <Button variant="fab" color="primary" aria-label="Add">
            <SaveIcon />
          </Button>
        </div>
        <div className={Styles.bottomSection}>
          <div className={Styles.leftSection}>
            <div className={Styles.nameSection}>
              <TextField
                id="outlined-name"
                label="模块名称"
                fullWidth
                // className={classes.textField}
                value={name}
                onChange={this.handleChange}
                margin="none"
                variant="filled"
              />
            </div>
          </div>
          <div className={Styles.rightSection} />
        </div>
      </div>
    );
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewModule)
);
