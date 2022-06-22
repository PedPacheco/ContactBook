import { useCallback, useState } from "react";

function useFetch() {
  const urlBase = "http://localhost:5000/v1/";
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (rota, options) => {
    const { tokenUser } = options;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Methods", "*");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Headers", "*");
    myHeaders.append("authorization", tokenUser);
    options.headers = myHeaders;

    let response;
    let json;

    try {
      setLoading(true);
      response = await fetch(urlBase + rota, options);
      json = await response.json();
    } catch (err) {
      json = null;
      console.log("Deu ruim!", err);
    } finally {
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { loading, request };
};

export default useFetch;
