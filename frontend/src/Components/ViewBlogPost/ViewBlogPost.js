import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommentView from "../CommentView/CommentView";
import CommentAdder from "../Comment Adder/CommentAdder";

const ViewBlogPost = ({ post }) => {
    const navigate = useNavigate();
    const[count,setCount] = useState(0);
    const [comment,setComment] = useState([]);
    const incrementCount = () => {
        setCount(count + 1);
    };
    const handleViewMore = () => {
        axios
            .get(`http://localhost:8080/post/getPost/${post.post_id}`)
            .then((res) => {
                console.log(res);
                navigate(`/blogPost/${res.data.post.post_id}`, { state: res.data.post });
            })
            .catch((err) => {
                console.log(err);
                window.alert(err.response.data.message);
            });
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={post.imageURL}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.description}
                </Typography>
                <CommentView post={post} comment={comment} setComment={setComment}/>
                <CommentAdder post={post} comment={comment} setComments= {setComment}/>
            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' onClick={handleViewMore}>View More</Button>

            </CardActions>
        </Card>
    )
}

export default ViewBlogPost