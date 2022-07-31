import PropTypes from 'prop-types';

const ImageGalleryItem = ({ data }) => {
  return data.map(el => (
    <li className="imageGalleryItem" key={el.id}>
      <img
        src={el.webformatURL}
        className="imageGalleryItem-image"
        data={el.largeImageURL}
        alt={el.tags}
      />
    </li>
  ));
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.array.isRequired,
};
