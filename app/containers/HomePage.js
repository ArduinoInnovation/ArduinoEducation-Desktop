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
import { remote } from 'electron';
import fs from 'fs';
import * as CodingActions from '../actions/coding';
import type { RootStateType } from '../reducers/types';
import NewSectionDialog from '../components/NewSectionDialog';
import type { CodingProps } from '../actions/coding/types';
import Styles from '../components/NewModule.scss';
import DragBoard from '../components/DragBoard';
import generateId from '../utils/idGenerator';
import Background from '../../resources/undraw_scrum_board_cesn.svg';
import Empty from '../../resources/undraw_no_data_qbuo.svg';

const { dialog } = remote;

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
    background: 'white',
    borderRight: '1px solid #80808054'
  },
  right: {
    height: 'calc(100vh - 48px)',
    flexGrow: 1,
    background: '#f8faff'
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

  export = () => {
    const {
      coding: { lines = [] }
    } = this.props;

    // console.log(
    //   'ab$c$'.replace(new RegExp(`(?<!\\\\)\\$${'c'}[^\\\\]?\\$`, 'g'), 'e')
    // );
    const content = lines.reduce((previousContent, currentLine) => {
      console.log('previousContent', previousContent);
      const {
        module: { processes = [] }
      } = currentLine;
      console.log('processes', processes);

      const allText = processes.reduce((preText, currentProcess) => {
        // eslint-disable-next-line prefer-destructuring
        let plain = currentProcess.plain;

        // eslint-disable-next-line no-restricted-syntax
        for (const element of currentProcess.params) {
          plain = plain.replace(
            new RegExp(`(?<!\\\\)\\$${element.name}[^\\\\]?\\$`, 'g'),
            element.value
          );
        }
        console.log(plain);
        return preText + plain;
      }, '');

      return previousContent + allText;
    }, '');

    // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
    dialog.showSaveDialog(fileName => {
      if (fileName === undefined) {
        console.log("You didn't save the file");
        return;
      }

      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, content, err => {
        if (err) {
          alert(`An error ocurred creating the file ${err.message}`);
        }

        alert('The file has been succesfully saved');
      });
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
              <Button onClick={this.export} color="inherit">
                export
              </Button>
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
            <List style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
              {modules.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    style={{ margin: '0 auto', paddingTop: 100 }}
                    src={Empty}
                    alt=""
                    width={120}
                  />
                  <Typography variant="subheading" align="center">
                    Add action first
                  </Typography>
                </div>
              ) : (
                modules.map(item => (
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
                ))
              )}
            </List>
          </section>
          <section className={classes.right}>
            <div className={Styles.rightSection}>
              {lines.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    alt=""
                    style={{
                      width: 500,
                      margin: '0 auto',
                      padding: '50px 20px'
                    }}
                    src={Background}
                  />
                  <Typography variant="title" align="center">
                    LETS BEGIN
                  </Typography>
                </div>
              ) : (
                <DragBoard
                  processItems={lines}
                  reorderProcess={items => setLines(items)}
                />
              )}
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
