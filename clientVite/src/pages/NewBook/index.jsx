import React, {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api';

import './styles.css'
import mpLogo from '../../assets/mpLogo.png'

export default function NewBook(){

    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');

    const {bookId} = useParams();
        
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    const authorization = {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    };

    useEffect(() => {
        if(bookId === '0') return;
        else loadBook();
    }, [bookId]);

    async function loadBook() {
        try {
            const response = await api.get(`api/book/v1/${bookId}`, authorization);

            let adjustedDate = response.data.launchDate.split("T", 10)[0];

            setId(response.data.id);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setLaunchDate(adjustedDate);
        } catch (err) {
            alert('Error recovering Book! Try again!');
            navigate('/books');
        }
    }

    async function saveOrUpdate(e){
        e.preventDefault();

        const data = {
            title,
            author,
            launchDate,
            price
        }

        try {
            if(bookId === '0'){
                await api.post('api/Book/v1', data, authorization);
            }
            else{
                data.id = id;
                await api.put('api/Book/v1', data, authorization)
            }
            
        } catch (err) {
            alert('Error while recording Book! Try again')
        }

        navigate('/books');

    }

    return(
        <>
            <div className="new-book-container">
                <div className="content">
                    <section className="form">
                        <img src={mpLogo} alt="Mateus Pampolini" />
                        <h1>{(bookId === '0')? 'Add New Book' : 'Update Book'}</h1>
                        <p>Enter the book information and click on {(bookId === '0')? `'Add'` : `'Update'`}</p>
                        <Link className="back-link" to="/books">
                            <FiArrowLeft size={16} color="#251FC5" />
                            Back to Books
                        </Link>
                    </section>

                    <form onSubmit={saveOrUpdate}>
                        <input
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            placeholder="Author"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        />
                        <input
                            type="date"
                            value={launchDate}
                            onChange={e => setLaunchDate(e.target.value)}
                        />
                        <input
                            placeholder="Price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />

                        <button className="button" type="submit">{(bookId === '0')? 'Add' : 'Update'}</button>
                    </form>
                </div>
            </div>
        </>
    );
}