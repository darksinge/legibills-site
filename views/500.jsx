import React from 'react';

var data = typeof data !== 'undefined' ? <code>{data}</code> : <p>A team of highly trained *cough* college students are working on the problem, or taking a nap.<br/> If the problem persists, please go cry about it until something is done to fix the issue.</p>

var error = (
<div class="container">
  <h1>Internal Server Error</h1>
  <h2>I have a terrible feeling something bad happened...</h2>
  <div>data</div>
</div>
)

class InternalErrorPage extends React.Component {
  render() {
    return error; 
  }
}

export default InternalErrorPage;