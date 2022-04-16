import Item from "./item"

export default function List(props){
    return(
        <div style={{display: 'flex', flexDirection: 'row', flexFlow: 'wrap', marginTop: '8%', justifyContent:'center', alignItems:'center'}}>
        {props.items.map((item,index) => {
            return(
                <div on>
                <Item i={item} />
                </div>
            )
        })}
        </div>
    )
}