import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import api from '../services/api';

function HomePage() {

  const [ books, setBooks ] = React.useState([]);
  const [ search, setSearch ] = React.useState('');

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {
    api
      .get("/get_all_books", config)
      .then((response) => {
        if(response.data == 'invalid token' || response.data == []){
          setBooks([])
        }else{
          setBooks(response.data)
        }
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

    //<li className='table_row'>
      //<div><Link to='/editar/1'>{e.title} <span><FaExternalLinkAlt /></span></Link></div>
      //<div>{e.edition}</div>
      //<div>{e.publishingCompany}</div>
      //<div>{e.author}</div>
    //</li>

  const Filtered = () => {
    let searchToReq = search == '' ? 'empty' : search
    const search_req = `/get_filtered_book/${searchToReq}`
      api
        .get(search_req, config)
        .then((response) => {
          if(response.data == 'invalid token' || response.data == []){
            setBooks([])
          }else{
            setBooks(response.data)
          }
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
  }


  return (
    <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Lista de Livros Cadastrados</h2>
          <div className='search_register'>
            <Link to='/cadastrar'>Cadastrar novo</Link>
            <div className='container_search'>
              <input type='text' onChange={e => setSearch(e.target.value)}/>
              <button className='search_button' onClick={Filtered}><FaSearch /></button>
            </div>
          </div>
        </div>
        <div className='table_container'>
          <ul>
            <li className='header_table'>
              <div>Título</div>
              <div>Edição</div>
              <div>Editora</div>
              <div>Autor</div>
            </li>
            {books.length == 0 ? <h3 className='noData'>Sem dados!</h3> : false}
            {books.map((e, k)=>{
              let redirect_link = `/editar/${e.id}`
              return(
                <li key={k} className='table_row'>
                  <div><Link to={redirect_link}>{e.title} <span><FaExternalLinkAlt /></span></Link></div>
                  <div>{e.edition}</div>
                  <div>{e.publishingCompany}</div>
                  <div>{e.author}</div>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  );
}

export default HomePage