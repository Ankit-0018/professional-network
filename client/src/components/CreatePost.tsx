import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import toast from "react-hot-toast";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";


export const CreatePost = () => {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const {addPost } = usePosts();
  const {user} = useAuth();
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsPosting(true)
    try {
    await addPost(content)
    setContent(""); 
    toast.success("Posted Successfully!")
  } catch (error) {
    console.error("Failed to post:", error);
    toast.error("Something went wrong!")
  } finally {
    setIsPosting(false);
  }
    
  };



  return (
    <div className="max-w-2xl mx-auto p-4">

    <Card className="mb-6">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] resize-none border-none shadow-none focus-visible:ring-[#] p-0 text-base"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {content.length}/500 characters
                </span>
                <Button
                  type="submit"
                  disabled={!content.trim() || isPosting}
                  className="bg-[#3694c3] hover:bg-[#477288]"
                >
                  {isPosting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};