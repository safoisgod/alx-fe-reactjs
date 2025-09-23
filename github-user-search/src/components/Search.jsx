import { useState } from 'react'
import { fetchUserData } from "../services/githubService";

function Search () {

     const [username, setUsername] = useState("")
     const [location, setLocation] = useState("");
     const [minRepos, setMinRepos] = useState("");
     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(false);
      const [page, setPage] = useState(1);

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true)
    setError(false)
    setUsers([])
     
     try {
      const data = await fetchUserData(username, location, minRepos);
      if (!data || data.length === 0) {
        setError(true);
      } else {
        setUsers(data);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const data = await fetchUserData(username, location, minRepos, nextPage);
      setUsers((prev) => [...prev, ...data]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="max-w-xl mx-auto p-4">
        <form onSubmit={handleSubmit} 
         className="space-y-4 bg-gray-50 p-4 rounded shadow"
         >
            <input 
            type="text" 
            placeholder="Github username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
             className="w-full p-2 border rounded"
             />
             
             <input 
             type='text'
             placeholder='Location'
             value={location}
             onChange={(e) => setLocation (e.target.value)}
             className="w-full p-2 border rounded"
             />

              <input
              type="number"
              placeholder="Minimum Repositories (optional)"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              className="w-full p-2 border rounded"
              />
              
            <button 
            type='submit'
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Search
            </button>
        </form>

         <div className="mt-6">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">Looks like we cant find the user</p>}
        {users.length > 0 && (
          <ul className="space-y-4">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex items-center space-x-4 bg-white p-3 rounded shadow"
              >
                <img
                  src={u.avatar_url}
                  alt={u.login}
                  className="w-5 h-5 rounded-full"
                />
                <div>
                  <p className="font-semibold">{u.login}</p>
                  <a
                    href={u.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Profile
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}

          {users.length > 0 && !loading && (
          <button
            onClick={handleLoadMore}
            className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Load More
          </button>
          )}
      </div>
    </div>
  );
}

export default Search;