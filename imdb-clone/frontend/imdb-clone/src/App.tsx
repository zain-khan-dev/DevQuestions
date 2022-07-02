
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ListMovies from "./Container/ListMovies"
import AddMovie from "./Container/AddMovie"

const App = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<ListMovies />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </Router>
  )
}

export default App