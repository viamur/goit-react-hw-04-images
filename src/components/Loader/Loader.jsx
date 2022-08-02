// import { Oval } from 'react-loader-spinner';
// import { array } from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import ImageGallery from '../ImageGallery/ImageGallery';
import 'react-loading-skeleton/dist/skeleton.css';

const Loader = () => {
  const array = Array(12).fill(0);
  return (
    <ImageGallery>
      {array.map((el, idx) => (
        <li className="imageGalleryItem" key={idx}>
          <Skeleton style={{ width: 353 }} className="imageGalleryItem-image" />
        </li>
      ))}
    </ImageGallery>
    // <Oval
    //   height={80}
    //   width={80}
    //   color="#4fa94d"
    //   wrapperStyle={{}}
    //   wrapperClass="loader"
    //   visible={true}
    //   ariaLabel="oval-loading"
    //   secondaryColor="#4fa94d"
    //   strokeWidth={2}
    //   strokeWidthSecondary={2}
    // />
  );
};

export default Loader;
