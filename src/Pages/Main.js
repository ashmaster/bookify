import Header from "../Components/header";
import { useEffect, useState } from "react"
import axios from "axios";
import List from "../Components/list";
import Filters from "../Components/filters";

function Main(props) {
    const [sIndex, setIndex] = useState(0);
    const [genres, setGenres] = useState(null);
    const [results, setResults] = useState([])
    const [searchTerm, setTerm] = useState("");
    const [notFound, setNotFound] = useState(false)
    const [total, setTotal] = useState(0);
    const [type, setType] = useState(null)
    const searchBook = (e) => {
        setTerm(e)
        getBooks(e,"n") 
    }
    const getBooks = async (q,p) => {
        if(p=="n"){
            setIndex(0)
        }
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genres || ""}+${type || "intitle"}:${q}&maxResults=12&startIndex=${sIndex}`);
        if(res.data.totalItems > 0 && res.data.items && res.data.items.length > 0){
            setNotFound(false)
            if(p == "n"){
                setTotal(res.data.totalItems)
                setResults(res.data.items)
            }
            else{
    
                setResults(oldArr => [...oldArr,...res.data.items])
            }
        }
        else if(p!="y"){
            setNotFound(true)
        }
        
    }

    const selectGenre = (g) => {
        let gen
        if(!genres)
            gen = []
        else
            gen = [...genres]
        if(gen.includes(g)){
            let index = gen.indexOf(g);
            gen.splice(index,1)
            setGenres(gen)
        }
        else{
            setGenres(oldG => oldG ? [...oldG, g] : [g])
        }
        
    }

    const pageinate = () => {
        setIndex(i => i+=12)
    }

    useEffect(() => {
        if(sIndex != 0)
            getBooks(searchTerm, "y")
    },[sIndex])

    useEffect(() => {
        genres && getBooks(searchTerm, "n")
    },[genres])

    useEffect(() => {
        if(type){
            getBooks(searchTerm,"n")
        }
    },[type])

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
            <Header sb={(e) => searchBook(e)} selectGenre = {(g) => selectGenre(g)} selectedG={genres || []} setType={(e) => setType(e)} type={type}/>
            <div style={{marginTop: '2%', textAlign: 'center'}}>
                <div>Searching for <span style={{fontWeight: 'bold'}}>"{searchTerm}"</span> in <span style={{fontWeight: 'bold'}}>{type && type.replace('in','') || "title" }</span></div>
                <div>Filters: <span style={{fontWeight: 'bold'}}>{genres && genres.join(', ') || "none"}</span></div>
            </div>
            {!notFound ? <List items={results} /> : <h2>Book not found</h2>}
            {sIndex < total && !notFound ? <button style={{border: 'none', backgroundColor: '#ccc',fontSize: '22px', padding: '5px', cursor: 'pointer', marginBottom: '20px' }} onClick={() => pageinate()}>Load more</button> : null}
        </div>
    )
}

export default Main;