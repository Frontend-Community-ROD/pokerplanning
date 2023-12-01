import { useEffect, useState } from 'react'
import './App.css'
import { database } from './fbconfig.ts'
import { onValue, ref, set } from 'firebase/database'

function App() {
  const [name, setName] = useState('');
  const [ppId, setPpId] = useState<string>('');
  const cards =['0','1','2','3','5','8','13','21','34','55','98','?'];
  const [planning, setPlanning] = useState<pokerPlanning>({showVotes: false, votes: [] });

  useEffect(() => {

    const url = window.location.href.split("/");
    const ppIdUrl = url[url.length-1];
    let ppIdAux;
    if (url[url.length-2] ==='ppid' && ppIdUrl.length>0){
      ppIdAux =ppIdUrl
    }
    else{
      ppIdAux = new Date().getTime().toString();
    }
    if(ppIdAux && ppIdAux.length>0){
      console.log('paso');
    setPpId(ppIdAux);
    }
  }, []);

  useEffect(() => {
    if(ppId && ppId.length>0){
      const dbRef = ref(database, 'poker_planning/' + ppId );
      console.log(ppId);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if(data){
        console.log("Value received:", data);
        //setGlobalCount(data.count);
        setPlanning(data);
          }
        });
    }
  }, [ppId]);

  useEffect(() => {
    const dbRef = ref(database, 'poker_planning/' + ppId);
    if(planning && planning.votes && ppId) set(dbRef, planning);
    console.log("Saving:", ppId, planning );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planning]);
  
  function handleVote(vote: string){
    setPlanning( prev => ({showVotes: prev.showVotes, votes: prev.votes?[...prev.votes.filter(x => x.name!=name), {name, vote}]:[{name, vote}]}));
  }
  const handleName = (event: any) => {
    setName(event.target.value);
  };

  function handleShow(){
    setPlanning( prev => ({showVotes: !prev.showVotes, votes: prev.votes?[...prev.votes]:[]}));
  }

  function handleShare(){
    navigator.clipboard.writeText(window.location.origin + '/ppid/' + ppId);
    alert(window.location.origin + '/ppid/' + ppId);
  }
  function handleRestart(){
    setPlanning( prev => ({showVotes: false, votes: prev.votes?[...prev.votes.map(x =>({ name: x.name, vote:''}))]:[]}));
  }
  return (
    <>
      <h1>POKER PLANNING</h1>

      <div className="card">
          <p>
            Write your name:
          </p>
          <input  className="name" value={name} onChange={(e) => handleName(e)}></input>
      </div>

      <div className="card">
          <p>
            Choose your card:
          </p>
        {cards.map((item,index)=>{
          return (<button className="vote" disabled={!name} onClick={() => handleVote(item)} key={index}>
          {item}
        </button>)})}
        </div>

        <div className="card">
          <p>
            Results:
          </p>
        {planning.votes && planning.votes.map((item,index)=>{
          return (<div className='resultLine'><div key={'_' + index}>{item?.name}</div><div key={index}>{planning.showVotes?item?.vote:'...'}</div></div>
        )})}
        </div>

        <div className="card">
          <button className="vote" onClick={() => handleShow()}>{planning.showVotes?'Hide votes':'Show votes'}</button>
          <button className="vote" onClick={() => handleRestart()}>Restart</button>
          <button className="vote" onClick={() => handleShare()}>Share</button>
        </div>

    </>
  )
}

export default App;

interface pokerPlanning {
  showVotes: boolean;
  votes: vote[];
}

interface vote {
  name: string;
  vote: string;
}