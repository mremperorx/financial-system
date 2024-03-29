import React, { useRef, FC } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

interface AddExpenseModalProps {
  show: boolean;
  handleClose: () => void;
  defaultBudgetId: string; 
}

const AddExpenseModal: FC<AddExpenseModalProps> = ({
  show,
  handleClose,
  defaultBudgetId,
}) => {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const budgetIdRef = useRef<HTMLSelectElement>(null);
  const { addExpense, budgets } = useBudgets();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current!.value,
      amount: parseFloat(amountRef.current!.value),
      budgetId: budgetIdRef.current!.value,
      id: "",
      date: undefined
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>In Debt</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
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

export default AddExpenseModal;