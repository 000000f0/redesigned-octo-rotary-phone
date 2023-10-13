import React, { useState } from 'react';

function ChatComponent() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const postData = async () => {
    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: 'Eva',
          prompt: 'is land a good investment in communist territories?',
          userId: 'user_2VgCI4SWPiAgpPIBgCwGBFIRo1P',
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setResponse(data);
        } else {
          const text = await response.text();
          setResponse(text);
        }
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={postData}>Send POST Request</button>
      <div>
        {error && <p>{error}</p>}
        {response && (
          <pre>{response}</pre>
        )}
      </div>
    </div>
  );
}

export default ChatComponent;
