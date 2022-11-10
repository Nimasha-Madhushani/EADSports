import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {Table, TableRow, TableCell, Button} from "@mui/material";


const CommentView = ({post, comment, setComment}) => {
    // const [comment,setComment] = useState([]);
    const [editContactId, setEditContctId] = React.useState(null);

    const getComments = () => {
        axios
            .get(`http://localhost:8080/comment/getComment/${post.post_id}`)
            .then((res) => {
                console.log(res);
                setComment(res.data.comments);
                // console.log(comment)
            })
            .catch((err) => {
                console.log(err);
                window.alert(err.response.data.message);
            });
    };
    useEffect(() => {
        getComments();
    },[])

    /*const deleteClick = (event,row) => {
        setEditContctId(row[0]);
        console.log(row[0])
        deleteComment();
    }*/

    const deleteComment = (event,row) => {
        axios
            .delete(`http://localhost:8080/comment/deleteComment/${row[0]}`)
            .then((res) => {
                console.log(res);
                getComments();
            })
            .catch((err) => {
                console.log(err);
                window.alert(err.response.data.message);
            });

    }
    return(
        <>
            {comment != null ? (
                comment.map((row) => (
                    <React.Fragment key = {row.id}>
                        {editContactId === row.id ? (
                            <></>
                        ) : (
                            <>
                                <TableRow>
                                    <TableCell>{row[1]}</TableCell>
                                    <TableCell>{row[2].substring(0, 10)}</TableCell>
                                    <TableCell><Button onClick={(event) => deleteComment(event,row)} >delete</Button></TableCell>
                                </TableRow>
                            </>
                        )}
                    </React.Fragment>
                ))
            ) : (
                <></>
            )}
        </>
    )
}
export default CommentView;