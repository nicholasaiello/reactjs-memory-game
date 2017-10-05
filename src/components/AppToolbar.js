import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const styles = {
  title: {
    marginLeft: '16px'
  },
  chip: {
    margin: '0 4px 0 24px',
    color: '#fff',
    textTransform: 'uppercase'
  },
  button: {
    marginRight: '0px'
  }
};

const AppToolbar = ({ gameStarted, gameStats = {}, onStartClick, onEndClick }) => {

  let actions;
  if (!gameStarted) {
    actions = (<ToolbarGroup>
      <ToolbarSeparator />
      <RaisedButton 
          label={"Start a Game"}
          style={styles.button} 
          primary={true}
          onClick={onStartClick} />
      </ToolbarGroup>);
  } else {
    actions = (<ToolbarGroup>
      <ToolbarSeparator />
        <Chip
          backgroundColor={'lightblue'}
          style={styles.chip}>
          <Avatar size={32} color={'lightblue'} backgroundColor={'darkblue'}>
            {gameStats.attempts || 0}
          </Avatar>
          {"Attempts"}
        </Chip>
        <Chip
          backgroundColor={'lightblue'}
          style={styles.chip}>
          <Avatar size={32} color={'lightblue'} backgroundColor={'darkblue'}>
            {gameStats.matches || 0}
          </Avatar>
          {"Matches"}
        </Chip>
        <ToolbarSeparator />
        <RaisedButton 
          label={"End Game"}
          style={styles.button} 
          primary={false}
          onClick={onEndClick} />
      </ToolbarGroup>);
  }

  return (
    <Toolbar style={{zIndex: 2}}>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text={"ReactJS Memory Game"} style={styles.title} />
        </ToolbarGroup>
        {actions}
      </Toolbar>
  );
};

export default AppToolbar;
