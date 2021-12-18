import classes from './Vote.module.css';
import axios from 'axios';
import React from 'react';

function Vote({data,token}) {

    const [score,setScore] = React.useState(data.score)

    const upVote =()=>{   
        if(window){
            if(!token){
                var win = window.open(` https://stackoverflow.com/oauth?client_id=22513&redirect_uri=http://localhost:3000&scope=write_access`, '_blank');
                win.focus();
            }else{
                axios.post(`https://api.stackexchange.com/questions/${data.question_id}/upvote`, {
                        access_token:token,
                        preview:true,
                        key:'PBGeiCQ1UrOBeoNslQPXrA((',
                
                })
                .then((response) => {
                    if(localStorage.getItem('UpVoted')){
                        let questions = JSON.parse(localStorage.getItem('UpVoted'))
                        let current = questions.filter(item=>item.question_id === data.question_id)
                        if(current.length){
                            return
                        }else{
                            setScore((old)=>Number(old)+1)
                            localStorage.setItem('UpVoted',JSON.stringify([...questions,data]))
                        }
                    }else{
                        setScore((old)=>Number(old)+1)
                        localStorage.setItem('UpVoted',JSON.stringify([data]))
                    }
                
                }, (error) => {
                console.log(error);
                });
            }
        }
    }
    const downVote =()=>{   
        if(window){
            if(!token){
                var win = window.open(`https://stackoverflow.com/oauth/dialog?client_id=22513&redirect_uri=http://localhost:3000`, '_blank');
                win.focus();
            }else{
                axios.post(`https://api.stackexchange.com/questions/${data.question_id}/upvote`, {
                params:{
                    site:'stackoverflow'
                },
                data:{
                    access_token:token,
                    preview:false,
                    id:data.question_id, 
                    key:'PBGeiCQ1UrOBeoNslQPXrA((',
                }
                })
                .then((response) => {
                    if(localStorage.getItem('UpVoted')){
                        let questions = JSON.parse(localStorage.getItem('UpVoted'))
                        let current = questions.filter(item=>item.question_id === data.question_id)
                        if(current.length){
                            return
                        }else{
                            setScore((old)=>Number(old)+1)
                            localStorage.setItem('UpVoted',JSON.stringify([...questions,data]))
                        }
                    }else{
                        setScore((old)=>Number(old)+1)
                        localStorage.setItem('UpVoted',JSON.stringify([data]))
                    }
                
                }, (error) => {
                console.log(error);
                });
            }
        }
    }

  return (

            <div className={classes.voteBlock}>
                <svg onClick={upVote}  width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26Z"></path></svg>
                <p>{score}</p>
                <svg  onClick={downVote} width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10Z"></path></svg>
            </div>


  );
}

export default Vote;
