import {
  Button,
  ComposedModal,
  Dropdown,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput
} from "@carbon/react";
import { Budget, DropdownItem, ExpenseModalProps } from "../../types";
import { useEffect, useState } from "react";
import { db } from "../../db";

export const ExpenseModal = ({
  open,
  onSave,
  onCancel,
  budgets
}: ExpenseModalProps) => {
  const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
  const [categoryItem, setCategoryItem] = useState<DropdownItem | null>();
  const [selectedBudget, setSelectedBudget] = useState<Budget>();
  const [amount, setAmount] = useState<number | string>();

  useEffect(() => {
    const _items: DropdownItem[] = [];

    budgets?.forEach(async (budget: Budget) => {
      if (budget?.categoryId) {
        const _category = await db.categories.get(budget?.categoryId);

        if (_category !== undefined && _category?.name) {
          _items.push({
            text: _category.name,
            value: _category.id
          });
        }
      }
    });

    setCategoryItems(_items);
  }, [budgets, open]);

  const onSubmit = () => {
    if (selectedBudget?.amount !== undefined) {
      db.budgets.update(selectedBudget?.id, {
        amount: selectedBudget?.amount + Number(amount)
      });

      setSelectedBudget(undefined);
      setCategoryItem(null);
      setAmount("");
      onSave?.();
    }
  };

  return (
    <ComposedModal open={open} onClose={() => onCancel?.()}>
      <ModalHeader buttonOnClick={() => onCancel?.()} title="Add a category" />
      <ModalBody>
        <Dropdown
          id="category"
          titleText="Category"
          label="Select category"
          items={categoryItems}
          itemToString={(item) => (item ? item.text : "")}
          selectedItem={categoryItem}
          onChange={({ selectedItem }) => {
            setCategoryItem(selectedItem);

            const budget = budgets?.find(
              (budget) => budget?.categoryId === selectedItem?.value
            );

            setSelectedBudget(budget);
          }}
        />
        <TextInput
          id="amount-input"
          labelText="Amount"
          placeholder="0"
          className="mt-5"
          type="number"
          value={amount}
          onChange={(ev) => {
            const _value = ev.target.value;

            if (_value?.trim()) {
              setAmount(Number(_value));
            } else {
              setAmount(undefined);
            }
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          kind="secondary"
          onClick={() => {
            setSelectedBudget(undefined);
            setCategoryItem(null);
            setAmount("");
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          kind="primary"
          onClick={() => onSubmit()}
          disabled={!selectedBudget || amount === undefined}
        >
          Save
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};
