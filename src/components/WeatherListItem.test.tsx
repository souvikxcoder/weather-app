import { render, screen, fireEvent } from "@testing-library/react";
import WeatherListItem from "./WeatherListItem";

const mockData = {
  date: "2025-04-20",
  dayOfWeek: "SUN",
  high: 30,
  low: 20,
  description: "Sunny",
  nightDescription: "Clear",
  precipitation: 10,
  recommendations: ["Wear sunglasses"],
  rawData: {
    main: {
      feels_like: 29,
      temp_min: 18,
      temp_max: 31,
      pressure: 1013,
      sea_level: 1015,
      humidity: 60,
    },
    wind: {
      speed: 5,
      deg: 150,
      gust: 8,
    },
    clouds: { all: 20 },
    pop: 0.1,
    visibility: 10000,
  },
};

describe("WeatherListItem", () => {
  it("renders weather info", () => {
    render(<WeatherListItem {...mockData} />);
    expect(screen.getByText("SUN")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
    expect(screen.getByText("💧")).toBeInTheDocument();
    expect(screen.getByText("Wear sunglasses")).toBeInTheDocument();
  });

  it("toggles detailed view on expand click", () => {
    render(<WeatherListItem {...mockData} />);
    const toggle = screen.getByText("▼");
    fireEvent.click(toggle);
    expect(screen.getByText("Temperatures")).toBeInTheDocument();
  });
});
