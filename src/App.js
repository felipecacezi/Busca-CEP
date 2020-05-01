import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Button, Form, FormControl, Table, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import axios from 'axios';



import logo from './img/logoTitle.png'

function App() {

  const [cep, setCep]               = useState('');
  const [rua, setRua]               = useState('');
  const [cidade, setCidade]         = useState('');
  const [uf, setUf]                 = useState('');
  const [show, setShow]             = useState(false);
  const [conteudo, setConteudo]     = useState('');
  const [table, setTable]           = useState('');
  const [condInputs, setCondInputs] = useState(0);
  const [inputs, setInputs]         = useState(<FormControl className="txt" type="text" placeholder="Escolha o tipo de pesquisa" disabled />);  
  const handleClose                 = () => setShow(false);

  function pesquisar(){

    let numero_cep  = cep;
    let nome_rua    = rua;
    let nome_cidade = cidade;
    let sigla_uf    = uf;

    validacao(condInputs, numero_cep, nome_rua, nome_cidade, sigla_uf)
   
    switch(condInputs){
      case '0':
      break;
      case '1':

        axios.get("https://viacep.com.br/ws/"+numero_cep+"/json/")
           .then(function (response) {
              list_table(response.data);
        })

      break;
      case '2':

        axios.get("https://viacep.com.br/ws/"+sigla_uf+"/"+nome_cidade+"/"+nome_rua+"/json/")
        .then(function (response) {          
          list_table(response.data);
        })

      break;
    }

    
  }

  function validacao(condInputs, numero_cep, nome_rua, nome_cidade, sigla_uf){

    if(condInputs == '0'){
      setConteudo('Selecione um tipo de pesquisa!')
      setShow(true)
      return false;
    } else if (condInputs == '1' && !numero_cep){
      setConteudo('CEP inválido')
      setShow(true)
      return false;
    } else if (condInputs == '2'){

      if(!nome_rua){
        setConteudo('Rua inválida')
        setShow(true)
        return false;
      } else if(!nome_cidade){
        setConteudo('Cidade inválida')
        setShow(true)
        return false;
      } else if(!sigla_uf){
        setConteudo('UF inválida')
        setShow(true)
        return false;
      }

    }

  }

  function list_table(itens){

    let i = 0;
    let lines = [];
    let reps = '';

    
      switch(condInputs){
        case '0':
          lines.push();
        break;
        case '1':
  
          lines.push(<tr key={itens.cep}>
            <td>{itens.cep}</td>
            <td>{itens.ibge}</td>
            <td>{itens.logradouro}</td>
            <td>{itens.bairro}</td>
            <td>{itens.uf}</td>
            <td>{itens.localidade}</td>
          </tr>)
  
        break;
        case '2':          
  
          for(i=0; i <= itens.length; i++){
              
            if(itens[i]){

              lines.push( <tr key={itens[i].cep}>
                            <td>{itens[i].cep}</td>
                            <td>{itens[i].ibge}</td>
                            <td>{itens[i].logradouro}</td>
                            <td>{itens[i].bairro}</td>
                            <td>{itens[i].uf}</td>
                            <td>{itens[i].localidade}</td>
                          </tr>)

            }

          }          
  
        break;
      }
   
    setTable(lines)

  }

  function controla_inputs(){

    let inputs = [];

    setInputs('')

    switch(condInputs){
       case '0':

        inputs.push(<FormControl key={1} className="txt" type="text" placeholder="Escolha o tipo de pesquisa" disabled />);

       break;
       case '1':

         inputs.push(<FormControl key={2} placeholder="Digite um CEP ( 13474000 )" onChange={ e => setCep(e.target.value) } className="txt" type="text" />);

       break;
       case '2':

         inputs.push(<FormControl key={3} onChange={ e => setRua(e.target.value) } className="txt" placeholder="Rua"/>);
         inputs.push(<FormControl key={4} onChange={ e => setCidade(e.target.value) } className="txt" placeholder="Cidade"/>);
         inputs.push(<FormControl key={5} onChange={ e => setUf(e.target.value) } className="txt" placeholder="UF"/>);
        
       break;
       default:
        inputs.push(<FormControl key={1} className="txt" type="text" placeholder="Escolha o tipo de pesquisa" disabled />);
       break;
     }

     setInputs(inputs)

  }
  
  return (
    <div className="App">
      
      <div className="top-bar">
          <img src={logo} className="img-logo" />          
      </div>
      

      <div className="container-pesquisar">

        <div className="container-tipo">

          <FormControl as="select" className="slc-tipo" onClick={ ()=>{controla_inputs()} }  onChange={ e => setCondInputs(e.currentTarget.value) }>
            <option value="0">Tipo de Pesquisa</option>
            <option value="1">CEP</option>
            <option value="2">Endereço</option>
          </FormControl>

        </div>

        <div className="container-input">
          {inputs}
        </div>
        <div className="container-btn-pesquisar">
        <Button variant="primary" className="btn-pesquisar" onClick={ () =>{pesquisar()} } type="button">Pesquisar</Button>
        </div>

      </div>

      <div className="container-resultado-pesquisa">

        <Table bg="primary" responsive bordered striped>
          <thead>
            <tr>
              <th>CEP</th>
              <th>Nº IBGE</th>
              <th>Logradouro</th>
              <th>Bairro</th>
              <th>Unidade Federativa</th>
              <th>Municipio</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </Table>

      </div>
      { show ?  <Modal show={show} onHide={handleClose}>
                  
                  <Modal.Header closeButton>
                    <Modal.Title>Atenção</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>{conteudo}</Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Fechar
                    </Button>            
                  </Modal.Footer>

                </Modal> : null}
      

    </div>
  );
}

export default App;
