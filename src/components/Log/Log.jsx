
import { useState, useEffect } from 'react';
import axios from 'axios';
function Log() {
  const [logList, setLogList] = useState([])
  useEffect(()=>{
    fetchLogList()
  }, [])

  function fetchLogList() {
    console.log('in FetchLogList');
    axios.get('/api/log')
    .then(function(response)
    {setLogList(response.data);
    }).catch(function(err){
      console.log(err);
      alert('error in getting todos list')
    })
    
  }

  return(
  <div>
<p>{JSON.stringify(logList)}</p>

  </div>

  );
}
export default Log;