import { useEffect, useState } from "react";

const api = process.env.converter;

function MoneyConverter() {
  const currencies = ['USD', 'AUD', 'SGD', 'PHP', 'EUR'];

  const [base, setBase] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertTo, setConvertTo] = useState('EUR');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (amount === isNaN) {
      return;
    }
    if (base === convertTo) {
      setResult(amount);
    } else {
      fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${api}&${base}=base&symbols=${convertTo}`)
      .then(res => res.json())
      .then(data => {
        setResult((data.rates[convertTo] * amount).toFixed(2));
      });
    }
  }, [base, amount, convertTo])

  return (
    <div>
      <div>
        <input type="number" value={amount} onChange={e => {setAmount(e.target.value)}} />
        <select name="base" value={base} onChange={e => {setBase(e.target.value)}}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
      <input disabled={true} value={amount === "" ? "0" : result === null ? "..." : result} />
      <select name="convertTo" value={convertTo} onChange={e => {setConvertTo(e.target.value)}}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
}

export default MoneyConverter;