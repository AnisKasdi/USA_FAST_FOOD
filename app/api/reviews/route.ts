// Google Places API — server-side only (API key never exposed to client)
// Required env var: GOOGLE_PLACES_API_KEY
// Place: Charcoal Chicken Halal Mediterranean Restaurant, 15 W 29th St, New York, NY 10001

const PLACE_QUERY = "Charcoal chicken halal Mediterranean restaurant 15 W 29th St New York NY 10001";

type PlacesReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
};

type PlaceDetails = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: PlacesReview[];
    name?: string;
  };
  status: string;
  candidates?: Array<{ place_id: string }>;
};

async function findPlaceId(apiKey: string): Promise<string | null> {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(PLACE_QUERY)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data: PlaceDetails = await res.json();
  return data.candidates?.[0]?.place_id ?? null;
}

async function fetchPlaceDetails(placeId: string, apiKey: string) {
  const fields = "rating,user_ratings_total,reviews,name";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data: PlaceDetails = await res.json();
  return data.result ?? null;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "GOOGLE_PLACES_API_KEY not configured" }, { status: 500 });
  }

  try {
    const placeId = await findPlaceId(apiKey);
    if (!placeId) {
      return Response.json({ error: "Place not found" }, { status: 404 });
    }

    const details = await fetchPlaceDetails(placeId, apiKey);
    if (!details) {
      return Response.json({ error: "Could not fetch place details" }, { status: 500 });
    }

    return Response.json({
      name: details.name,
      rating: details.rating,
      total: details.user_ratings_total,
      reviews: (details.reviews ?? []).map((r) => ({
        author: r.author_name,
        rating: r.rating,
        text: r.text,
        when: r.relative_time_description,
        avatar: r.profile_photo_url,
      })),
    });
  } catch {
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
