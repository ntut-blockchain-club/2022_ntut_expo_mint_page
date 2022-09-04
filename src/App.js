import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.scss";
import Nav from "./components/Nav";
import Sketch_board_main from "./pages/sketch_board_main";
import View_board_main from "./pages/view_board_main";
import React from "react";
function App() {
  const [preview_count, set_preview_count] = React.useState(0);
  return (
    <Router>
      <Routes>
          <Route
            element={
              <Sketch_board_main
                preview_count={preview_count}
                set_preview_count={set_preview_count}
              />
            }
            path={"/"}
          ></Route>
        <Route element={<View_board_main />} path={"/view"}></Route>
      </Routes>
    </Router>
  );
}

export default App;
