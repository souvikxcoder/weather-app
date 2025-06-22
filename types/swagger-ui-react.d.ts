declare module 'swagger-ui-react' {
  import * as React from 'react';
  export interface SwaggerUIProps {
    url?: string;
    spec?: object;
    docExpansion?: 'none' | 'list' | 'full';
    defaultModelsExpandDepth?: number;
    defaultModelExpandDepth?: number;
  }
  const SwaggerUI: React.FC<SwaggerUIProps>;
  export default SwaggerUI;
}
