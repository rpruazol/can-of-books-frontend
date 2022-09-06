import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import BookModal from './BookModal';
import Spinner from 'react-bootstrap/Spinner';
import { withAuth0 } from '@auth0/auth0-react';
//import { useAuth0 } from '@auth0/auth0-react';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentBook: {},
      show: false,
      updateClicked: false,
      errorMessage: '',
      isLoading: false
    };
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  async componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      this.getBooks();
    }
  }

  getBooks = async () => {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;

    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/books'
    };
    const response = await axios(config);
    this.setState({ books: response.data });
  };

  showBookModal = () => {
    this.setState({ show: true }, () => console.log('show state: ', this.state.show));
  };

  handleCloseModal = () => {
    //console.log('handleCloseModal', e.target);
    this.setState({ show: false, currentBook: {} });
  };

  createBook = async (bookToBeCreated) => {

    try {
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/books',
        data: bookToBeCreated
      };
      const response = await axios(config);
      this.setState({ books: [...this.state.books, response.data] });
    } catch (error) {
      console.error('something went wrong ', error);
      this.setState({ errorMessage: `status code: ${error.response} : ${error.response}` });
    }
  };

  deleteBook = async (bookToBeDeleted) => {
    try {
      const proceed = window.confirm(`Are you sure you want to delete this book?`);
      if (proceed) {
        this.setState({ isLoading: true });
        const config = {
          method: 'delete',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/book/${bookToBeDeleted}`
        };
        await axios(config);
        const booksArray = this.state.books.filter(book => book._id !== bookToBeDeleted);
        this.setState({ books: booksArray, isLoading: false });
      }
    } catch (e) {
      console.error(e);
    }

  };

  updateModal = (book) => {
    this.setState({ updateClicked: true, currentBook: book });
    this.showBookModal();
  };

  updateBook = async (updatedBook) => {
    try {
      const config = {
        method: 'put',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/books/${updatedBook._id}`,
        data: updatedBook
      };
      const response = await axios(config);
      const updatedBooks = this.state.books.filter((book) => book._id !== updatedBook._id);
      this.setState({ books: [...updatedBooks, response.data], updateClicked: false }, () => console.log('updateClicked: ', this.state.updateClicked));

    } catch (error) {
      console.error(error);
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
                    <Button className="m-3" disabled={this.state.isLoading} onClick={() => this.deleteBook(book._id)}>{this.state.isLoading ? (<><Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /><span>Loading..</span></>)
                      : 'Delete Book'}

                    </Button>
                    <Button onClick={() => this.updateModal(book)}>Update Book</Button>
                  </Carousel.Caption>


                </Carousel.Item>
              ))}
            </Carousel>

          </Container>
        ) : (
          <>
            <h3>No Books Found :(</h3>
          </>
        )}
        <Button className="m-auto align-self-center" onClick={this.showBookModal}>Add Book</Button>
        <BookModal
          createBook={this.createBook}
          updateBook={this.updateBook}
          show={this.state.show}
          handleCloseModal={this.handleCloseModal}
          updateClicked={this.state.updateClicked}
          currentBook={this.state.currentBook}
        />
      </>
    );
  }
}

export default withAuth0(BestBooks);
