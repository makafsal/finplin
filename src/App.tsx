import "./App.css";
import { Column, Content, Grid, ProgressBar } from "@carbon/react";
import { AppHeader } from "./components/AppHeader";

function App() {
  return (
    <>
      <AppHeader />
      <Content>
        <Grid as="div">
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
    </>
  );
}

export default App;
