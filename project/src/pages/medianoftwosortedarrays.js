import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import './median.css';
import LeftImage from './logoo.png';

const Median = () => {
  const [code, setCode] = useState(`function findMedianSortedArrays(nums1, nums2) {
  // Your implementation here
}`);
  const [output, setOutput] = useState('');
  const [executionStatus, setExecutionStatus] = useState('');
  const [status, setStatus] = useState('');

  const testCases = [
    { nums1: [1, 3], nums2: [2], expected: 2.0 },
    { nums1: [1, 2], nums2: [3, 4], expected: 2.5 },
  ];

  const runCode = () => {
    setExecutionStatus('Running...');
    setStatus('');

    try {
      if (!/function\s+findMedianSortedArrays\s*\(/.test(code)) {
        throw new Error("You must define a function named 'findMedianSortedArrays'.");
      }

      const func = new Function(
        'nums1',
        'nums2',
        code + '\nreturn findMedianSortedArrays(nums1, nums2);'
      );

      const results = testCases.map(({ nums1, nums2, expected }) => {
        const result = func(nums1, nums2);
        return {
          result,
          expected,
          isCorrect: result === expected,
          nums1,
          nums2,
        };
      });

      const allCorrect = results.every((r) => r.isCorrect);
      if (allCorrect) {
        setOutput(results.map((r) => `Result: ${r.result}`).join('\n'));
        setStatus('All test cases passed!');
      } else {
        const firstFail = results.find((r) => !r.isCorrect);
        setOutput(
          `Failed: For nums1 = ${firstFail.nums1}, nums2 = ${firstFail.nums2}, expected ${firstFail.expected} but got ${firstFail.result}`
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
          <h1>Median of Two Sorted Arrays</h1>
        </div>
        <div className="description">
          <p>
            Given two sorted arrays <strong>nums1</strong> and <strong>nums2</strong>, return the median of the two sorted arrays.
          </p>
          <p>The overall runtime complexity should be O(log(m + n)).</p>
        </div>
        <div className="example">
          <h4>Example 1:</h4>
          <p>Input: nums1 = [1,3], nums2 = [2]</p>
          <p>Output: 2.0</p>
        </div>
        <div className="example">
          <h4>Example 2:</h4>
          <p>Input: nums1 = [1,2], nums2 = [3,4]</p>
          <p>Output: 2.5</p>
        </div>
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

export default Median;
