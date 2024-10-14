import { useEffect } from "react";
import ClientRoutes from "./routes";
import useAuthStore from "./store/authStore";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="App">
      <ClientRoutes />
    </div>
  );
}

export default App;
