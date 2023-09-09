import CountryVisualizator from "./components/CountryVisualizator";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";




/*
  - See all countries from the API on the home
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*
*/


function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/country/:country_name" element={<CountryVisualizator />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
