import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import * as GameStates from '../constants/GameStates';

const AppToolbar = ({ gameState, stats = {}, onStartClick, onEndClick }) => {

  const bgColor = '#eefbff',
    chipColor = '#101046',
    avatarSize = 32;

  const formatStat = (stat) => (stat || 0);

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
          backgroundColor={bgColor}>
          <Avatar size={avatarSize} color={bgColor} backgroundColor={chipColor}>
            {formatStat(stats.attempts)}
          </Avatar>
          {"Attempts"}
        </Chip>
        <Chip
          className={"toolbar-chip"}
          backgroundColor={bgColor}>
          <Avatar size={avatarSize} color={bgColor} backgroundColor={chipColor}>
            {formatStat(stats.matches)}
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
