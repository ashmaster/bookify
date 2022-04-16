import './filters.css'
export default function Filters(props){
    const genreList = [
        "Fiction",
        "Poetry",
        "Fantasy",
        "Romance",
        "Art",
        "Biographies",
        "Children",
        "Comics",
        "Cooking",
        "Crime",
        "Health",
        "History",
        "Horror",
        "Nonfiction",
        "Religion",
        "Sports",
        "Technology",
        "Travel",
        "Women"
    ]

    return(
        <div style={{display: 'flex', flexDirection: 'row',width: '95%', marginTop: '10px', overflowX: 'scroll', scrollbarColor: '#ccc'}}>
            {genreList.map((i,index) => {
                return(
                    <div onClick={() => props.selectGenre(i)} className="filter-i" style={{ border: props.selectedG.includes(i) ? '3px solid #000' : '1px solid #ccc'}}>
                        {i}
                    </div>
                )
            })}
        </div>
    )
}