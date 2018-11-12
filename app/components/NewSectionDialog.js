import Slide from '@material-ui/core/Slide/Slide';
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import withStyles from '@material-ui/core/es/styles/withStyles';
import NewModule from './NewModule';
import NewProcess from './NewProcess';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = () => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
});

type Props = {
  open: boolean,
  onClose: () => void,
  classes?: Class
};

class NewSectionDialog extends Component<Props> {
  state = {
    tabIndex: 'one'
  };

  handleChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  render() {
    const { open, onClose, classes } = this.props;
    const { tabIndex } = this.state;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden'
          }}
        >
          <AppBar position="static" className={classes.appBar}>
            <Toolbar variant="dense">
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>

              <Tabs
                centered
                value={tabIndex}
                onChange={this.handleChange}
                className={classes.flex}
              >
                <Tab value="one" label="新增过程" />
                <Tab value="two" label="新增模块" />
              </Tabs>
              <div style={{ width: 48 }} />
            </Toolbar>
          </AppBar>
          <div style={{ flex: 1 }}>
            {tabIndex === 'one' && <NewProcess />}
            {tabIndex === 'two' && <NewModule />}
          </div>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NewSectionDialog);
