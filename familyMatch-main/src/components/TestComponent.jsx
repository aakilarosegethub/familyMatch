import React from 'react'

function TestComponent({ sendToParent }) {

    const handleChange =()=> {
            const  a = "this is a strong";
       sendToParent(a);
         }

  return (
    <div>
          <button onClick={handleChange}>Send to Parent</button>
    </div>
  )
}

export default TestComponent