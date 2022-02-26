import React, {useState, useEffect} from 'react'
import{API} from 'aws-amplify'
import './App.css'

const App = () => {
    const [input, updateInput] = useState({limit:5, start:0})
    const updateInputValue = (type, value) => {
        updateInput({...input, [type]:value})
    }


    const [coins, updateCoins] = useState([]);
    const [loading, setLoading] = useState([true]);

    setLoading = (true);
    //define function call to API
    const fetchCoins = async () => {
        loading = true;

        const {limit,start}=input;
        const data = await API.get('cryptoapi',`/coins?limit=${limit}&start=${start}`);
        updateCoins(data.coins);
        setLoading = (false);
    }


    //hard code API fetch
    // const fetchCoins = async () => {
    //     const data = await API.get('cryptoapi' , '/coins')
    //     updateCoins(data.coins)
    // }
    //Call fetchCoins function when component loads
    useEffect (() => {
        fetchCoins()
    }, []);



    return (
        <div className="App">
        {loading && <h2>Loading ...</h2>}
            {!loading &&
                <div>
                <input
                    onChange={e => updateInputValue('limit', e.target.value)}
                    placeholder="limit" />
                <input
                    laceholder="start"
                    onChange={e => updateInputValue('start', e.target.value)}/>
                //add button to the ui to give user the option to call api
                <button onClick={fetchCoins}>Fetch Coins</button>

                    {
                        coins.map((coin, index) => (
                            <div key={coin.name}>
                                <h2>{coin.name} - {coin.symbol}</h2>
                                <h5>${coin.price_usd}</h5>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}
export default App
