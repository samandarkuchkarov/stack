import classes from './Questions.module.css';
import Vote from '../VoteBlock';

function Question({data,token}) {
  return (
    <div className={classes.wrapper}>
        <div className={classes.textContainer}>
            <Vote token={token} data={data}/>
            <div>
                <p className={classes.owner}>By {data.owner.display_name}</p>
                <p className={classes.question}> {data.title}</p>
            </div>
        </div>
        <div className={classes.date}> <p>{new Date(data.creation_date*1000).getDate()+1}/{new Date(data.creation_date*1000).getMonth()+1}/{new Date(data.creation_date*1000).getFullYear()}</p> </div>
    </div>
  );
}

export default Question;
