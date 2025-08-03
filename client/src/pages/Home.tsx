import { CreatePost } from "../components/CreatePost"
import Navigation from "../components/Navigation"
import PostCard  from "../components/PostCard"
import { usePosts } from "../hooks/usePosts"



function Home() {
  const {posts , isLoading} = usePosts();
  

  return (

    <>
    <div className="min-h-screen bg-background">
      

  <Navigation />
      <CreatePost />
      
      {isLoading ? (
        <p>Loading posts...</p>
      ) : posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
  
     </div>
    
    </>
  )
}

export default Home
