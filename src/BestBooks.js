import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import BookModal from './BookModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      errorMessage: ''
    };
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  async componentDidMount() {
    const url = `${process.env.REACT_APP_SERVER_URL}/books`;
    const response = await axios.get(url);
    console.log(response.data);
    this.setState({ books: response.data });
  }

  showBookModal = () => {
    console.log('showBookModal');
    this.setState({ show: true }, () => console.log('show state: ', this.state.show));
  };

  handleCloseModal = (e) => {
    console.log('handleCloseModal', e.target);
    this.setState({ show: false });
  };

  createBook = async (bookToBeCreated) => {

    try {
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/books',
        data: bookToBeCreated
      };
      console.log('config:', config);
      const response = await axios(config);
      console.log(response.data);
      this.setState({ books: [...this.state.books, response.data] });
    } catch (error) {
      console.error('something went wrong ', error);
      this.setState({ errorMessage: `status code: ${error.response} : ${error.response}` });
    }
  };

  deleteBook = async (bookToBeDeleted) => {
    console.log('deleteBook', bookToBeDeleted);
    try {
      const config = {
        method: 'delete',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/book/${bookToBeDeleted}`
      };
      const response = await axios(config);
      const booksArray = this.state.books.filter(book => book._id !== bookToBeDeleted);
      this.setState({ books: booksArray });
      console.log(response);
      console.log('deleted the book!');
    } catch (e) {
      console.error(e);
    }
  };

  render() {


    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
          <Container className="m-auto align-self-center w-50">
            <Carousel >
              {this.state.books.map((book) => (
                <Carousel.Item key={book._id}>
                  <img
                    className="d-block w-100"
                    src="/books.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                    <p>{book.status}</p>
                  </Carousel.Caption>
                  <Button className="m-3" onClick={() => this.deleteBook(book._id)} className="m-auto align-self-center">Delete Book</Button>

                </Carousel.Item>
              ))}
            </Carousel>
            <BookModal
              createBook={this.createBook}
              show={this.state.show}
              handleCloseModal={this.handleCloseModal}
            />
          </Container>
        ) : (
          <>
            <h3>No Books Found :(</h3>
          </>
        )}
        <Button className="m-auto align-self-center" onClick={this.showBookModal}>Add Book</Button>
      </>
    );
  }
}

export default BestBooks;
