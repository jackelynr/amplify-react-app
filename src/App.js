import React, {useState, useEffect} from 'react'
import{API} from 'aws-amplify'
import './App.css'

const App = () => {
    const [coins, updateCoins] = useState([])

    const fetchCoins = async () => {
        const data = await API.get('cryptoapi' , '/coins')
        updateCoins(data.coins)
    }

    useEffect (() => {
        fetchCoins()
    }, [])

    return (
        <div className="App">
            {
                coins.map((coin, index) => (
                    <div key={coin.name}>
                        <h2>{coin.name} - {coin.symbol}</h2>
                        <h5>${coin.price_usd}</h5>
                    </div>
                ))
            }
        </div>
    )
}
export default App
