import MultipleSelectInput from "./components/MultipleSelectInput";
import useFetchProducts from "./api/useFetchCountry";

function App() {
  const { countries, loading } = useFetchProducts();
  return (
    <div className="app">
      <MultipleSelectInput data={countries} loading={loading} />
    </div>
  );
}

export default App;
