import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import './addtwonumbers.css';
import LeftImage from './logoo.png';

// Linked List Node definition
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper function to convert an array to a linked list
const arrayToLinkedList = (arr) => {
  let dummyHead = new ListNode();
  let current = dummyHead;
  arr.forEach(val => {
    current.next = new ListNode(val);
    current = current.next;
  });
  return dummyHead.next;
};

// Helper function to convert a linked list to an array
const linkedListToArray = (node) => {
  let result = [];
  while (node) {
    result.push(node.val);
    node = node.next;
  }
  return result;
};

const AddTwoNumbers = () => {
  const [code, setCode] = useState(`function addTwoNumbers(l1, l2) {
    // Your implementation here
}`);
  const [output, setOutput] = useState('');
  const [executionStatus, setExecutionStatus] = useState('');

  // Test cases
  const testCases = [
    { input1: [2, 4, 3], input2: [5, 6, 4], expected: [7, 0, 8] },
    { input1: [0], input2: [0], expected: [0] },
    { input1: [9, 9, 9, 9, 9, 9, 9], input2: [9, 9, 9, 9], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
  ];

  const runCode = () => {
    setExecutionStatus('Running...');
    try {
      if (!/function\s+addTwoNumbers\s*\(/.test(code)) {
        throw new Error("You must define a function named 'addTwoNumbers'.");
      }
  
      // Inject ListNode into the function's scope
      const func = new Function(
        'ListNode', // Pass ListNode as an argument
        'arrayToLinkedList',
        'linkedListToArray',
        'l1',
        'l2',
        code + '\nreturn addTwoNumbers(l1, l2);'
      );
  
      const results = testCases.map(({ input1, input2, expected }) => {
        const l1 = arrayToLinkedList(input1);
        const l2 = arrayToLinkedList(input2);
        const resultLinkedList = func(ListNode, arrayToLinkedList, linkedListToArray, l1, l2);
        const result = linkedListToArray(resultLinkedList);
  
        return {
          result,
          expected,
          isCorrect: JSON.stringify(result) === JSON.stringify(expected),
          input1,
          input2
        };
      });
  
      const allCorrect = results.every((r) => r.isCorrect);
  
      if (allCorrect) {
        setOutput(results.map(r => JSON.stringify(r.result)).join(', '));
        setExecutionStatus('Success');
      } else {
        const incorrectResult = results.find(r => !r.isCorrect);
        setOutput(`Failed: Expected ${JSON.stringify(incorrectResult.expected)}, but got ${JSON.stringify(incorrectResult.result)}`);
        setExecutionStatus('Failed');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setExecutionStatus('Failed');
    }
  };
  

  const clearOutput = () => {
    setOutput('');
    setExecutionStatus('');
  };

  return (
    <div className="container">
      <div className="left-pane-2">
        <div className="image-heading-container">
          <Link to="/home">
            <img src={LeftImage} alt="Top Left" className="top-left-image" />
          </Link>
          <h1>Add Two Numbers</h1>
        </div>
        <div className="description">
          <p>
            Given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, 
            and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
          </p>
        </div>
        <div className="example">
          <h4>Example 1:</h4>
          <p>Input: l1 = [2,4,3], l2 = [5,6,4]</p>
          <p>Output: [7,0,8]</p>
        </div>
        <div className="example">
          <h4>Example 2:</h4>
          <p>Input: l1 = [0], l2 = [0]</p>
          <p>Output: [0]</p>
        </div>
      </div>

      <div className="right-pane-2">
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
          <button className="run-button" onClick={runCode}>Run</button>
          <button className="clear-button" onClick={clearOutput}>Clear</button>
        </div>
        <div className="output-container">
          <h4>Output:</h4>
          <pre className="output">{output}</pre>
        </div>
        <div className={`status-tab ${executionStatus === 'Success' ? 'success' : 'failure'}`}>
          <p>Execution Status: {executionStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default AddTwoNumbers;

