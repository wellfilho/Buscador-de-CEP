import { useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import "./styles.css";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input == "") {
      alert("Preencha com algum cep!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops! Erro ao buscar CEP");
      setInput("");
      setCep({});
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <AiOutlineFileSearch size={25} color="#f1f1f1" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>
            {cep.logradouro == "" ? "Logradouro não definido" : cep.logradouro}
          </span>
          <span>
            Complemento:{" "}
            {cep.complemento == ""
              ? "Complemento não definido"
              : cep.complemento}
          </span>
          <span>{cep.bairro == "" ? "Bairro não definido" : cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
