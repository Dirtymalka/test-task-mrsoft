import React, { useState, useEffect } from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import './app.css'

function App() {
  const [dataStrings, setDataStrings] = useState([]);
  const [filterStrings, setFilterStrings] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isCaseRegister, setIsCaseRegister] = useState(true);
  const [error, setError] = useState(true);

  const getStrings = async () => {
    const url = `https://www.mrsoft.by/data.json`;
    const response = await fetch(url);

    if (response.ok) {
      const result = await response.json();
      setDataStrings(result.data);
      return;
    }
    setError(true);
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleCheckBox = () => {
    setIsCaseRegister((prev) => !prev);
  }

  const filterOnLength = () => {
    if (isNaN(inputValue)) {
      return;
    }
    const newDataStrings = [...dataStrings];
    const filterDataStrings = newDataStrings.filter((string) => string.length > inputValue)
    setFilterStrings(filterDataStrings);
  }

  const filterOnSubstring = () => {
    const newDataStrings = [...dataStrings];
    if (isCaseRegister) {
      const filterDataStrings = newDataStrings.filter((string) => string.includes(inputValue));
      setFilterStrings(filterDataStrings);
      return;
    }
    const filterDataStrings = newDataStrings.filter((string) => string.toLowerCase().includes(inputValue.toLowerCase()));
    setFilterStrings(filterDataStrings);
  }

  useEffect(() => {
    getStrings();
  }, []);

  useEffect(() => {
    filterOnSubstring();
  }, [isCaseRegister]);

  useEffect(() => {
    setFilterStrings(dataStrings)
  }, [dataStrings])

  if (!dataStrings.length) {
    return <Spinner />
  }

  if (error) {
    return <ErrorIndicator />
  }

  return (
    <div className="container my-container">
      <input className="form-control" type="text" onChange={handleInputChange} />
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={isCaseRegister} onChange={handleCheckBox} />
        <label className="form-check-label" htmlFor="exampleCheck1">Apply register?</label>
      </div>
      <button className="btn btn-primary button" onClick={filterOnLength}>Show strings with length more {!isNaN(inputValue) ? inputValue : null}</button>
      <button className="btn btn-primary button" onClick={filterOnSubstring}>Show strings with substring '{isNaN(inputValue) ? inputValue : null}'</button>
      <ul className="list-group list-group-flush list-strings">
        {filterStrings.map((string, idx) => <li className="list-group-item" key={idx}>{string}</li>)}
      </ul>
    </div>
  );
}

export default App;
