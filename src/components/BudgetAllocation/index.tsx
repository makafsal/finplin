import { useEffect, useState } from "react";
import {
  Button,
  Column,
  Content,
  Dropdown,
  Grid,
  IconButton,
  TextInput
} from "@carbon/react";
import { Checkmark, Close, Copy, TrashCan } from "@carbon/react/icons";
import { Budget, Category, DropdownItem } from "../../types";
import { db } from "../../db";
import { months, years } from "../../constants";

export const BudgetAllocation = () => {
  const inputsMap = new Map();
  const [selectedMonth, setSelectedMonth] = useState<DropdownItem | null>(
    months[new Date().getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState<
    DropdownItem | undefined | null
  >(years.find((year) => year?.value === new Date().getFullYear()));
  const [editableField, setEditableField] = useState<number | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newCategory, setNewCategory] = useState<Category | null>();
  const [maxAmount, setMaxAmount] = useState<number>();
  const [isDirty, setIsDirty] = useState<boolean>(false);

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
        setAllCategories([..._categories]);

        if (_budgets.length > 0) {
          _budgets.forEach((budget) => {
            const existIndex = _categories?.findIndex(
              (category) => category.id === budget.categoryId
            );

            if (existIndex !== -1) {
              _categories.splice(existIndex, 1);
            }
          });

          setCategories(_categories);
        } else {
          setCategories(_categories);
        }
      }
    } catch (error) {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCategory = (categoryId?: number) => {
    const category = allCategories?.find(
      (_category) => _category?.id === categoryId
    );

    return category?.name;
  };

  const onCreateBudget = () => {
    if (newCategory && selectedYear?.value && selectedMonth?.value) {
      const _date = new Date(selectedYear.value, selectedMonth.value, 1);

      db.budgets.add({
        maxAmount: maxAmount,
        categoryId: newCategory?.id,
        date: _date
      });

      fetchData();
    }
  };

  const onUpdateBudget = (budgetId?: number) => {
    db.budgets.update(budgetId, { maxAmount: maxAmount });

    fetchData();
  };

  const deleteBudget = (budgetId?: number) => {
    db.budgets.delete(budgetId);

    fetchData();
  };

  const onCopyPreviousBudget = async () => {
    if (
      selectedYear?.value !== undefined &&
      selectedMonth?.value !== undefined
    ) {
      let _date = new Date(selectedYear?.value, selectedMonth?.value - 1, 1);

      if (selectedMonth?.text === "January") {
        _date = new Date(selectedYear?.value - 1, 11, 1);
      }

      const _budgets: Budget[] = await db.budgets.toArray();

      const sourceMonthBudgets = _budgets.filter(
        (item: Budget) =>
          item.date?.getFullYear() === _date?.getFullYear() &&
          item.date?.getMonth() === _date?.getMonth()
      );
      const targetMonthBudgets: Budget[] = sourceMonthBudgets.map(
        (item: Budget) => ({
          amount: 0,
          maxAmount: item.maxAmount,
          categoryId: item.categoryId,
          date: new Date(selectedYear.value, selectedMonth.value, 1)
        })
      );

      db.budgets.bulkAdd(targetMonthBudgets);

      fetchData();
    }
  };

  return (
    <Content>
      <h4>Budget Allocation</h4>
      <Grid className="mt-5" narrow>
        <Column lg={8} md={4} sm={2}>
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
        <Column lg={8} md={4} sm={2}>
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
      <>
        {budgets?.length === 0 ? (
          <Grid className="mt-5" narrow>
            <div>No records.</div>
          </Grid>
        ) : (
          <>
            {budgets?.map((budget) => (
              <Grid className="mt-5" narrow>
                <Column lg={8} md={4} sm={2} className="align-content-center">
                  <p>{getCategory(budget?.categoryId)}</p>
                </Column>
                <Column lg={8} md={4} sm={2}>
                  <TextInput
                    type="number"
                    id={`budget_${budget.id}`}
                    labelText=""
                    placeholder="0"
                    title={`${budget.maxAmount}`}
                    key={budget.id}
                    defaultValue={budget.maxAmount}
                    ref={(node) =>
                      inputsMap.set(`${budget.maxAmount}`, node) as any
                    }
                    onFocus={() => setEditableField(budget.id)}
                    onBlur={() =>
                      setTimeout(() => {
                        setEditableField(undefined);
                        if (isDirty && budget?.maxAmount) {
                          onUpdateBudget(budget?.id);
                        }
                      })
                    }
                    onChange={(ev) => {
                      setIsDirty(true);
                      setMaxAmount(Number(ev.target.value));
                    }}
                  />
                  {editableField === budget.id && (
                    <>
                      <IconButton
                        label="Save"
                        size="sm"
                        disabled={
                          !isDirty ||
                          (isDirty && budget.maxAmount === maxAmount)
                        }
                        onClick={() => onUpdateBudget(budget?.id)}
                      >
                        <Checkmark />
                      </IconButton>
                      <IconButton
                        label="Save"
                        size="sm"
                        kind="tertiary"
                        onClick={() => {
                          setEditableField(undefined);
                          setMaxAmount(undefined);
                          setIsDirty(false);
                          inputsMap.get(`${budget.maxAmount}`).value =
                            budget.maxAmount;
                        }}
                      >
                        <Close />
                      </IconButton>
                      <Button
                        renderIcon={TrashCan}
                        kind="danger"
                        size="sm"
                        hasIconOnly
                        onClick={() => deleteBudget(budget?.id)}
                        iconDescription="Delete"
                        tooltipAlignment="center"
                        tooltipPosition="bottom"
                      />
                    </>
                  )}
                </Column>
              </Grid>
            ))}
          </>
        )}
      </>
      <Grid className="mt-5" narrow>
        <Column lg={8} md={4} sm={2}>
          <Dropdown
            id="categories"
            titleText=""
            label="Select category"
            items={categories}
            itemToString={(item) => (item && item?.name ? item?.name : "")}
            selectedItem={newCategory}
            onChange={({ selectedItem }) => setNewCategory(selectedItem)}
          />
        </Column>
        <Column lg={8} md={4} sm={2}>
          <TextInput
            type="number"
            id="default_max_amount"
            labelText=""
            placeholder="0"
            key={1}
            onFocus={() => setEditableField(-1)}
            ref={(node) => inputsMap.set("default_max_amount", node) as any}
            onBlur={() =>
              setTimeout(() => {
                setEditableField(undefined);
                setMaxAmount(undefined);
                setIsDirty(false);
                setNewCategory(null);
                inputsMap.get("default_max_amount").value = undefined;
              }, 0)
            }
            onChange={(ev) => {
              setIsDirty(true);
              setMaxAmount(Number(ev.target.value));
            }}
          />
          {editableField === -1 && (
            <>
              <IconButton
                label="Save"
                size="sm"
                onClick={() => onCreateBudget()}
                disabled={!isDirty || (isDirty && maxAmount === undefined)}
              >
                <Checkmark />
              </IconButton>
              <IconButton label="Save" size="sm" kind="tertiary">
                <Close />
              </IconButton>
            </>
          )}
        </Column>
      </Grid>
      {budgets?.length === 0 && (
        <Grid className="mt-5" narrow>
          <Column lg={8} md={4} sm={2}>
            <Button
              kind="primary"
              renderIcon={Copy}
              onClick={() => onCopyPreviousBudget()}
            >
              Copy from previous month
            </Button>
          </Column>
        </Grid>
      )}
    </Content>
  );
};
