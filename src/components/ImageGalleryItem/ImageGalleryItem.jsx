import PropTypes from 'prop-types';

const ImageGalleryItem = ({ data, onOpenModal }) => {
  return data.map(el => (
    <li className="imageGalleryItem" key={el.id}>
      <img
        src={el.webformatURL}
        className="imageGalleryItem-image"
        alt={el.tags}
        onClick={() => onOpenModal(el.largeImageURL, el.tags)}
      />
    </li>
  ));
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
