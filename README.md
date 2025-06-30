# Weather App – Next.js

This project is a weather forecast web application built with [Next.js](https://nextjs.org). It provides a 5-day weather forecast for any city, with robust error handling and offline support.

---

## Design & Implementation Approach

- **API Layer:**
  - The `/api/weather` endpoint acts as a backend-for-frontend, fetching data from the OpenWeather API using a server-side API key.
  - If the public API is unavailable or offline mode is toggled, the endpoint returns mock data for reliability.
  - The API is documented and testable via Swagger UI at `/api-doc`.

- **Offline Support:**
  - Toggle offline mode using the `OFFLINE_MODE` environment variable or the `?offline=true` query parameter.
  - In offline mode, or if the public API fails, the service returns relevant mock weather data.

- **Swagger/OpenAPI:**
  - The API is fully documented using OpenAPI/Swagger, with a UI for testing and exploring endpoints.
  - The OpenAPI spec is generated server-side and served at `/api/docs`.

- **Error Handling:**
  - The API returns clear error messages for missing parameters, city not found, and internal errors.
  - Fallback to mock data ensures the client always receives a valid response.

- **Code Organization:**
  - Mock data is separated into `src/utils/mockWeatherData.ts` for maintainability.
  - All API logic is in `src/pages/api/weather.ts`.

---

## Sequence Diagram

You can view and edit the sequence diagram for the weather API flow using [draw.io](https://www.draw.io):

**File:** [`weather-api-sequence.drawio`](./weather-api-sequence.drawio)

To open/edit:
- Download the file or open it directly in [draw.io](https://app.diagrams.net/) (File → Open From → Device).

**Diagram Description:**
- User requests weather data via the frontend or Swagger UI.
- Next.js API route `/api/weather` receives the request.
- If offline mode is enabled or the public API fails, mock data is returned.
- Otherwise, the API fetches real data from OpenWeather, processes it, and returns the result.

---

## Design Patterns Used

- **Proxy Pattern:**
  - The API route acts as a proxy between the frontend and the external OpenWeather API, adding error handling, caching, and offline support.
- **Strategy Pattern:**
  - The service dynamically chooses between real API data and mock data based on runtime conditions (offline mode or API failure).
- **Separation of Concerns:**
  - Mock data, API logic, and configuration are separated into different files/modules for maintainability.

---

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- API documentation: [http://localhost:3000/api-doc](http://localhost:3000/api-doc)
- Weather API endpoint: [http://localhost:3000/api/weather?city=London](http://localhost:3000/api/weather?city=London)

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.