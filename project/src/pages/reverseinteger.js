import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import './reverseinteger.css';
import LeftImage from './logoo.png';

const ReverseInteger = () => {
  const [code, setCode] = useState(`// Implement the reverse function below
function reverse(x) {
  // Your logic goes here
  return 0; // Placeholder return value
}`);
  const [output, setOutput] = useState('');
  const [executionStatus, setExecutionStatus] = useState('');
  const [status, setStatus] = useState('');

  const testCases = [
    { input: 123, expected: 321 },
    { input: -123, expected: -321 },
    { input: 120, expected: 21 },
    { input: 0, expected: 0 },
  ];

  const runCode = () => {
    setExecutionStatus('Running...');
    setStatus('');

    try {
      if (!/function\s+reverse\s*\(/.test(code)) {
        throw new Error("You must define a function named 'reverse'.");
      }

      const func = new Function('x', code + '\nreturn reverse(x);');

      const results = testCases.map(({ input, expected }) => {
        const result = func(input);
        return {
          result,
          expected,
          isCorrect: result === expected,
          input,
        };
      });

      const allCorrect = results.every((r) => r.isCorrect);

      if (allCorrect) {
        setOutput(results.map((r) => `Input: ${r.input} -> ${r.result}`).join('\n'));
        setStatus('All test cases passed!');
      } else {
        const incorrectResult = results.find((r) => !r.isCorrect);
        setOutput(
          `Failed: Input ${incorrectResult.input}, Expected ${incorrectResult.expected}, but got ${incorrectResult.result}`
        );
        setStatus('Some test cases failed.');
      }

      setExecutionStatus('Success');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setExecutionStatus('Failed');
      setStatus('Compilation Error');
    }
  };

  const clearOutput = () => {
    setOutput('');
    setExecutionStatus('');
    setStatus('');
  };

  return (
    <div className="container">
      <div className="left-pane-1">
        <div className="image-heading-container">
          <Link to="/home">
            <img src={LeftImage} alt="Top Left" className="top-left-image" />
          </Link>
          <h1>Reverse Integer</h1>
        </div>
        <div className="description">
          <p>
            Given a signed 32-bit integer <strong>x</strong>, reverse its digits.
            If reversing causes it to go out of the 32-bit range, return 0.
          </p>
        </div>

        <div className="example">
          <h4>Example 1:</h4>
          <p>Input: x = 123</p>
          <p>Output: 321</p>
        </div>
        <div className="example">
          <h4>Example 2:</h4>
          <p>Input: x = -123</p>
          <p>Output: -321</p>
        </div>
        <div className="example">
          <h4>Example 3:</h4>
          <p>Input: x = 120</p>
          <p>Output: 21</p>
        </div>

        <ul className="constraints">
          <li>
            <input type="checkbox" className="checkbox" />
            <span>-2³¹ ≤ x ≤ 2³¹ - 1</span>
          </li>
        </ul>
      </div>

      <div className="right-pane-1">
        <Editor
          height="400px"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
        <div className="button-container">
          <button className="run-button" onClick={runCode}>
            Run
          </button>
          <button className="clear-button" onClick={clearOutput}>
            Clear
          </button>
        </div>
        <div className="output-container">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
        <div className={`status-tab ${executionStatus === 'Success' ? 'success' : executionStatus === 'Failed' ? 'failure' : ''}`}>
  <p>{status || 'No Status'}</p>
</div>

      </div>
    </div>
  );
};

export default ReverseInteger;
