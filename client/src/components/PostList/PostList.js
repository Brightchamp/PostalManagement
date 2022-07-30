
const PostListItem = (props)=>{
    const post = props.post;
    const onCollect = props.onCollect
    return(
        <div class = 'PostListItem'>
            <div>{post.serialNumber}</div>
            <div>{post.recievedDate}</div>
            <div>{post.recieverName}</div>
            <div>{post.deliveryService}</div>
            <button onClick={onCollect}>Collected</button>
        </div>
    )
}

const PostList = (props)=>{
    const posts = props.posts;
    return(
        <div className = 'PostList'>
            {posts.map(post => <PostListItem 
                                    post={post} 
                                    onCollect = {props.onCollect}
                                    key={post.key}
                                    />)}
        </div>
    )
}

export default PostList;