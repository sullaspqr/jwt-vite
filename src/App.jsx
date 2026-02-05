import { useState } from 'react'
import axios from 'axios';
import './App.css'

export const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState('');
  const [logged, setLogged] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://jwt.sulla.hu/login', {
        username,
        password,
      });
      setToken(response.data.token);
      console.log("Token: ", response.data.token);
      setLogged(true);
    } catch (error) {
      console.error("Hitelesítés sikertelen: ",error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jwt.sulla.hu/termekek', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("Végpont adatok: ", response.data);
    } catch (error) {
      console.error("Végpont lekérdezés sikertelen: ",error);
    
  }};

  return (
      <div style={{padding: '28px' }}>
          {token ? (
        <div>
          <h1>Be van jelentkezve - Üdvözöljük!</h1>
          <div style={{ marginTop: '28px', border: '1px solid #ccc', padding: '15px'}}>
          <h2>A védett végpont adatai</h2>
          <button onClick={fetchData}>Végpont lekérdezés</button>
          {data && (
            <ul>
              {data.map((item) => (
                <li key={item.id}> {item.id} - {item.name} - {item.price} </li>
              ))}
            </ul>
          )}
        </div>
        <br />
        <button onClick={() =>{ setToken(''); setData(null);}}>Kijelentkezés</button>
        </div>
      ) : (
         <div><h1>Bejelentkezés</h1>
        Felhasználó: <input type="text"
        placeholder='felhasználónév'
        value={username}
        onChange={(event) => setUsername(event.target.value) } /> <br />
        Jelszó: <input type="password"
        placeholder='jelszó'
        value={password}
      onChange={(event) => setPassword(event.target.value) } /> <br />
      <button onClick={handleLogin}>Bejelentkezés</button>
      </div>
        )
        }
      </div>
  );
};
