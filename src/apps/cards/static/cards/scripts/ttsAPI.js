async function getTTSResponse(api_url, text, lang) {
  const apiEndpoint = api_url;

  // Construct the request payload
  const requestBody = {
    text: text,
    language_code: lang
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers required by your API, such as API key or authorization token
      },
      body: JSON.stringify(requestBody)
    });

    // Return the audio file directly
    return await response.blob();
  } catch (error) {
    console.error('Error:', error);
    // Handle errors as needed
    throw error;
  }
}
