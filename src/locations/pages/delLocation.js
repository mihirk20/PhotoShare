import React, { useState ,useContext} from "react";
import axios from "axios"; // You may need to import Axios or your preferred HTTP client library
import { Button, Modal } from 'react-bootstrap'; // Use a suitable UI library for your project
import "bootstrap/dist/css/bootstrap.min.css";
import "./dellocation.css";
import { LoginContext } from "../../common/components/context";


const DeleteButton = ({ locid, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useContext(LoginContext);
  const handleShow = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      alert("Please log in to delete locations.");
    }
 };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to your backend API to delete the location
      await axios.delete(`http://localhost:5000/api/locations/${locid}`);
      onDelete(locid); // Notify the parent component that the location has been deleted
    } catch (error) {
      console.error("Error deleting location:", error);
    } finally {
      handleClose(); // Close the modal
    }
  };

  return (
    <>
      
      <Button variant="danger" onClick={handleShow}className="mbc">
       Delete
      </Button>

      <Modal show={showModal} onHide={handleClose} className="Modal">
        <Modal.Header closeButton >
          <Modal.Title className="mtitle">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mbody">
          Are you sure you want to delete this location?
        </Modal.Body>
        <Modal.Footer className="mf">
          <Button variant="secondary" onClick={handleClose}className="mbc">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}className="mbd">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;
