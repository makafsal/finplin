import "./App.scss";
import { Button, Column, Content, FlexGrid, Grid, ProgressBar, Section } from "@carbon/react";
import { Add } from "@carbon/react/icons";
import { useEffect, useState } from "react";
import { db } from "./db";
import { CategoryModal } from "./components/CategoryModal";
import { Budget, Category } from "./types";

function App() {
  const [open, setOpen] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const addCategory = (categoryName: string) => {
    db.categories.add({ name: categoryName });
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const _categories: Category[] = await db.categories.toArray();
      const _budgets: Budget[] = await db.budgets.toArray();

      // if (_budgets.length > 0) {
      //   _budgets.forEach((budget) => {
      //     const existIndex = _categories?.findIndex(
      //       (category) => category.id === budget.categoryId
      //     );

      //     if (existIndex !== -1) {
      //       _categories.splice(existIndex, 1);
      //     }
      //   });

      //   setCategories(_categories);
      // } else {
      setCategories(_categories);
      // }

      setBudgets(_budgets);
    } catch (error) {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCategory = (categoryId?: number): string => {
    const category = categories?.find(
      (_category) => _category?.id === categoryId
    );

    return category?.name || "";
  };

  return (
    <>
      <CategoryModal
        open={open}
        onCancel={() => setOpen(false)}
        onAdd={(category) => addCategory(category)}
      />

      <Content>
        <FlexGrid>
          {budgets?.length === 0 ? (
            <Column sm={4}>No budget allocated for this month.</Column>
          ) : (
            budgets?.map((budget) => (
              <Column sm={4}>
                <ProgressBar
                  helperText={`${budget.amount || 0}/${budget.maxAmount}`}
                  label={getCategory(budget?.categoryId)}
                  max={budget.maxAmount}
                  value={budget.amount || 0}
                />
              </Column>
            ))
          )}
        </FlexGrid>
        <Section className='mt-5'>
          <Button renderIcon={Add} kind="primary">
            Add Expense
          </Button>
        </Section>
      </Content>
    </>
  );
}

export default App;
