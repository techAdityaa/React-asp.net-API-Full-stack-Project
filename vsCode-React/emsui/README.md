My EMS
Step 1: Setup React Project
npx create-react-app emsui
cd emsui
code .
npm start

npm install react-router-dom
Step 2: Create Navbar in App component
App.js
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/home">Home</Link>
      </nav>
    </BrowserRouter>
  );
}
export default App;
Step 3: Create Home Components in src folder
Home.js
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
    </div>
  );
};
export default Home;
Step 4: Add Link in App component
App.js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/home">Home</Link>
      </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
Step 5: Create About Component and add link in App Component
About.js
const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About page of the website.</p>
    </div>
  );
};
export default About;
Step 6: Create Country Component and add link in App Component
Country.js
const Country = () => {
  return (
    <div>
      <h1>Manage Country</h1>
    </div>
  );
};
export default Country;
Step 7: Create State Component and add link in App Component
State.js
const State = () => {
  return (
    <div>
      <h1>Manage State</h1>
    </div>
  );
};
export default State;
Step 8: Create District Component and add link in App Component
District.js
const District = () => {
  return (
    <div>
      <h1>Manage District</h1>
    </div>
  );
};
export default District;
