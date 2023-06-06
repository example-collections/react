import { QueryClient, QueryClientProvider } from "react-query";
import ReactQuery from "./ReactQuery";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQuery></ReactQuery>
    </QueryClientProvider>
  );
}

export default App;
