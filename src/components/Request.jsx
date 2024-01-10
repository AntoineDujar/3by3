import { useState } from "react";
import '../styles/main.css'

function Request(props) {
  const [threeby, setThreeby] = useState([]);
  const [divHide, setDivHide] = useState(new Array(9).fill('inner'));
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
                  large
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
    perPage: 9,
  };

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  function apiRequest() {
    fetch(url, options)
      .then(handleResponse)
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
    setThreeby(shuffleArray(data.data.User.favourites.anime.nodes));
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }

  const ulStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    justifyItems: 'center',
    alingItemsL: 'center',
    padding: '0px',
    maxWidth: '40rem'
  }

  const liStyle = {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column'
  }

  const imgStyle = {
    width: '100%'
  }

  const audio = new Audio('../audio/gl.mp3');

  const handleWrapperClick = (event, index) => {
    const copy = [...divHide]
    copy[index] = "hidden"
    setDivHide(copy)
    audio.play()
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
 }
  return (
    <>
      <button
        onClick={() => {
          apiRequest();
        }}
      >
        request
      </button>
      <ul style={ulStyle}>
        {threeby.map((item, index) => (
          <li style={liStyle} key={item.id}>
            <div className="wrapper" onClick={(event) => {handleWrapperClick(event,index)}}>
              <div className={divHide[index]}> Click me!
              </div>
                <p>{item.title.english}</p>
                <img style={imgStyle} src={item.coverImage.large}></img>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Request;
