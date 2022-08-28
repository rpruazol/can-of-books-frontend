import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //book: null,
      update: this.props.update,
      currentBook: this.props.currentBook
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      title: event.target.bookTitle.value,
      description: event.target.bookDescription.value,
      status: event.target.bookStatus.value
    };

    console.log('Update Boolean value:', this.state.update);
    if (this.state.update) {
      this.props.updateBook(newBook);
    } else {
      this.props.createBook(newBook);
    }

    this.props.handleCloseModal();
  };

  updateBook = (newBook) => {
    try {
      const config = {
        method: 'put',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/books',
        data: newBook
      };
      axios(config);
    } catch (e) {
      console.log(e);
    }

  };

  handleTitleChange = (e) => {
    const book = { ...this.state.currentBook };
    book.title = e.target.value;
    this.setState({ currentBook: book });
  };


  render() {
    
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group className="mb-3" controlId="bookTitle">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            autoFocus
            defaultValue={this.state.currentBook.title || ""}
            onChange={() => this.handleTitleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={this.state.currentBook?.description || ""}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            defaultValue={this.state.currentBook || ""}
          />
        </Form.Group>
        <Container >
          <Button className="text-right" variant="secondary" onClick={this.props.handleCloseModal}>Close</Button>
          <Button variant="primary" type="submit">Submit Book</Button>
        </Container>
      </Form >
    );
  }
}

export default BookForm;
