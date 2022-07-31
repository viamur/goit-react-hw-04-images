import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modalRoot');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModale();
    }
  };

  handleCloseBackdrop = e => {
    if (e.target.nodeName !== 'DIV') return;
    this.props.toggleModale();
  };

  render() {
    const { forModal } = this.props;
    return createPortal(
      <div className="overlay" onClick={this.handleCloseBackdrop}>
        <div className="modal">
          <img src={forModal.src} alt={forModal.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggleModale: PropTypes.func.isRequired,
  forModal: PropTypes.object.isRequired,
};
