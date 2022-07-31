import { Component } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    receivedData: [],
    totalHits: null,
    status: 'static',
    forModal: {},
  };
  /* loading, static, modal, error */
  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: 'loading' });
      this.dataRequest();
    }
  }

  async dataRequest() {
    const { page, query } = this.state;
    const searchParams = new URLSearchParams({
      q: query,
      page,
      key: '28511639-fd0b78e787d23185784d45556',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    });
    try {
      const data = await axios.get(`https://pixabay.com/api/?${searchParams}`);
      this.setState(prevState => ({
        receivedData: [...prevState.receivedData, ...data.data.hits],
        totalHits: data.data.totalHits,
        status: 'static',
      }));
    } catch (error) {
      this.setState({ status: 'error' });
    }
  }

  onSubmit = async query => {
    this.setState({ query, receivedData: [], page: 1 });
  };

  onClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = e => {
    const src = e.target.dataset.src;
    const alt = e.target.alt;
    this.setState({ status: 'modal', forModal: { src, alt } });
  };

  toggleModale = () => {
    this.setState({ status: 'static' });
  };

  render() {
    const { page, totalHits, status, forModal, receivedData } = this.state;
    const totalPage = Math.ceil(totalHits / 12);

    return (
      <>
        <div className="app">
          <Searchbar onSubmit={this.onSubmit} />

          {totalHits === 0 ? (
            <p style={{ textAlign: 'center' }}>Ничего не найдено</p>
          ) : (
            <ImageGallery>
              <ImageGalleryItem data={this.state.receivedData} onOpenModal={this.onOpenModal} />
            </ImageGallery>
          )}

          {status === 'loading' && <Loader />}

          {status === 'error' && <p>ОШИБКА </p>}

          {totalPage > page && <Button onClick={this.onClick} />}
        </div>
        {status === 'modal' && <Modal forModal={forModal} toggleModale={this.toggleModale} />}
      </>
    );
  }
}
