import { useEffect } from "react";
import { useAppStore } from "./store/appStore";
import "./App.css";

function App() {
  const bears = useAppStore((state) => state.bears);
  const increase = useAppStore((state) => state.increasePopulation);
  const removeAll = useAppStore((state) => state.removeAllBears);
  const updateBears = useAppStore((state) => state.updateBears);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateBears(parseInt(e.target.value));
  useEffect(() => {
    increase();
  }, []);

  return (
    <>
      <h1>Number of bears: {bears}</h1>
      {/* <button onClick={increase}>add</button> */}
      {/* <button onClick={removeAll}>reset</button> */}
      {/* <input type="number" onChange={(e) => handleChange(e)} /> */}
    </>
  );
}

export default App;
