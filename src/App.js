import React from "react";
import "./styles.css";

function App() {
  const [data, setData] = React.useState({});

  const onSubmitClick = () => {
    fetch(
      `https://cors-anywhere.herokuapp.com/${
        document.getElementById("enteredURL")?.value
      }`
    )
      .then((response) => response.text())
      .then((html) => {
        // Convert the HTML string into a document object
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const metaTags = Array.from(doc?.getElementsByTagName("meta"));
        const filteredMetaTags = metaTags?.filter((fil) =>
          fil?.outerHTML?.includes("og:")
        );
        let tagAttributes = {};

        filteredMetaTags?.map((tag) => {
          const recAttr = Array.from(tag?.attributes);

          const tagOG = recAttr
            ?.filter((fil) => fil?.nodeValue.includes("og:"))?.[0]
            ?.value?.split("og:")?.[1];

          Object.assign(tagAttributes, { [tagOG]: tag?.content });
        });

        setData(tagAttributes);
      });
  };

  return (
    <div className="App">
    <a href="https://github.com/therakeshpurohit/live-link-embedded-preview">
        Fork me on GitHub
      </a>
      <span>
        Not working?{" "}
        <a href="https://cors-anywhere.herokuapp.com/corsdemo">CORS Error</a>
      </span>
      <input id="enteredURL" name="enteredURL" />
      <button onClick={onSubmitClick} value="submit">
        Submit
      </button>
      {Object.keys(data).length > 0 ? (
        <div className="card">
          <h1>Title: {data?.title}</h1>
          <h3>Type : {data?.type}</h3>
          <a href={data?.url}>
            <img
              src={data?.image}
              alt={data?.description}
              height={250}
              width={500}
            />
            <br />
            <span>{data?.description}</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default App;
