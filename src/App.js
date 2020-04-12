import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  async function handleAddRepository() {
    const now = Date.now();
    const repo = {
      title: `New Repository ${now}`,
      url: `http://github.com/${now}`,
      techs: ["Node.js", ".Net", ".Net Core"]
    };

    api.post('repositories', repo)
      .then(response => {
        setRepositories([...repositories, response.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(response => {
        setRepositories(repositories.filter(i => i.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo =>
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
