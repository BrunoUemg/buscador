import {useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api.js';
function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

 async function handleSearch(){
   
    if(input === ''){
      alert("Preencha com algum cep!");
      return;
    }

    try{  
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("CEP NÃO EXISTE");
      setInput("");
    }

  }

  function closeMain(){
    setTimeout(() => {
      setCep("")
    }, 800);
  }

  return (
    <div className="container">
       
         <h1 className="title">Buscador cep</h1>

         <div className="containerInput">
           <input 
           type="text"
           placeholder="Digite seu cep"
           value={input}
           onChange={(e) => setInput(e.target.value)} 
           />
          <button className="buttonSearch" onClick={handleSearch} >
          <FiSearch size={25} color="#fff" />
          </button>
         </div>


          {Object.keys(cep).length > 0 && (
            <main className='main'>
            <button className="close" onClick={closeMain}>x</button>
            <h2>CEP: {cep.cep}</h2>
           
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
            
            </main>
          )}
        
       
    </div>
  );
}

export default App;
