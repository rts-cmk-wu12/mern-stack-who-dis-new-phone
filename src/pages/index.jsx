import { useState, useEffect } from "react"


function Index() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    }

    fetchData()

  }, [])

async function deleteHandler(postId) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      setPosts(posts.filter(user => user._id !== postId))
    }
}

    return ( 
        <>
        <h1>Posts</h1>
        <div>
          {posts.map(posts => (
            <div key={posts._id}>
              <h2>{posts.title}</h2>
              <p>{posts.text}</p>
              <button onClick={() => deleteHandler(posts._id)}>Delete post</button>
            </div>
          ))}
        </div>
        
        </>
     );
}

export default Index;