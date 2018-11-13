import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import withStyles from '@material-ui/core/es/styles/withStyles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import List from '@material-ui/core/List/List';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import ListItem from '@material-ui/core/ListItem/ListItem';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControl from '@material-ui/core/FormControl/FormControl';
import type { CodingProps } from '../actions/coding/types';
import type { RootStateType } from '../reducers/types';
import * as CodingActions from '../actions/coding';
import Styles from './NewProcess.scss';
import generateId from '../utils/idGenerator';
import CodeEditor from './CodeEditor';

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

class NewProcess extends Component<Props> {
  props: Props;

  state = {
    name: '',
    params: []
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  createParam = () => {
    this.setState(prevState => {
      const { params } = prevState;

      return {
        params: [...params, { id: generateId(), name: '' }]
      };
    });
  };

  handleParamsChange = id => ({ target: { value } }) => {
    const { params } = this.state;
    this.setState({
      params: params.map(param => {
        if (param.id === id) {
          return {
            id,
            name: value
          };
        }
        return param;
      })
    });
  };

  render() {
    const { classes } = this.props;
    const { name = '', params = [] } = this.state;
    return (
      <div className={Styles.newProcess}>
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
                label="过程名称"
                fullWidth
                // className={classes.textField}
                value={name}
                onChange={this.handleChange}
                margin="none"
                variant="filled"
              />
              <div className={Styles.listSection}>
                <List subheader={<ListSubheader>参数</ListSubheader>}>
                  {params.map((param, index) => (
                    <ListItem key={param.id}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="adornment-password">
                          参数
                          {index + 1}
                          名称
                        </InputLabel>
                        <Input
                          id="adornment-password"
                          fullWidth
                          // className={classes.textField}
                          value={param.name}
                          onChange={this.handleParamsChange(param.id)}
                          margin="none"
                          variant="standard"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton aria-label="Delete">
                                <DeleteIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </ListItem>
                  ))}
                </List>
              </div>

              <div style={{ padding: '16px 26px' }}>
                <Button onClick={this.createParam} variant="outlined" fullWidth>
                  新增参数
                </Button>
              </div>
            </div>
          </div>
          <div className={Styles.rightSection}>
            <CodeEditor />
          </div>
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
  )(NewProcess)
);
