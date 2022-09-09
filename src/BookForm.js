import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.currentBook?._id,
      title: this.props.currentBook?.title,
      description: this.props.currentBook?.description,
      status: this.props.currentBook?.status
    };
  }

  handleTitleChange = (e) => this.setState({ title: e.target.value });
  handleDescriptionChange = (e) => this.setState({ description: e.target.value });
  handleStatusChange = (e) => this.setState({ status: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    //Update Book
    if (this.props.updateClicked) {
      this.props.updateBook(this.state);
    }
    //Add Book
    else {
      const newBook = {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status
      };
      this.props.createBook(newBook);
    }
    this.props.handleCloseModal();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="bookTitle">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            autoFocus
            defaultValue={this.state.title || ""}
            onChange={this.handleTitleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={this.state.description || ""}
            onChange={this.handleDescriptionChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            defaultValue={this.state.status || ""}
            onChange={this.handleStatusChange}
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
