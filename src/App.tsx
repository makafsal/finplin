import "./App.css";
import { Column, Content, Grid } from "@carbon/react";
import { AppHeader } from "./components/AppHeader";

function App() {
  return (
    <>
      <AppHeader />
      <Content>
        <Grid>
          <Column md={4} lg={4}>
            Colum is 4
          </Column>
          <Column md={4} lg={4}>
            Colum is 4
          </Column>
          <Column md={4} lg={4}>
            Colum is 4
          </Column>
          <Column md={4} lg={4}>
            Colum is 4
          </Column>
        </Grid>
      </Content>
    </>
  );
}

export default App;
