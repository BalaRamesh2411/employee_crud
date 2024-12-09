import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./component/Creat";
import List from "./component/List";
import Edit from "./component/Edit";
import View from "./component/View";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view/:emp_no" element={<View />} />
        <Route path="/edit/:emp_no" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
