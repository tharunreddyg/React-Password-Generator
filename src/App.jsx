import { useCallback, useEffect, useState } from "react";
import React from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [splChars, setSplChars] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) {
      characters += "0123456789";
    }

    if (splChars) {
      characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, numbers, splChars]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div className="app">
      <div className="password-card">
        <h1>Password Generator</h1>
        <p className="subtitle">
          Create a strong and secure password
        </p>

        <div className="password-box">
          <input
            type="text"
            value={password}
            readOnly
            aria-label="Generated password"
          />

          <button
            className="copy-btn"
            onClick={copyPassword}
            disabled={!password}
          >
            Copy
          </button>
        </div>

        <div className="settings">
          <div className="setting">
            <div className="setting-header">
              <label htmlFor="length">Password Length</label>
              <span className="length-value">{length}</span>
            </div>

            <input
              id="length"
              type="range"
              min="8"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="options">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
              <span>Include Numbers</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={splChars}
                onChange={(e) => setSplChars(e.target.checked)}
              />
              <span>Special Characters</span>
            </label>
          </div>
        </div>

        <button className="generate-btn" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;

