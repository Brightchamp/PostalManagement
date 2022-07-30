
const PostListItem = (props)=>{
    const post = props.post;
    return(
        <div class = 'PostListItem'>
            <div>{post.serialNumber}</div>
            <div>{post.recievedDate}</div>
            <div>{post.recieverName}</div>
            <div>{post.deliveryService}</div>
        </div>
    )
}

const PostList = (props)=>{
    const posts = props.posts;
    return(
        <div className = 'PostList'>
            {posts.map(post => <PostListItem 
                                    post={post} 
                                    key={post.key}
                                    />)}
        </div>
    )
}

export default PostList;