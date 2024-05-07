import Modal from "react-bootstrap/Modal";

export const CustomModal = ({ children, title, show, setShowForm }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={setShowForm}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
