import { useState } from 'react';
import Icon from  './components/Icon';
import { ToastContainer, toast } from 'react-toastify';
import { Card , CardBody ,Button ,Container ,Col ,Row } from 'reactstrap';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const itemArray = new Array(9).fill("empty");


const App = () => {

  const [isCross,setIsCross] = useState(false);
  const [winMessage ,setWinMessage] = useState("");

  const reloadGame = ()=>{
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty",0,9);
  }
  
  const checkIsWinner = () => {
  
    // for rows 
    if(itemArray[0] !=="empty" && itemArray[0]===itemArray[1] && itemArray[1] === itemArray[2]){
      setWinMessage(`${itemArray[0]} Wins`)
    }
    else if(itemArray[3] !=="empty" && itemArray[3]===itemArray[4] && itemArray[4] === itemArray[5]){
      setWinMessage(`${itemArray[3]} Wins`)
    }
    else if(itemArray[6] !=="empty" && itemArray[6]===itemArray[7] && itemArray[7] === itemArray[8]){
      setWinMessage(`${itemArray[6]} Wins`)
    }
    // for cols

    else if(itemArray[0] !=="empty" && itemArray[0]===itemArray[3] && itemArray[3] === itemArray[6]){
      setWinMessage(`${itemArray[0]} Wins`)
    }
    else if(itemArray[1] !=="empty" && itemArray[1]===itemArray[4] && itemArray[4] === itemArray[7]){
      setWinMessage(`${itemArray[1]} Wins`)
    }
    else if(itemArray[2] !=="empty" && itemArray[2]===itemArray[5] && itemArray[5] === itemArray[8]){
      setWinMessage(`${itemArray[2]} Wins`)
    }

    // for diagonals

    else if(itemArray[0] !=="empty" && itemArray[0]===itemArray[4] && itemArray[4] === itemArray[8]){
      setWinMessage(`${itemArray[0]} Wins`)
    }
    else if(itemArray[2] !=="empty" && itemArray[2]===itemArray[4] && itemArray[4] === itemArray[6]){
      setWinMessage(`${itemArray[2]} Wins`)
    }
  }
  
  const changeItem = (itemNumber)=>{
    if(winMessage){
      return toast(winMessage,{type:"success"})
    }

    if(itemArray[itemNumber] ==="empty"){
      itemArray[itemNumber] = isCross ? "cross":"circle";
      setIsCross(!isCross);
    }
    else{
      return toast("Already Filled",{type:"error"});
    }
      checkIsWinner();
  };

  return (
    <Container className='p-5'>
      <ToastContainer position='bottom-center' />
      <Row>
        <Col md={6} className='offset-md-3'>
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h2 className='text-center text-success text-uppercase'>
                {winMessage}
                <Button color='success' block onClick={reloadGame}>Reload Game</Button>
              </h2>
            </div>
          ):(
            <h2 className="text-center text-warning">
              {isCross ? "Cross" : "Circle"} turns
            </h2>
          )}
          <div className="grid">
            {itemArray.map((item,index)=>(
              <Card color='warning' onClick={()=>changeItem(index)}>
                <CardBody className='box'>
                  <Icon name={item}></Icon>
                </CardBody>
              </Card>
            ))}
          </div>
          </Col>
      </Row>
    </Container>
  );
}

export default App;
