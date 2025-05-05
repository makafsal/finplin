import {
  Button,
  Column,
  Content,
  Dropdown,
  Grid,
  OverflowMenu,
  OverflowMenuItem,
  ProgressBar
} from "@carbon/react";
import { Add, Filter } from "@carbon/react/icons";
import { useEffect, useState } from "react";
import _ from "lodash";
import { db } from "./db";
import { Budget, Category, DropdownItem, Status } from "./types";
import { months, years } from "./constants";
import { ExpenseModal } from "./components/ExpenseModal";
import "./App.scss";

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
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalBudget, setTotalBudget] = useState<number>(0);

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

        let _totalAmount = 0;
        let _totalMaxAmount = 0;

        filteredBudgets.forEach((_budget) => {
          _totalAmount += _budget.amount ?? 0;
          _totalMaxAmount += _budget.maxAmount ?? 0;
        });

        setTotalBudget(_totalMaxAmount);
        setTotalExpense(_totalAmount);
        setBudgets(filteredBudgets);
        setCategories(_categories);
      }
    } catch (error) {
      setTotalBudget(0);
      setTotalExpense(0);
      setBudgets([]);
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

  const getHelperText = (budget: Budget) => {
    const _string = `${budget.amount || 0}/${budget.maxAmount}`;

    if (budget.amount !== undefined && budget.maxAmount !== undefined) {
      return `${_string} (Balance: ${budget.maxAmount - budget.amount})`;
    }

    return _string;
  };

  const sortByBalance = (dir: "asc" | "desc") => {
    const _sortedBudgets = _.orderBy(
      budgets,
      [(b) => (b?.maxAmount || 0) - (b?.amount || 0)],
      dir
    );

    setBudgets(_sortedBudgets);
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
          <Column lg={16} md={8} sm={4}>
            <ProgressBar
              helperText={getHelperText({
                amount: totalExpense,
                maxAmount: totalBudget
              })}
              label="Total"
              max={totalBudget}
              value={totalExpense}
              status={getStatus({
                amount: totalExpense,
                maxAmount: totalBudget
              })}
              className="text-align-right"
            />
          </Column>
          <Column lg={16} md={8} sm={4} className="mt-5">
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
            <div className="filtersHolder">
              <Dropdown
                id="year"
                titleText="Year"
                label="Select year"
                items={years}
                className="flex-grow-1"
                itemToString={(item) => (item ? item.text : "")}
                selectedItem={selectedYear}
                onChange={({ selectedItem }) => {
                  setSelectedYear(selectedItem);
                  fetchData(selectedMonth, selectedItem);
                }}
              />
              <OverflowMenu renderIcon={Filter} flipped={true}>
                <OverflowMenuItem
                  itemText="Balance asc"
                  onClick={() => sortByBalance("asc")}
                />
                <OverflowMenuItem
                  itemText="Balance dec"
                  onClick={() => sortByBalance("desc")}
                />
              </OverflowMenu>
            </div>
          </Column>
        </Grid>
        <Grid className="mt-5" narrow>
          {budgets?.length === 0 ? (
            <Column sm={4}>No budget allocated for this month.</Column>
          ) : (
            budgets?.map((budget) => (
              <Column lg={16} md={8} sm={4} className="mt-5 text-align-right">
                <ProgressBar
                  helperText={getHelperText(budget)}
                  label={getCategory(budget?.categoryId)}
                  max={budget.maxAmount}
                  value={budget.amount || 0}
                  status={getStatus(budget)}
                  size="small"
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
