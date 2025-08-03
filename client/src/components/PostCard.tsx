import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent } from "../components/ui/card";
import type { Post } from "../hooks/usePosts";
type PostCardProps = {
  post: Post;
};
const PostCard = ({post} : PostCardProps ) => {


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };
  

  return (
    <div className="max-w-2xl mx-auto p-4">

    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post?.user?.avatar} alt={post.user?.name} />
          <AvatarFallback>
<AvatarFallback>
   {(post.user.name!.split(" ").slice(0, 2).map(n => n[0].toUpperCase()).join(""))}
</AvatarFallback>
</AvatarFallback>
          </Avatar>
   
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-sm">{post.user?.name}</h3>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</span>
            </div>
            <p className="text-sm leading-relaxed">{post.text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};


export default PostCard;