import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export default function InstrumentListPage() {
    const [marketObject, setMarketObject] = useState({})



    function fetchInstrumentList(){
        fetch("https://market-data-collector.firebaseio.com/market-collector/.json")
        .then( response => response.json() )
        .then( data => setMarketObject(data["markets"]) )

    }

    useEffect(()=> {
        fetchInstrumentList()
    }, [])
    

    console.log(marketObject)
    
    let marketList = Object.keys(marketObject)

    return (
    <>
    <h1>Market List Page</h1>
    <div>
        {marketList.map( marketListItem => {
            return <p>< Link to={"/markets/" + marketListItem}>{marketListItem}</Link></p>
        })}
    </div>
    </>
    )
}
