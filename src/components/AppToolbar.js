import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import * as GameStates from '../constants/GameStates';

const AppToolbar = ({ gameState, stats = {}, onStartClick, onEndClick }) => {

  let actions;
  if (gameState !== GameStates.ACTIVE) {
    actions = (<ToolbarGroup>
      <ToolbarSeparator />
      <RaisedButton 
          className={"toolbar-btn"}
          label={"Start a Game"}
          primary={true}
          onClick={onStartClick} />
      </ToolbarGroup>);
  } else {
    actions = (<ToolbarGroup>
      <ToolbarSeparator />
        <Chip
          className={"toolbar-chip"}
          backgroundColor={'#eefbff'}>
          <Avatar size={32} color={'#eefbff'} backgroundColor={'#101046'}>
            {stats.attempts || 0}
          </Avatar>
          {"Attempts"}
        </Chip>
        <Chip
          className={"toolbar-chip"}
          backgroundColor={'#eefbff'}>
          <Avatar size={32} color={'#eefbff'} backgroundColor={'#101046'}>
            {stats.matches || 0}
          </Avatar>
          {"Matches"}
        </Chip>
        <ToolbarSeparator />
        <RaisedButton 
          className={"toolbar-btn"}
          label={"End Game"}
          primary={false}
          onClick={onEndClick} />
      </ToolbarGroup>);
  }

  return (
    <Toolbar className={"toolbar"}>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle className={"toolbar-title"} text={"ReactJS Memory Game"} />
        </ToolbarGroup>
        {actions}
      </Toolbar>
  );
};

export default AppToolbar;
