import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import  PostCard from "../components/PostCard";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import Navigation from "../components/Navigation";



export const ProfilePage = () => {

    const {user} = useAuth();
    const {posts} = usePosts();

  
  const userPosts = posts?.filter(post => post.user._id === user!._id);
  

  const sortedUserPosts = [...userPosts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
    <Navigation />
    <div className="max-w-2xl mx-auto p-4">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"} alt={user!.name} />
              <AvatarFallback className="text-xl">
                {user!.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{user!.name}</h1>
              <p className="text-muted-foreground mb-3">{user!.bio}</p>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <span>{sortedUserPosts.length} posts</span>
                <span>•</span>
                <span>{user!.email}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Posts Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Your Posts</h2>
        {sortedUserPosts.length > 0 ? (
            sortedUserPosts?.map((post) => (
            <PostCard
            key={post._id}
            post={post}
            />
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                You haven't posted anything yet. Share your first post from the Home page!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
        </>
  );
};