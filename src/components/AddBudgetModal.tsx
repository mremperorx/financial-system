import React, { useRef, FC } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";

interface AddBudgetModalProps {
  show: boolean;
  handleClose: () => void;

}

const AddBudgetModal: FC<AddBudgetModalProps> = ({ show, handleClose, }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const { addBudget } = useBudgets();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBudget({
      name: nameRef.current!.value,
      max: parseFloat(maxRef.current!.value),
      id: ""
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New In Debt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;