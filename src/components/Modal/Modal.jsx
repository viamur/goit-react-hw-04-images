import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modalRoot');

const Modal = ({ toggleModale, forModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModale();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line
  }, []);

  const handleCloseBackdrop = e => {
    if (e.target.nodeName !== 'DIV') return;
    toggleModale();
  };

  return createPortal(
    <div className="overlay" onClick={handleCloseBackdrop}>
      <div className="modal">
        <img src={forModal.src} alt={forModal.alt} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  toggleModale: PropTypes.func.isRequired,
  forModal: PropTypes.object.isRequired,
};
