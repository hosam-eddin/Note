import { useReducer } from "react";

const useAxiosPromise = (url) => {
  const reducer = (prev, next) => ({ ...prev, ...next });
  const [{ loading, error, data }, setState] = useReducer(reducer, {
    data: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url).then((response) => response.data);
        setState({ data: response, loading: false });
      } catch (error) {
        setState({ error: "Something Went Wrong ", loading: false });
      }
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};

export default useAxiosPromise;
