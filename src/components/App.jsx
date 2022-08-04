import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [receivedData, setReceivedData] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState('static'); /* loading, static, modal, error */
  const [forModal, setForModal] = useState({});
  const [error, setError] = useState('');

  const firstStartRef = useRef(null);

  useEffect(() => {
    if (query === '') return;
    const dataRequest = async () => {
      try {
        const data = await api(query, page);

        setReceivedData(prev => [...prev, ...data.hits]);
        setStatus('static');
        setTotalHits(data.totalHits);
      } catch (error) {
        setStatus('error');
        setError(error);
      }
    };
    setStatus('loading');
    firstStartRef.current = document.body.clientHeight;
    dataRequest();
  }, [page, query]);

  useEffect(() => {
    console.log(firstStartRef.current);
    if (page > 1) {
      window.scrollTo({
        top: firstStartRef.current - 150,
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line
  }, [receivedData]);

  const onSubmit = queryA => {
    if (query === queryA && page === 1) return;
    setQuery(queryA);
    setReceivedData([]);
    setPage(1);
    setTotalHits(null);
    firstStartRef.current = null;
  };

  const onClick = () => {
    setPage(prev => prev + 1);
  };

  const onOpenModal = (src, alt) => {
    setStatus('modal');
    setForModal({ src, alt });
  };

  const toggleModale = () => {
    setStatus('static');
  };

  const totalPage = Math.ceil(totalHits / 12);
  return (
    <>
      <div className="app">
        <Searchbar onSubmit={onSubmit} />

        {receivedData.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem data={receivedData} onOpenModal={onOpenModal} />
          </ImageGallery>
        )}

        {status === 'loading' && <Loader />}

        {status === 'error' && <p style={{ textAlign: 'center' }}>{error.message}</p>}

        {totalPage > page && <Button onClick={onClick} />}
      </div>
      {status === 'modal' && <Modal forModal={forModal} toggleModale={toggleModale} />}
    </>
  );
};
