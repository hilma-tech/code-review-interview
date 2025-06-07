import { HELLO_WORLD } from "@internal/constants";
import type { Test } from "@internal/types";

function App() {
  const TEST: Test = "test";
  return <>{HELLO_WORLD + TEST}</>;
}

export default App;
