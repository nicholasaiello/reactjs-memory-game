import React from 'react';
import renderer from 'react-test-renderer';

import * as GameStates from '../constants/GameStates';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppToolbar from './AppToolbar';

describe('AppToolbar', () => {

  it('renders toolbar for inactive game', () => {
    const state = {state: GameStates.INACTIVE, prevState: GameStates.INACTIVE};
    const component = renderer.create(
      <MuiThemeProvider>
        <AppToolbar stats={{}} gameState={state} onStartClick={() => {}} onEndClick={() => {}} />
      </MuiThemeProvider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toolbar for active game', () => {
    const stats = {attempts: 0, matches: 0};
    const state = {state: GameStates.ACTIVE, prevState: GameStates.ACTIVE};

    const component = renderer.create(
      <MuiThemeProvider>
        <AppToolbar stats={stats} gameState={state} onStartClick={() => {}} onEndClick={() => {}} />
      </MuiThemeProvider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
