import dynamic from 'next/dynamic';
import Head from 'next/head';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDoc() {
  return (
    <div>
      <Head>
        <title>Weather API Documentation</title>
        <meta name="description" content="Weather Forecast API Documentation" />
      </Head>
      <SwaggerUI url="/api/docs" />
    </div>
  );
}