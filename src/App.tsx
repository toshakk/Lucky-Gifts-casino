import { useEffect, useState } from 'react';

export default function App() {
  const [gift, setGift] = useState<any>(null);
  const [balance, setBalance] = useState(0);
  const [result, setResult] = useState('');
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const webApp = (window as any).Telegram?.WebApp;
    if (webApp) {
      webApp.ready();
      webApp.expand();

      const initData = webApp.initDataUnsafe;
      const receivedGift = initData?.gift;
      if (receivedGift) {
        setGift(receivedGift);
        setBalance(prev => prev + receivedGift.stars);
      }
    }
  }, []);

  const spin = () => {
    if (spinning || !gift) return;
    setSpinning(true);
    setResult('');

    setTimeout(() => {
      const won = Math.random() < 13 / 37; // ← маржа 64 %

      if (won) {
        const prize = Math.floor(gift.stars * 2.15);
        setResult(`ВЫИГРАЛ ×2.15! Получи ${prize} ⭐ у @MyPrize64Bot`);
      } else {
        setResult(`ПРОИГРАЛ! Подарок остаётся в казино 🔥`);
      }
      setSpinning(false);
    }, 2200);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #000, #330000)',
      color: '#fff',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ fontSize: 38, textShadow: '0 0 15px red' }}>
        Gifts Casino 64%
      </h1>

      <div style={{ fontSize: 26, fontWeight: 'bold' }}>
        Баланс: {balance} ⭐
      </div>

      {!gift && (
        <div style={{
          background: '#1a0000',
          padding: 35,
          borderRadius: 25,
          margin: '30px auto',
          maxWidth: 400,
          border: '2px solid #ff3333'
        }}>
          <h2>Как играть:</h2>
          <p>1. Отправь любой подарок боту @gifts</p>
          <p>2. Получи спины и играй на марже 64%!</p>
        </div>
      )}

      {gift && !spinning && !result && (
        <div style={{
          background: '#330000',
          padding: 35,
          borderRadius: 30,
          margin: '30px auto',
          maxWidth: 420,
          boxShadow: '0 0 30px red'
        }}>
          <h2>Подарок получен!</h2>
          <p style={{ fontSize: 30 }}>{gift.name}</p>
          <p style={{ fontSize: 24 }}>{gift.stars} ⭐</p>

          <button onClick={spin} style={{
            fontSize: 34,
            padding: '22px 50px',
            marginTop: 25,
            background: '#ff0000',
            color: '#fff',
            border: 'none',
            borderRadius: 30,
            boxShadow: '0 0 25px red'
          }}>
            КРУТИТЬ РУЛЕТКУ<br/>
            <small style={{ fontSize: 20 }}>13 из 37</small>
          </button>
        </div>
      )}

      {spinning && <div style={{ fontSize: 48, margin: 60 }}>Крутится…</div>}

      {result && (
        <div style={{
          marginTop: 50,
          padding: 30,
          fontSize: 32,
          background: result.includes('ВЫИГРАЛ') ? '#003300' : '#8b0000',
          borderRadius: 25,
          boxShadow: '0 0 30px ' + (result.includes('ВЫИГРАЛ') ? 'lime' : 'red')
        }}>
          {result}
        </div>
      )}
    </div>
  );
}
