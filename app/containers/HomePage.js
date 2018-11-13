/* eslint-disable flowtype/no-weak-types */
// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Chip from '@material-ui/core/Chip/Chip';
import * as CodingActions from '../actions/coding';
import type { RootStateType } from '../reducers/types';
import NewSectionDialog from '../components/NewSectionDialog';
import type { CodingProps } from '../actions/coding/types';
import Styles from '../components/NewModule.scss';
import DragBoard from '../components/DragBoard';
import generateId from '../utils/idGenerator';

type Props = CodingProps & {
  classes: Class
  // removeLine: CodingActionRemoveLine
};

const styles = theme => ({
  basic: {
    height: '100vh'
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  left: {
    height: '100%',
    width: '300px',
    background: 'white'
  },
  right: {
    height: 'calc(100vh - 48px)',
    flexGrow: 1
  },
  main: {
    height: '100%',
    display: 'flex'
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class HomePage extends Component<Props> {
  props: Props;

  //
  // componentDidMount() {
  //   this.props.addLine({ id: '1', name: '2' });
  // }

  handleClickOpen = () => {
    const { changeDialog } = this.props;
    changeDialog(true);
  };

  handleClose = () => {
    const { changeDialog } = this.props;
    changeDialog(false);
  };

  onListModuleClick = item => () => {
    const { addLine } = this.props;
    addLine({
      id: generateId(),
      stateId: generateId(),
      module: item,
      content: (
        <div>
          <Typography variant="h5" component="h3">
            {item.name}
          </Typography>
          <div>
            {item.processes.map(eachProcess => (
              <Chip
                key={eachProcess.stateId}
                label={eachProcess.name}
                style={{ marginRight: 16 }}
              />
            ))}
          </div>
        </div>
      )
    });
  };

  render() {
    const { coding, classes, setLines } = this.props;
    const { isCodingDialogOpen, modules, lines } = coding;
    return (
      <div className={classes.basic}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography className={classes.grow} variant="h6" color="inherit">
                ArduinoEducation
              </Typography>
              <Button color="inherit">Save</Button>
            </Toolbar>
          </AppBar>
        </div>
        <section className={classes.main}>
          <section className={classes.left}>
            <Button
              color="primary"
              variant="extendedFab"
              aria-label="Delete"
              className={classes.button}
              onClick={this.handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              NEW ACTION
            </Button>
            <List>
              {modules.map(item => (
                <ListItem
                  onClick={this.onListModuleClick(item)}
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
              ))}
            </List>
          </section>
          <section className={classes.right}>
            <div className={Styles.rightSection}>
              <DragBoard
                processItems={lines}
                reorderProcess={items => setLines(items)}
              />
            </div>
          </section>
        </section>
        <NewSectionDialog
          open={isCodingDialogOpen}
          onClose={this.handleClose}
        />
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
  )(HomePage)
);
