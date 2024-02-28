import './App.css';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


function MyList({elements}){
  const el = elements.map((val,idx) => {
    return(
      <li key={idx}>
        <FormControlLabel control={<Checkbox />} label={val + idx} />
        
      </li>
    );
  }
  );

  return(
    <ol>
      {el}
    </ol>

  )


}


function App() {


  const [elements,setElements] = useState(Array(0));
  const [newValue,setNewValue] = useState("");

  function addToList(element){
    let tempList = elements.slice();
      tempList.push(element)
      setElements(tempList)
  }

  function clearList(){
    setElements(Array(0))
  }
  
  return (
    <div className="App">
        <div className='title'>
          TODO LIST
        </div>
        <div className='button_container'>
          <Button onClick={() => addToList("ciaoo")} variant="contained">ADD ELEMENT</Button>
          <Button onClick={clearList} variant="contained">CLEAR LIST</Button>
        </div>
        <div className='list_container'>
          <MyList elements={elements}/>  
        </div>

        
    </div>
  );
}

export default App;
