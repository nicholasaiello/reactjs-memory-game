import React from 'react';
import renderer from 'react-test-renderer';

import Card from './Card';

describe('Card object', () => {

  it('card facing down', () => {
    const component = renderer.create(
      <Card value={7} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card facing up', () => {
    const component = renderer.create(
      <Card value={7} open={true} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card matched', () => {
    const component = renderer.create(
      <Card value={7} open={true} matched={true} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
