import React from 'react';
import {Helmet} from 'react-helmet';

interface MetadataProps {
  baseUrl?: string;
  currentUrl?: string;
  imageUrl?: string;
  brandName?: string;
  description?: string;
}

const Metadata: React.FC<MetadataProps> = ({
  baseUrl = window.location.origin,
  currentUrl = window.location.href,
  imageUrl = `${window.location.origin}/static/global/open-graph.jpeg`,
  brandName = 'Vocabulary',
  description = 'A simple and easy way to learn vocabulary.',
}) => {
  return (
    <Helmet>
      {description && <meta name="description" content="A simple and easy way to learn German vocabulary."/>}

      {baseUrl && <meta property="og:url" content={baseUrl}/>}
      <meta property="og:type" content="website"/>
      {brandName && <meta property="og:title" content={brandName}/>}
      {description && <meta property="og:description" content={description}/>}
      {imageUrl && <meta property="og:image" content={imageUrl}/>}

      {imageUrl && <meta name="twitter:card" content={imageUrl}/>}
      {baseUrl && <meta property="twitter:domain" content={baseUrl}/>}
      {currentUrl && <meta property="twitter:url" content={currentUrl}/>}
      {brandName && <meta name="twitter:title" content={brandName}/>}
      {description && <meta name="twitter:description" content={description}/>}
      {imageUrl && <meta name="twitter:image" content={imageUrl}/>}
    </Helmet>
  );
};

export default Metadata;
