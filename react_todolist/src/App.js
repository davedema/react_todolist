import './App.css';
import {React, useState } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import '@picocss/pico'

function MyForm({addToList, close}){
  const [inputTxt, setInputTxt] = useState("")
  const [inputCheck, setInputCheck] = useState(false);


  return(
    <form>
      <label className='my_label'>ADD A NEW TASK</label>
      <div className="checkbox_txt_form">
        <input value={inputCheck} type="checkbox" onChange={e => setInputCheck(e.target.checked)} />     
        <input className="form_txt" value={inputTxt}  type="text" placeholder="task name*" onInput={e => setInputTxt(e.target.value)}/>
      </div>
      <Button className='formbtn' onClick={() => {
            if(inputTxt!=""){
              close();
              addToList([inputTxt,inputCheck]);
            } 
          }
        }
        variant="contained">ADD</Button>
    </form>
  )
};

function MyList({elements, toggle}){

  const el = elements.map((val,idx) => {
    return(
          <ListItem key={idx}>
          <ListItemButton role={undefined} onClick={() => toggle(idx)} dense>
            <ListItemIcon>
                  <Checkbox checked={val[1]} />
            </ListItemIcon>

            <ListItemText primary={val[0]} />
            </ListItemButton>
          </ListItem>
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addToList(element){
    let tempList = elements.slice();
      tempList.push(element)
      setElements(tempList)
  }

  function toggle(idx){
    let tempList = elements.slice();
    tempList[idx][1] = !tempList[idx][1]
    setElements(tempList)
  }

  function clearList(){
    setElements(Array(0))
  }



  function completed_percentage(){
    let flags = elements.map((x) => x[1]);
    let sum = 0;

    for (const element of flags) {
      sum += element;
    }

    if (flags.length === 0){
      return "0%"  
    }

    return Math.trunc((sum / flags.length)*100).toString() + "%"
  }



  
  return (
    <div className="App">
      <div className='main_container'>
        <div className='title'>
          TODO LIST
        </div>
        <div className='button_container'>
          <Button onClick={handleClickOpen} variant="contained">ADD ELEMENT</Button>
          <Button onClick={clearList} variant="contained">CLEAR LIST</Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <MyForm addToList={addToList} close={handleClose} />
        </Dialog>
        <div className='list_container'>
          <MyList elements={elements} toggle={toggle}/>  
        </div>
      </div>
      <div className='floating_perc'>
        {completed_percentage()}
      </div>
    </div>
  );
}

export default App;
