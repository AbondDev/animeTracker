import React, {Fragment, useEffect, useState} from 'react'
function App() {
  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch('http://localhost:8080/')
      const data = await response.json();

      try {
        console.log(data);
        setLoading(false);
        setAnime(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAPI();
  }, []);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <Fragment>
      <h1>Anime Home</h1>
      <div>
        {loading ? (
          <div>Loading</div>
          ) : (
          <div>
            {anime.map((data)=> (
              <div key={data._id}>
                <ul>
                  <li>
                    <h1>
                      <a href="/{data._id}">{data._id}</a>
                    </h1>
                  </li>
                  <li>
                      <img src={data.image} alt={data.name}/>
                  </li>
                  <li>
                    <p>{data.description}</p>
                  </li>
                </ul>
              </div>
              ))}
          </div>
        )}
      </div>
      <div>
        <h1>Add New Anime</h1>
        <form action="http://localhost:8080/add-anime" method="POST">
          <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div>
            <label for="image">Image</label>
            <input type="text" name="image" id="name" required />
          </div>
          <div>
            <label for="description">Description</label>
            <input type="text" name="description" id="name" required />
          </div>
          <div>
            <button type="submit">Add Anime</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
export default App;
