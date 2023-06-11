import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDeleteNewsCommentMutation, useUpdateNewsCommentMutation } from '../../store/auth/authApiSlice'; 

function NewsComment(prop) {
    const { comment } = prop;
    const [deleteCommentCall] = useDeleteNewsCommentMutation();
    const [updateCommentCall] = useUpdateNewsCommentMutation();
    let mounth = new String(comment.createdDate[1]).length == 1 ? "0" + new String(comment.createdDate[1]) : new String(comment.createdDate[1]);
    let day = new String(comment.createdDate[2]).length == 1 ? "0" + new String(comment.createdDate[2]) : new String(comment.createdDate[2]);
    let hours = new String(comment.createdDate[3]).length == 1 ? "0" + new String(comment.createdDate[3]) : new String(comment.createdDate[3]);
    let minutes = new String(comment.createdDate[4]).length == 1 ? "0" + new String(comment.createdDate[4]) : new String(comment.createdDate[4]);
    const createdDate = day + "." + mounth + "." + new String(comment.createdDate[0]) + " " + hours + ":" + minutes;
    var popup = document.getElementById("popupComment");
    var commentId = comment.id;
    const [updateComment, setUpdateComment] = useState({
        createdDate: '',
        emailUser: '',
        idNew: '',
        text: ''
    })

    const deleteComment = () => {
        deleteCommentCall(comment.id);
        window.location.reload();
    }

    const updateNewsText = (value) => {
        const newNewsCommentCopy = { ...updateComment };
        newNewsCommentCopy.text = value;
        setUpdateComment(newNewsCommentCopy);
    }
    
    const editComment = () => {
        updateComment.createdDate = new Date().toLocaleDateString('uk-UA') + " " + new Date().toLocaleTimeString('uk-UA').slice(0,5);
        updateComment.emailUser = comment.createdBy.email;
        updateComment.idNew = comment.news.idNew;
        updateCommentCall({ commentId, updateComment });
        window.location.reload();
    }

    const openPopup = () => {
        popup.classList.add("open-popup");
      };

    return (
        <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex', backgroundColor: 'rgb(192,192,192)' }}>
              <CardContent sx={{ flex: 1 }}>
                <div>
                    <p style={{fontSize: '16px', margin: '0px'}}
                    >
                        {comment.createdBy.firstName + " " + comment.createdBy.lastName}
                    </p>
                </div>
                <div>
                    <p style={{fontSize: '12px', margin: '0px'}}
                    >
                        {createdDate}
                    </p>
                </div>
                <Divider sx={{height: '0.5em'}}/>
                <div>
                    <p style={{fontSize: '16px'}}
                    >
                        {comment.text}
                    </p>
                </div>
              </CardContent>

              <div style={{paddingTop:"1em", display:'flex', justifyContent: 'center'}}>
                <div className="popup" id="popupComment">
                  <button id='closeNewNews' onClick={() => {popup.classList.remove("open-popup")}}>close</button>
                  <h2 style={{marginTop: '-1em'}}>Редагування коментарію</h2>
                  <div style={{paddingBottom: '0.5em', marginTop: '0.5em'}}>
                    <p style={{margin: 0, fontSize: '20px', padding: '0.5em'}}>Введіть текст</p>
                    <textarea 
                      style={{ minWidth: "50em", minHeight: "15em", maxWidth: "80em", maxHeight: "35em", borderRadius: "0.25em"}}
                      onChange={(e) => updateNewsText(e.target.value)}
                    >
                    </textarea>
                  </div>
                  <button className="createNewNewsButton" type="submit" onClick={editComment}>Редагувати</button>
                </div>
              </div>

              <div style={{marginTop: '0.1em', marginLeft: '47em', position: 'absolute'}}>
                <button className="createNewNewsButton" style={{backgroundColor: 'red', borderColor: 'red'}} onClick={deleteComment}>Видалити</button>
              </div>
              <div style={{marginTop: '0.1em', marginLeft: '55em', position: 'absolute'}}>
                <button className="createNewNewsButton" style={{backgroundColor: 'blue', borderColor: 'blue'}} onClick={openPopup}>Редагувати</button>
              </div>
            </Card>
        </Grid>
    );
}

export default NewsComment;