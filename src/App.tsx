import { useState } from "react";

import { createRootStore } from "./stores/RootStore";
import { RootStoreContext } from "./stores/RootStoreContext";

import { MeterTable } from "./components/MeterTable";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Page, PageTitle } from "./styles/PageLayout";

function App() {
  const [rootStore] = useState(() => createRootStore());

  return (
      <>
        <GlobalStyles />
        <RootStoreContext.Provider value={rootStore}>
          <Page>
            <PageTitle>Список счётчиков</PageTitle>
            <MeterTable />
          </Page>
        </RootStoreContext.Provider>
      </>
  )
}

export default App
