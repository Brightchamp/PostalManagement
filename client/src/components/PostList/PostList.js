
const PostListItem = (props)=>{
    const post = props.post;
    const onCollect = props.onCollect
    return(
        <div className = 'PostListItem'>
            <div>{post.serialNumber}</div>
            <div>{`${post.recievedDate.getDate()}/${post.recievedDate.getMonth()+1}/${post.recievedDate.getFullYear()}`}</div>
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
                                    onCollect = {()=>props.onCollect(post._id)}
                                    key={post._id}
                                    />)}
        </div>
    )
}

export default PostList;