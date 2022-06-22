import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaTrash } from 'react-icons/fa';

function EditPage() {

  const [ title, setTitle ] = React.useState('');
  const [ author, setAuthor ] = React.useState('');
  const [ isbn, setIsbn ] = React.useState('');
  const [ pages, setPages ] = React.useState('');
  const [ edition, setEdition ] = React.useState('');
  const [ publishingCompany, setPublishingCompany ] = React.useState('');
 
  let { id } = useParams();
  let link_req_get = `/edit_book/${id}`;
  let link_req_post = `/update_book/${id}`;
  let delete_req = `/delete_book/${id}`;
  const navigate = useNavigate();
  
  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {
    api
      .get(link_req_get, config)
      .then((response) => {
        setTitle(response.data[0].title)
        setAuthor(response.data[0].author)
        setIsbn(response.data[0].isbn)
        setPages(response.data[0].pages)
        setEdition(response.data[0].edition)
        setPublishingCompany(response.data[0].publishingCompany)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

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

    api
      .post(link_req_post, finalData, config)
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
  }

  const deleteItem = () => {
    api
    .get(delete_req, config)
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
  }

    return (
      <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Editar livro id {id}</h2>
          <Link to='/'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Título:
              <input onChange={e => setTitle(e.target.value)} value={ title } type="text" placeholder='Título'/>
            </label>
            <label>
              Autor:
              <input onChange={e => setAuthor(e.target.value)} value={ author } type="text" placeholder='Autor'/>
            </label>
          </div>
          <div>
            <label>
              ISBN:
              <input onChange={e => setIsbn(e.target.value)} value={ isbn } type="text" placeholder='ISBN'/>
            </label>
            <label>
              Quantidade de Páginas:
              <input onChange={e => setPages(e.target.value)} value={ pages } type="text" placeholder='Quantidade de Páginas'/>
            </label>
          </div>
          <div>
            <label>
              Edição:
              <input onChange={e => setEdition(e.target.value)} value={ edition } type="text" placeholder='Edição'/>
            </label>
            <label>
              Editora:
              <input onChange={e => setPublishingCompany(e.target.value)} value={ publishingCompany } type="text" placeholder='Editora'/>
            </label>
          </div>
          <div className='container_submit'>
            <button className='delete_btn' onClick={deleteItem} type="button"><FaTrash /></button>
            <input type="submit" value="Enviar" />
          </div>
        </form>
      </div>
    );
}

export default EditPage