import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/pages/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Weather Forecast API',
        version: '1.0.0',
        description: 'API for retrieving 5-day weather forecasts for cities',
        contact: {
          name: 'API Support',
          email: 'support@example.com',
        },
      },
      components: {
        schemas: {
          Error: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'City is required',
              },
            },
          },
          WeatherForecast: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
                format: 'date',
                example: '2025-06-18',
              },
              dayOfWeek: {
                type: 'string',
                example: 'WED',
              },
              high: {
                type: 'number',
                example: 25.5,
              },
              low: {
                type: 'number',
                example: 15.8,
              },
              description: {
                type: 'string',
                example: 'scattered clouds',
              },
              nightDescription: {
                type: 'string',
                example: 'clear sky',
              },
              precipitation: {
                type: 'number',
                example: 20,
              },
              recommendations: {
                type: 'array',
                items: {
                  type: 'string',
                },
                example: ['Carry an umbrella', 'It\'s too windy, watch out!'],
              },
              rawData: {
                $ref: '#/components/schemas/ForecastItem',
              },
            },
          },
          ForecastItem: {
            type: 'object',
            properties: {
              dt: {
                type: 'number',
                example: 1561046400,
              },
              main: {
                type: 'object',
                properties: {
                  temp: { type: 'number', example: 25.5 },
                  feels_like: { type: 'number', example: 26.1 },
                  temp_min: { type: 'number', example: 24.8 },
                  temp_max: { type: 'number', example: 26.2 },
                  pressure: { type: 'number', example: 1012 },
                  sea_level: { type: 'number', example: 1012 },
                  grnd_level: { type: 'number', example: 1009 },
                  humidity: { type: 'number', example: 65 },
                  temp_kf: { type: 'number', example: 0 },
                },
              },
              weather: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 800 },
                    main: { type: 'string', example: 'Clear' },
                    description: { type: 'string', example: 'clear sky' },
                    icon: { type: 'string', example: '01d' },
                  },
                },
              },
              clouds: {
                type: 'object',
                properties: {
                  all: { type: 'number', example: 0 },
                },
              },
              wind: {
                type: 'object',
                properties: {
                  speed: { type: 'number', example: 3.5 },
                  deg: { type: 'number', example: 180 },
                  gust: { type: 'number', example: 5.2 },
                },
              },
              visibility: { type: 'number', example: 10000 },
              pop: { type: 'number', example: 0.12 },
              sys: {
                type: 'object',
                properties: {
                  pod: { type: 'string', example: 'd' },
                },
              },
              dt_txt: { type: 'string', example: '2025-06-18 12:00:00' },
            },
          },
        },
      },
    },
  });

  return spec;
};