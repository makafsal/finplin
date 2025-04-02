import "./App.scss";
import { Button, Column, Content, Grid, ProgressBar } from "@carbon/react";
import { Add } from "@carbon/react/icons";
import { useState } from "react";
import { db } from "./db";
import { CategoryModal } from "./components/CategoryModal";

function App() {
  const [open, setOpen] = useState(false);

  const addCategory = (categoryName: string) => {
    db.categories.add({ name: categoryName });
    setOpen(false);
  };

  return (
    <>
      <CategoryModal
        open={open}
        onCancel={() => setOpen(false)}
        onAdd={(category) => addCategory(category)}
      />

      <Content>
        <Grid>
          <Column sm={4}>
            <ProgressBar
              helperText="200/1000"
              label="Progress bar label"
              max={1000}
              value={200}
            />
          </Column>
          <Column sm={4}>
            <ProgressBar
              helperText="200/1000"
              label="Progress bar label"
              max={1000}
              value={200}
            />
          </Column>
          <Column sm={4}>
            <ProgressBar
              helperText="200/1000"
              label="Progress bar label"
              max={1000}
              value={200}
            />
          </Column>
          <Column sm={4}>
            <ProgressBar
              helperText="200/1000"
              label="Progress bar label"
              max={1000}
              value={200}
            />
          </Column>
        </Grid>
      </Content>
      <footer>
        <Button renderIcon={Add} kind="primary">
          Add Expense
        </Button>
        <Button renderIcon={Add} kind="secondary" onClick={() => setOpen(true)}>
          Add Category
        </Button>
      </footer>
    </>
  );
}

export default App;
