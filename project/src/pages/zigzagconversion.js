import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import './zigzagconversion.css';
import LeftImage from './logoo.png';

const ZigzagConversion = () => {
  const [code, setCode] = useState(`function convert(s, numRows){}`);
  const [output, setOutput] = useState('');
  const [executionStatus, setExecutionStatus] = useState('');
  const [status, setStatus] = useState('');

  const testCases = [
    { input: 'PAYPALISHIRING', numRows: 3, expected: 'PAHNAPLSIIGYIR' },
    { input: 'PAYPALISHIRING', numRows: 4, expected: 'PINALSIGYAHRPI' },
    { input: 'A', numRows: 1, expected: 'A' },
  ];

  const runCode = () => {
    setExecutionStatus('Running...');
    setStatus('');

    try {
      if (!/function\s+convert\s*\(/.test(code)) {
        throw new Error("You must define a function named 'convert'.");
      }

      const func = new Function('s', 'numRows', code + '\nreturn convert(s, numRows);');

      const results = testCases.map(({ input, numRows, expected }) => {
        const result = func(input, numRows);
        return {
          result,
          expected,
          isCorrect: result === expected,
          input,
          numRows,
        };
      });

      const allCorrect = results.every((r) => r.isCorrect);

      if (allCorrect) {
        setOutput(results.map((r) => `Input: "${r.input}", Rows: ${r.numRows} -> "${r.result}"`).join('\n'));
        setStatus('All test cases passed!');
      } else {
        const incorrectResult = results.find((r) => !r.isCorrect);
        setOutput(
          `Failed: Input "${incorrectResult.input}", Rows: ${incorrectResult.numRows}, Expected "${incorrectResult.expected}", but got "${incorrectResult.result}"`
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
          <h1>Zigzag Conversion</h1>
        </div>
        <div className="description">
          <p>
            The string is written in a zigzag pattern on a given number of rows and then read line by line.
          </p>
        </div>

        <div className="example">
          <h4>Example 1:</h4>
          <p>Input: s = "PAYPALISHIRING", numRows = 3</p>
          <p>Output: "PAHNAPLSIIGYIR"</p>
        </div>
        <div className="example">
          <h4>Example 2:</h4>
          <p>Input: s = "PAYPALISHIRING", numRows = 4</p>
          <p>Output: "PINALSIGYAHRPI"</p>
        </div>
        <div className="example">
          <h4>Example 3:</h4>
          <p>Input: s = "A", numRows = 1</p>
          <p>Output: "A"</p>
        </div>

        <ul className="constraints">
          <li>
            <input type="checkbox" className="checkbox" />
            <span>1 ≤ s.length ≤ 1000</span>
          </li>
          <li>
            <input type="checkbox" className="checkbox" />
            <span>s consists of English letters, ',' and '.'</span>
          </li>
          <li>
            <input type="checkbox" className="checkbox" />
            <span>1 ≤ numRows ≤ 1000</span>
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
          <pre className="output">{output}</pre>
        </div>
        <div
          className={`status-tab ${executionStatus === 'Success' ? 'success' : 'failure'}`}
        >
          <p>Execution Status: {executionStatus}</p>
          {status && <p>Result Status: {status}</p>}
        </div>
      </div>
    </div>
  );
};

export default ZigzagConversion;
