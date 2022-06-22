import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function CreatePage() {

  const [ title, setTitle ] = React.useState('');
  const [ author, setAuthor ] = React.useState('');
  const [ isbn, setIsbn ] = React.useState('');
  const [ pages, setPages ] = React.useState('');
  const [ edition, setEdition ] = React.useState('');
  const [ publishingCompany, setPublishingCompany ] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    
    e.preventDefault()

    let finalData = {
      title,
      author,
      isbn,
      pages,
      edition,
      publishingCompany
    }

    const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
    };

    if(
      title != '' &&
      author != '' &&
      isbn != '' &&
      !isNaN(pages) &&
      edition != '' &&
      publishingCompany != ''
    ){
      api
        .post('/register_book', finalData, config)
        .then((response) => {
          if(response.data == 'invalid token'){
            alert('Sem permissão para realizar esta ação')
          }else{
            navigate('/')
          }
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }else{
      alert('Preencha todos os campos de forma correta!')
    }
  }

    return (
      <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Cadastrar novo livro</h2>
          <Link to='/'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Título:
              <input onChange={e => setTitle(e.target.value)} type="text" placeholder='Título'/>
            </label>
            <label>
              Autor:
              <input onChange={e => setAuthor(e.target.value)} type="text" placeholder='Autor'/>
            </label>
          </div>
          <div>
            <label>
              ISBN:
              <input onChange={e => setIsbn(e.target.value)} type="text" placeholder='ISBN'/>
            </label>
            <label>
              Quantidade de Páginas:
              <input onChange={e => setPages(e.target.value)} type="text" placeholder='Quantidade de Páginas'/>
            </label>
          </div>
          <div>
            <label>
              Edição:
              <input onChange={e => setEdition(e.target.value)} type="text" placeholder='Edição'/>
            </label>
            <label>
              Editora:
              <input onChange={e => setPublishingCompany(e.target.value)} type="text" placeholder='Editora'/>
            </label>
          </div>
          <div className='container_submit'>
          <input type="submit" value="Enviar" />
          </div>
        </form>
      </div>
    );
}

export default CreatePage