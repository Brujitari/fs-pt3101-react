<<<<<<< HEAD
import Watch from "./components/Watch"
import Stopwatch from './components/Stopwatch'
import './styles/styles.sass'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <section className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/stopwatch" element={<Stopwatch/>}/>
          <Route path="/" element={<Watch/>}/>
        </Routes>
        </BrowserRouter>
    </section>
  );
}
=======
export default function App() {
  return <section>{/* Your code */}</section>;
}
>>>>>>> 6f57517e82cc316baec018004323c97575a4dbd9
