import Main from "./Main";
import {ContextProvider} from "./Context";

function App() {
  return (
    <ContextProvider>
      <Main/>
    </ContextProvider>
  );
}

export default App;
