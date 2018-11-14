import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import withStyles from '@material-ui/core/es/styles/withStyles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
// import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography/Typography';
import DragBoard from './DragBoard';
import Styles from './NewModule.scss';
import * as CodingActions from '../actions/coding';
import type { RootStateType } from '../reducers/types';
import type { CodingProps } from '../actions/coding/types';
import generateId from '../utils/idGenerator';
import Empty from '../../resources/undraw_no_data_qbuo.svg';

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

  state = {
    name: '',
    processes: []
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  onListProcessClick = processItem => () => {
    this.setState(prevState => {
      const { processes } = prevState;
      const nextProcessId = generateId();
      return {
        processes: [
          ...processes,
          {
            stateId: nextProcessId,
            ...processItem,
            content: (
              <div>
                <Typography variant="h5" component="h3">
                  {processItem.name}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                  }}
                >
                  {processItem.params.map(item => (
                    <TextField
                      id="standard-name"
                      key={item.id}
                      label={item.name}
                      style={{
                        marginRight: 16,
                        width: 190
                      }}
                      value={item.value}
                      onChange={({ target }) => {
                        this.setState(innerState => {
                          const nextProcesses = innerState.processes.slice(0);
                          console.log(nextProcesses);
                          return {
                            processes: nextProcesses.map(each => {
                              if (each.stateId === nextProcessId) {
                                return {
                                  ...each,
                                  params: each.params.map(eachParam => {
                                    if (eachParam.id === item.id) {
                                      return {
                                        ...eachParam,
                                        value: target.value
                                      };
                                    }
                                    return eachParam;
                                  })
                                };
                              }
                              return each;
                            })
                          };
                        });
                      }}
                      margin="none"
                    />
                  ))}
                </div>
              </div>
            )
          }
        ]
      };
    });
  };

  onSave = () => {
    const { addModules, changeDialog } = this.props;
    addModules(this.state);
    changeDialog(false);
  };

  render() {
    const {
      classes,
      coding: { process = [] }
    } = this.props;
    const { processes } = this.state;
    const { name = '' } = this.state;
    return (
      <div className={Styles.newModule}>
        <div className={classes.button}>
          <Button
            onClick={this.onSave}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            <SaveIcon />
          </Button>
        </div>
        <div className={Styles.bottomSection}>
          <div className={Styles.leftSection}>
            <div className={Styles.nameSection}>
              <TextField
                id="outlined-name"
                label="Module name"
                fullWidth
                // className={classes.textField}
                value={name}
                onChange={this.handleChange}
                margin="none"
                variant="filled"
              />
            </div>
            <List style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
              {process.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    alt=""
                    style={{ margin: '0 auto', paddingTop: 100 }}
                    src={Empty}
                    width={120}
                  />
                  <Typography variant="subheading" align="center">
                    Add process first
                  </Typography>
                </div>
              ) : (
                process.map(item => (
                  <ListItem
                    onClick={this.onListProcessClick(item)}
                    key={item.id}
                    divider
                    button
                  >
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <ArrowForward />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              )}
            </List>
          </div>
          <div className={Styles.rightSection}>
            <DragBoard
              processItems={processes}
              reorderProcess={items => this.setState({ processes: items })}
            />
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
  )(NewModule)
);
