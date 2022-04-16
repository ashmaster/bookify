import './item.css'
import {FaStar} from 'react-icons/fa'
export default function Item(props){
    const extractThumbnail = ({ imageLinks }) => {
        const DEFAULT_THUMBNAIL = "icons/logo.svg";
        if (!imageLinks || !imageLinks.thumbnail) {
          return DEFAULT_THUMBNAIL;
        }
        return imageLinks.thumbnail.replace("http://", "https://");
    };
    const sliceTitle = ({title}) => {
        if(title.length > 30){
            return title.slice(0,30)
        }
        else    
            return title
    }
    
    const {i} = props
    return(
        <div className="item">
            <img className="thumb" src={extractThumbnail(i.volumeInfo)} width={100}/>
            <h3>{sliceTitle(i.volumeInfo)}{i.volumeInfo.title.length > 30 ? "..." : null}</h3>
            <h4>{i.volumeInfo.authors && i.volumeInfo.authors.join(', ')}</h4>
            {i.volumeInfo.averageRating && <div style={{position: 'absolute', top: 10, right: 10}}><span style={{fontWeight: 'bold'}}>{i.volumeInfo.averageRating} <FaStar color='yellow'/></span></div>}
        </div>
    )
}