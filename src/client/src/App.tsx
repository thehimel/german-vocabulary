import './App.css';
import { Helmet } from 'react-helmet';

function App() {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  const imageUrl = `${baseUrl}/static/global/open-graph.jpeg`;
  const brandName: string = 'Vocabulary'
  const description: string = 'A simple and easy way to learn vocabulary.'

  return (
    <>
      <Helmet>
        <meta property="og:url" content={baseUrl}/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={brandName}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={imageUrl}/>

        <meta name="twitter:card" content={imageUrl}/>
        <meta property="twitter:domain" content={baseUrl}/>
        <meta property="twitter:url" content={currentUrl}/>
        <meta name="twitter:title" content={brandName}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={imageUrl}/>
      </Helmet>
      <div>
        <h1>Welcome</h1>
      </div>
    </>
  )
}

export default App
