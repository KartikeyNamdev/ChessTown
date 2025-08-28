import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Game } from "./Game";
function App() {
  return (
    <>
      <div className="h-screen bg-[#1D1616]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/game" element={<Game />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
