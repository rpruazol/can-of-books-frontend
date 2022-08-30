import React from 'react';
import Modal from 'react-bootstrap/Modal';
//import Container from 'react-bootstrap/Container';
import BookForm from './BookForm';

export default class BookModal extends React.Component {







  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <BookForm
            handleCloseModal={this.props.handleCloseModal}
            createBook={this.props.createBook}
            updateBook={this.props.updateBook}
            updateClicked={this.props.updateClicked}
            currentBook={this.props.currentBook}
          />
        </Modal.Body>
      </Modal >
    );
  }
}
