import { useEffect, useState } from 'react';

function App() {
  const [gift, setGift] = useState<any>(null);
  const [balance, setBalance] = useState(0);
  const [result, setResult] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    if (initData?.gift) {
      setGift(initData.gift);
      setBalance(prev => prev + initData.gift.stars);
    }
  }, []);

  const spin = () => {
    if (!gift || isSpinning) return;
    setIsSpinning(true);
    setResult('');

    setTimeout(() => {
      const won = Math.random() < 13 / 37; // ← именно эта строка даёт маржу 64 %

      if (won) {
        const prize = Math.floor(gift.stars * 2.15);
        setResult(`ВЫИГРАЛ ×2.15! Получи ${prize} ⭐ у @MyPrize64Bot`);
      } else {
        setResult(`ПРОИГРАЛ! Подарок остаётся в казино 🔥`);
      }
      setIsSpinning(false);
    }, 2200);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #000000, #330000)',
      color: '#fff',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: 38, margin: '20px 0', textShadow: '0 0 15px red' }}>
        Gifts Casino 64%
      </h1>

      <div style={{ fontSize: 26, margin: '20px 0', fontWeight: 'bold' }}>
        Баланс: {balance} ⭐
      </div>

      {!gift && (
        <div style={{
          background: '#1a0000',
          padding: 35,
          borderRadius: 25,
          margin: '20px auto',
          maxWidth: 400,
          border: '2px solid #ff3333'
        }}>
          <h2>Как играть:</h2>
          <p>1. Отправь любой подарок боту @gifts</p>
          <p>2. Получи спины и играй на 64 % марже!</p>
        </div>
      )}

      {gift && !isSpinning && !result && (
        <div style={{
          background: '#330000',
          padding: 35,
          borderRadius: 30,
          margin: '30px auto',
          maxWidth: 420,
          boxShadow: '0 0 30px #ff0000'
        }}>
          <h2>Подарок получен!</h2>
          <p style={{ fontSize: 30 }}>{gift.name}</p>
          <p style={{ fontSize: 24 }}>Стоимость: {gift.stars} ⭐</p>

          <button
            onClick={spin}
            style={{
              fontSize: 34,
              padding: '22px 50px',
              marginTop: 25,
              background: '#ff0000',
              color: '#fff',
              border: 'none',
              borderRadius: 0,
              cursor: 'pointer',
              boxShadow: '0 0 25px red'
            }}
          >
            КРУТИТЬ РУЛЕТКУ
            <br />
            <small style={{ fontSize: 20 }}>13 из 37 секторов</small>
          </button>
        </div>
      )}

      {isSpinning && <div style={{ fontSize: 48, margin: 60 }}>Крутится…</div>}

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

      <footer style={{ marginTop: 80, fontSize: 16, opacity: 0.8 }}>
        House edge 64 % · 100 % легально через Telegram Gifts
      </footer>
    </div>
  );
}

export default App;
