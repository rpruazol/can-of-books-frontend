import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export default class BookModal extends React.Component {



  onSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      title: event.target.bookTitle.value,
      description: event.target.bookDescription.value,
      status: event.target.bookStatus.value
    };
    console.log('newBook:', newBook);

    this.props.createBook(newBook);
  };



  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group className="mb-3" controlId="bookTitle">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dune"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="bookDescription"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="bookStatus"
            >
              <Form.Label>Status</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Container >
              <Button className="text-right" variant="secondary" onClick={this.props.handleCloseModal}>Close</Button>
              <Button variant="primary" type="submit" onClick={this.props.createBook}>Submit Book</Button>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal >
    );
  }
}
