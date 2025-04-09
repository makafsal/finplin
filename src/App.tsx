import "./App.scss";
import {
  Button,
  Column,
  Content,
  Dropdown,
  Grid,
  ProgressBar
} from "@carbon/react";
import { Add } from "@carbon/react/icons";
import { useEffect, useState } from "react";
import { db } from "./db";
import { Budget, Category, DropdownItem, Status } from "./types";
import { months, years } from "./constants";
import { ExpenseModal } from "./components/ExpenseModal";

function App() {
  const [open, setOpen] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<DropdownItem | null>(
    months[new Date().getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState<
    DropdownItem | undefined | null
  >(years.find((year) => year?.value === new Date().getFullYear()));

  // const addCategory = (categoryName: string) => {
  //   db.categories.add({ name: categoryName });
  //   setOpen(false);
  // };

  const fetchData = async (
    _selectedMonth = selectedMonth,
    _selectedYear = selectedYear
  ) => {
    try {
      if (_selectedMonth && _selectedYear) {
        const _categories: Category[] = await db.categories.toArray();
        const _budgets: Budget[] = await db.budgets.toArray();
        const filteredBudgets = _budgets.filter(
          (item: Budget) =>
            item.date?.getFullYear() === _selectedYear?.value &&
            item.date?.getMonth() === _selectedMonth?.value
        );

        setBudgets(filteredBudgets);
        setCategories(_categories);
      }
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

  const getStatus = (budget: Budget): Status => {
    if (budget.amount === budget.maxAmount) {
      return "finished";
    } else if (
      budget?.amount !== undefined &&
      budget?.maxAmount !== undefined &&
      budget?.amount > budget?.maxAmount
    ) {
      return "error";
    }
    return "active";
  };

  return (
    <>
      <ExpenseModal
        open={open}
        onCancel={() => setOpen(false)}
        budgets={budgets}
        onSave={() => {
          setOpen(false);
          fetchData();
        }}
      />

      <Content>
        <Grid narrow>
          <Column sm={4}>
            <Button
              renderIcon={Add}
              kind="primary"
              onClick={() => setOpen(true)}
            >
              Add Expense
            </Button>
          </Column>
          <Column lg={8} md={4} sm={2} className="mt-5">
            <Dropdown
              id="month"
              titleText="Month"
              label="Select month"
              items={months}
              itemToString={(item) => (item ? item.text : "")}
              selectedItem={selectedMonth}
              onChange={({ selectedItem }) => {
                setSelectedMonth(selectedItem);
                fetchData(selectedItem);
              }}
            />
          </Column>
          <Column lg={8} md={4} sm={2} className="mt-5">
            <Dropdown
              id="year"
              titleText="Year"
              label="Select year"
              items={years}
              itemToString={(item) => (item ? item.text : "")}
              selectedItem={selectedYear}
              onChange={({ selectedItem }) => {
                setSelectedYear(selectedItem);
                fetchData(selectedMonth, selectedItem);
              }}
            />
          </Column>
        </Grid>
        <Grid className="mt-5" narrow>
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
                  status={getStatus(budget)}
                />
              </Column>
            ))
          )}
        </Grid>
      </Content>
    </>
  );
}

export default App;
