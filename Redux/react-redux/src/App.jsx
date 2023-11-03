import "./App.css";
import CakeView from "./features/cake/cakeView";
import IcecreamView from "./features/icecream/icecreamView";
import UserView from "./features/users/UserView";

function App() {
  return (
    <div className="App">
      <CakeView />
      <IcecreamView />
      <UserView />
    </div>
  );
}

export default App;
