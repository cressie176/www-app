import React from 'react';
import PropTypes from 'prop-types';
import IconListItem from './IconListItem';
import { connect, } from 'react-redux';
import { removeObfuscation, } from '../../actions/obfuscationActions';

import './LinksSpotlight.css';

export class LinksSpotlight extends React.Component {

  render() {
    const obfuscation = this.props.obfuscate ? 'obfuscated' : 'clear';
    return <div className={`links-spotlight links-spotlight--${this.props.type}`}>
      <h2 className='links-spotlight__title'>{this.props.title}</h2>
      <ul
        className={`links-spotlight__list links-spotlight__list--${obfuscation}`}
        onMouseOver={() => this.props.removeObfuscation(this.props.type)}
      >
        {
          this.props.links.map((link, index) => {
            const text = this.props.obfuscate ? link.text.replace(/\w/g, 'x') : link.text;
            const url = this.props.obfuscate ? '' : link.url;
            return (
              <IconListItem icon={link.icon} key={index} text={text} url={url} type={this.props.type} />
            );
          })
        }
      </ul>
    </div>;
  }
}

LinksSpotlight.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  links: PropTypes.array,
};

function mapStateToProps(state, props) {
  return {
    obfuscate: !!state.obfuscation[props.type],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeObfuscation: (id) => {
      dispatch(removeObfuscation(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksSpotlight);
