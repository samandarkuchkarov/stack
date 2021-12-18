
import './App.css';
import Header from './Components/Header';
import Questions from './Components/Questions';
import {useEffect,useState} from 'react'
import axios from 'axios';

function App() {

  const [page,setPage] = useState(1)
  const [questions,setQuestions] = useState([])
  const [token,setToken] = useState(false)
  const upload = (e) => {
    if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
      setPage((oldPage)=>oldPage+1)
    }
  }


  useEffect(() => {
  
    axios.get('https://api.stackexchange.com/questions', {
      params:{
        key:'PBGeiCQ1UrOBeoNslQPXrA((',
        page,
        pagesize:20,
        order:'desc',
        sort:'hot',
        site:'localhost',
        run:true,
        site:'stackoverflow'
      }
    })
    .then((response) => {
      console.log(response)
      setQuestions((oldQuesttions)=>{
        return [...oldQuesttions,...response.data.items]
      })
    }, (error) => {
      console.log(error);
    });
    return () => {}
  }, [page])


  useEffect(() => {
    
    const token = window.location.hash.replace('#access_token=','').replace('&expires=86400','')
    if(token){
      setToken(token)
    }

    window.addEventListener('scroll',upload)
    return () => { }
  }, [])

  return (
    <div className="App">
      <Header/>
      {questions && questions.map((item,index)=><Questions token={token} data={item} key={index} />)}
      <div className='spinnerContent'></div>
    </div>
  );
}

export default App;
