const BASE_URL = "https://nga-states-lga.onrender.com";

export async function fetchStates(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/fetch`);
    if (!response.ok) throw new Error("Failed to fetch states");
    return await response.json();
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
}

export async function fetchLGAs(state: string): Promise<string[]> {
  if (!state) return [];
  try {
    const response = await fetch(`${BASE_URL}/?state=${encodeURIComponent(state)}`);
    if (!response.ok) throw new Error(`Failed to fetch LGAs for ${state}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching LGAs for ${state}:`, error);
    return [];
  }
}

export async function geocodeLocation(state: string, lga?: string): Promise<{ lat: number, lon: number } | null> {
  const query = lga ? `${lga}, ${state}, Nigeria` : `${state}, Nigeria`;
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
