import { RootStoreContext } from "./models/RootStoreContext";
import { createRootStore } from "./models/RootStore";
import { MeterTable } from "./components/MeterTable";
import { useState } from "react";
// import './App.css'

function App() {
  //const rootStore = createRootStore();
  const [rootStore] = useState(() => createRootStore());

  return (
      <div>
        <h1>Список счётчиков</h1>
        <RootStoreContext.Provider value={rootStore}>
          <MeterTable />
        </RootStoreContext.Provider>
      </div>
  )
}

export default App
