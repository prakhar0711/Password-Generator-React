import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css"; // Import Tailwind CSS
function App() {
  const [password, setPassword] = useState(null);
  const [length, setLength] = useState(6);
  const [isCharAllowed, setCharAllowed] = useState(false);
  const [isNumAllowed, setNumAllowed] = useState(false);
  const copy = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isCharAllowed) {
      str += "!@#$%^&*()_+-=|][{};':,.<>/?";
    }
    if (isNumAllowed) {
      str += "1234567890";
    }

    for (let index = 0; index < length; index++) {
      const element = Math.floor(Math.random() * str.length + 1);
      const char = str.charAt(element);
      pass += char;
    }
    setPassword(pass);
  }, [length, isCharAllowed, isNumAllowed]);

  useEffect(() => {
    if (password === null) {
      setPassword(""); // Ensure that password is not null initially
    }
  }, [password]);
  const handleGeneratePassword = () => {
    generatePassword(); // Call the generatePassword function when the button is clicked
  };
  const copytoclipboard = useCallback(() => {
    copy.current?.select();
    copy.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
    confirm("Password copied to clipboard");
  }, [length, password]);
  return (
    <>
      <div className="container mx-auto mt-10">
        {" "}
        {/* Tailwind CSS container and margin top */}
        <div className="my-box max-w-lg mx-auto bg-slate-400 rounded-lg  p-8">
          <h1 className="text-2xl font-bold my-2 mb-4">Password Generator</h1>{" "}
          {/* Tailwind CSS max width, margin auto, background, rounded corners, shadow, and padding */}
          <div className="passwordbox">
            <div className="flex flex-wrap password-field mb-4">
              {" "}
              {/* Margin bottom */}
              <input
                name="password"
                value={password || ""}
                type="text"
                placeholder="password"
                readOnly
                ref={copy}
                className="w-full border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                className="button-86 mr-2"
                onClick={handleGeneratePassword}
              >
                {" "}
                {/* Margin right */}
                Generate New
              </button>
              <button className="button-86 mx-4" onClick={copytoclipboard}>
                Copy
              </button>
            </div>
            <div className="options">
              <label className="block mb-4">
                {" "}
                {/* Block and margin bottom */}
                Length : {length}
                <input
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                  value={length}
                  type="range"
                  min={6}
                  max={20}
                  className="w-full"
                />
              </label>
              <label className="block mb-4">
                Include Special Characters
                <div className="checkbox-wrapper-2">
                  <input
                    onChange={() => {
                      setCharAllowed(!isCharAllowed);
                    }}
                    type="checkbox"
                    value={isCharAllowed}
                    className="mr-2 sc-gJwTLC ikxBAC"
                  />
                </div>
              </label>
              <label className="block mb-4">
                Include Numbers
                <div className="checkbox-wrapper-2">
                  <input
                    onChange={() => {
                      setNumAllowed(!isNumAllowed);
                    }}
                    type="checkbox"
                    value={isNumAllowed}
                    className="mr-2 sc-gJwTLC ikxBAC"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
