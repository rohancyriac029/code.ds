import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import './lps.css';
import LeftImage from './logoo.png';

const LongestPalindromicSubstring = () => {
  const [code, setCode] = useState(`function longestPalindrome(s) {}`);
  const [output, setOutput] = useState('');
  const [executionStatus, setExecutionStatus] = useState('');
  const [status, setStatus] = useState('');

  const testCases = [
    { input: 'babad', expected: ['bab', 'aba'] },
    { input: 'cbbd', expected: ['bb'] },
    { input: 'a', expected: ['a'] },
    { input: 'ac', expected: ['a', 'c'] },
  ];

  const runCode = () => {
    setExecutionStatus('Running...');
    setStatus('');

    try {
      if (!/function\s+longestPalindrome\s*\(/.test(code)) {
        throw new Error("You must define a function named 'longestPalindrome'.");
      }

      const func = new Function('s', code + '\nreturn longestPalindrome(s);');

      const results = testCases.map(({ input, expected }) => {
        const result = func(input);
        return {
          result,
          expected,
          isCorrect: expected.includes(result),
          input,
        };
      });

      const allCorrect = results.every((r) => r.isCorrect);

      if (allCorrect) {
        setOutput(results.map(r => `Input: "${r.input}" -> "${r.result}"`).join('\n'));
        setStatus('All test cases passed!');
      } else {
        const incorrectResult = results.find(r => !r.isCorrect);
        setOutput(`Failed: Input "${incorrectResult.input}", Expected one of ${JSON.stringify(incorrectResult.expected)}, but got "${incorrectResult.result}"`);
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
          <h1>Longest Palindromic Substring</h1>
        </div>
        <div className="description">
          <p>
            Given a string <strong>s</strong>, return the longest palindromic substring in <strong>s</strong>.
          </p>
        </div>

        <div className="example">
          <h4>Example 1:</h4>
          <p>Input: s = "babad"</p>
          <p>Output: "bab" or "aba"</p>
        </div>
        <div className="example">
          <h4>Example 2:</h4>
          <p>Input: s = "cbbd"</p>
          <p>Output: "bb"</p>
        </div>

        <ul class="constraints">
  <li>
    <input type="checkbox" class="styled-checkbox" id="constraint-1" />
    <label for="constraint-1">1 ≤ s.length ≤ 1000</label>
  </li>
  <li>
    <input type="checkbox" class="styled-checkbox" id="constraint-2" />
    <label for="constraint-2">s consists of only digits and English letters.</label>
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

export default LongestPalindromicSubstring;
