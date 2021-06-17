import { useEffect, useState, useContext } from 'react'
import axios from "axios"
import { useHistory, Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { AuthContext } from '../helpers/AuthContext'

function Home() {

    const [listOfPosts, setListOfPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const { authState } = useContext(AuthContext)

    // redirect url
    let history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login")
        } else {
            const getPosts = () => {
                axios.get("https://full-stack-api-kas.herokuapp.com/posts",
                    { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
                        setListOfPosts(response.data.listOfPosts)
                        setLikedPosts(response.data.likedPosts.map((like) => {
                            return like.PostId
                        }))
                    })
            }

            getPosts()

            const timer = setTimeout(() => {
                getPosts()
            }, 10000)

            return () => clearTimeout(timer)
        }
    }, [])

    const LikePost = (postId) => {
        axios.post("https://full-stack-api-kas.herokuapp.com/likes",
            { PostId: postId },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then((response) => {
            setListOfPosts(listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) return { ...post, Likes: [...post.Likes, 0] }
                    else {
                        const likeArray = post.Likes
                        likeArray.pop()
                        return { ...post, Likes: likeArray }
                    }
                } else {
                    return post
                }
            }))

            if (likedPosts.includes(postId)) {
                setLikedPosts(likedPosts.filter((id) => {
                    return id !== postId
                }))
            } else {
                setLikedPosts([...likedPosts, postId])
            }
        })
    }

    return (
        <div className="homeContainer">
            {
                listOfPosts.map((value, key) => {
                    return (
                        <div className="post" key={key} >
                            <div className="title" onClick={() => history.push(`/post/${value.id}`)}>
                                {value.title}
                            </div>
                            <div className="body" onClick={() => history.push(`/post/${value.id}`)}>
                                {value.postText}
                            </div>
                            <div className="footer">
                                <div className="username">
                                    <Link to={`/profile/${value.UserId}`}>
                                        {value.username}
                                    </Link>
                                </div>
                                <div className="buttons">
                                    {
                                        likedPosts.includes(value.id) ?
                                            <FavoriteIcon onClick={() => LikePost(value.id)} />
                                            :
                                            <FavoriteBorderIcon onClick={() => LikePost(value.id)} />
                                    }
                                    <label>{value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home
