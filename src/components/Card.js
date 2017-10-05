import React, { Component } from 'react';

class Card extends Component {


  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  getValue = () => ( this.props.value )

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
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
      body = this.props.value;
      className += ' open';
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
