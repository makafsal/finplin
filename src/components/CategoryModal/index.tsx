import {
  Button,
  ComposedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput
} from "@carbon/react";
import { useEffect, useState } from "react";
import { CategoryModalProps } from "../../types";

export const CategoryModal = ({
  open,
  onAdd,
  onCancel,
  onUpdate,
  category
}: CategoryModalProps) => {
  const [categoryName, setCategoryName] = useState<string>(
    category?.name || ""
  );

  useEffect(() => {
    if (category?.name) {
      setCategoryName(category.name);
    }
  }, [category]);

  const onSubmit = () => {
    if (category?.id) {
      setCategoryName("");
      onUpdate?.({
        id: category.id,
        name: categoryName
      });
    } else {
      onAdd?.(categoryName);
      setCategoryName("");
    }
  };

  return (
    <ComposedModal open={open} onClose={() => onCancel?.()}>
      <ModalHeader buttonOnClick={() => onCancel?.()} title="Add a category" />
      <ModalBody>
        <TextInput
          data-modal-primary-focus
          id="text-category-name"
          labelText="Name"
          placeholder="e.g. Household"
          style={{
            marginBottom: "1rem"
          }}
          value={categoryName}
          onChange={(ev) => setCategoryName(ev.target.value?.trim())}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          kind="secondary"
          onClick={() => {
            setCategoryName("");
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          kind="primary"
          onClick={() => onSubmit()}
          disabled={!categoryName?.length}
        >
          {category?.id ? "Update" : "Add"}
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};
