import './App.css';
import { Helmet } from 'react-helmet';

function App() {
  const baseUrl = window.location.origin;
  const imageUrl = `${baseUrl}/static/global/open-graph.jpeg`;

  return (
    <>
      <Helmet>
        <meta property="og:title" content="Your page title"/>
        <meta property="og:description" content="Your page description"/>
        <meta property="og:image" content={imageUrl}/>
      </Helmet>
      <div>
        <h1>Welcome</h1>
      </div>
    </>
  )
}

export default App
