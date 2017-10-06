import React, { Component } from 'react';

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return { open: false, matched: false };
  }

  get value () { return this.props.value }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  markAsMatched = () => {
    this.setState({ matched: true });
  }

  handleClick = () => {
    this.toggleOpen();

    // comes from parent component
    this.props.onClick(this);
  }

  render() {

    let body = '',
      className = 'card',
      onClick = () => { this.handleClick() };
    
    if (this.state.open) {
      body = (<div>{this.props.value}</div>);
      className += ' open' + (this.state.matched ? ' matched' : '');
      onClick = () => {};
    }

    return (
      <div className={className} onClick={onClick}>
        {body}
      </div>
    );

  }

};

Card.defaultProps = {
  value: -1,
  index: -1,
  onClick: () => {}
};

export default Card;
