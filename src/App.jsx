import { useState } from "react";

function Request(props) {
  const [threeby, setThreeby] = useState([]);
  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  var query = `
    query ($name: String, $page: Int, $perPage: Int) {
      User (name: $name) {
        id
        name
        favourites (page: $page) {
          anime (page: $page, perPage: $perPage) {
            nodes {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                medium
              }
            }
          }
          
        }
      }
    }
  `;

  // Define our query variables and values that will be used in the query request
  var variables = {
      name: props.username,
      page: 1,
      perPage: 9
  };

  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              query: query,
              variables: variables
          })
      };

  // Make the HTTP Api request
  function apiRequest () {
    fetch(url, options).then(handleResponse)
                      .then(handleData)
                      .catch(handleError);
  }

  function handleResponse(response) {
      return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
      });
  }

  function handleData(data) {
      // console.log(data);
      setThreeby(data.data.User.favourites.anime.nodes)
  }

  function handleError(error) {
      alert('Error, check console');
      console.error(error);
  }
  return (
    <>
      <button onClick={()=>{apiRequest()}}>request</button>
      <ul>
          {threeby.map(item => 
              <li key={item.id}>
                {item.title.english}
                <img src={item.coverImage.medium}></img>
              </li>
            )}
      </ul>
    </>
  )
}

function Input (props) {
  const handleInputChange = (event) => {
    props.setUsername(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Enter username here..."
      />
    </>
  );
};

function App() {
  const [username, setUsername] = useState('');
  
  return (
    <>
      <p>Anilist 3by3 recent favourites</p>
      <Input setUsername={setUsername}/>
      <Request username={username}/>
    </>
  );
}

export default App;
