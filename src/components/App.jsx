import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    receivedData: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
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
    const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    this.setState(prevState => ({ receivedData: [...prevState.receivedData, ...data.hits] }));
  }

  onSubmit = async query => {
    this.setState({ query, receivedData: [], page: 1 });
  };

  onClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          <ImageGalleryItem data={this.state.receivedData} />
        </ImageGallery>
        <Button onClick={this.onClick} />
      </div>
    );
  }
}
