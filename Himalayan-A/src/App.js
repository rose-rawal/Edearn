import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Context from "./context/context";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Context>
          <Routes>
            {routes.map((items) => (
              <Route path={items.path} element={items.element} />
            ))}
          </Routes>
        </Context>
      </BrowserRouter>
    </div>
  );
}

export default App;
