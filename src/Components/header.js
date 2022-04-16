import { useState } from "react"
import Filters from "./filters"
import './header.css'


export default function Header(props){
    const [sTerm, setTerm] = useState("");
    const searchBooks = (e) => {
        e.preventDefault()
        props.sb(sTerm)
    }
    
    return(
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <div className="header">
                <p className="title">Bookify</p>
            </div>
            <div>
                <form className="search" onSubmit={(e) => searchBooks(e)}>
                    <div className = "top">
                        <input className="search-i" placeholder="Search for any book" onChange={(e) => setTerm(e.target.value)}/>
                        <div style={{width: '1px', height: '25px', backgroundColor: '#ccc'}}/>
                        <select className="search-f" >
                            <option onClick={() => props.setType("intitle")} >Title</option>
                            <option onClick={() => props.setType("inauthor")} >Author</option>
                            <option onClick={() => props.setType("inpublisher")} >Publisher</option>
                        </select>
                        <div style={{width: '1px', height: '25px', backgroundColor: '#ccc'}}/>
                        <button className="search-b" onClick={(e) => searchBooks(e)}>Search</button>
                    </div>
                    
                    <Filters selectGenre = {(g) => props.selectGenre(g)} selectedG={props.selectedG}/>
                </form>
            </div>
            
        </div>
    )
}