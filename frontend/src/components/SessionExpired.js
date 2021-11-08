import React from 'react';
import { Modal } from 'react-bootstrap';

const SessionExpired = () => {
  return (
    <>
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Your Session Expired</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default SessionExpired;
