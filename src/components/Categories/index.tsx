import {
  Button,
  Content,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbarContent
} from "@carbon/react";
import { Add, Edit, TrashCan } from "@carbon/react/icons";
import { useEffect, useState } from "react";
import { db } from "../../db";
import { Category } from "../../types";
import { CategoryModal } from "../CategoryModal";

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editableCategory, setEditableCategory] = useState<Category>();

  const fetchCategories = async () => {
    try {
      const items: Category[] = await db.categories.toArray();

      setCategories(items);
    } catch (error) {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const editCategory = (editItem: Category) => {
    setEditableCategory(editItem);
    setOpen(true);
  };

  const deleteCategory = (id: number) => {
    db.categories.delete(id);
    fetchCategories();
  };

  const addCategory = (categoryName: string) => {
    db.categories.add({ name: categoryName });
    setOpen(false);
    fetchCategories();
  };

  const updateCategory = (category: Category) => {
    db.categories.update(category.id, category);
    fetchCategories();
    setEditableCategory(undefined);
    setOpen(false);
  };

  return (
    <>
      <CategoryModal
        open={open}
        onCancel={() => setOpen(false)}
        onAdd={(category) => addCategory(category)}
        category={editableCategory}
        onUpdate={(category) => updateCategory(category)}
      />
      <Content>
        <h4>Categories</h4>
        <TableToolbarContent>
          <Button
            renderIcon={Add}
            onClick={() => setOpen(true)}
            kind="primary"
          >
            Add new
          </Button>
        </TableToolbarContent>
        <Table aria-label="Categories table">
          <TableHead>
            <TableRow>
              <TableHeader>#</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton label="Edit" kind="ghost">
                    <Edit onClick={() => editCategory(category)} />
                  </IconButton>
                  <IconButton label="Delete" kind="ghost">
                    <TrashCan onClick={() => deleteCategory(category.id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Content>
    </>
  );
};
