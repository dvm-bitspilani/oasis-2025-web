import { useEffect, useState } from "react";

const categoryAliases: Record<string, string[]> = {
  drama: ["drama", "drama & theatre", "drama and theatre"],
  music: ["music"],
  misc: ["misc", "fashion"],
};

export const useFetchEvents = (category: string) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://bits-oasis.org/2025/main/registrations/web_events/");
        const data = await res.json();

        const normalizedCategory = category.toLowerCase();
        const validCategories = categoryAliases[normalizedCategory] || [normalizedCategory];

        const matchedCats = data.data.filter((cat: any) =>
          validCategories.includes(cat.category_name.toLowerCase())
        );

        setEvents(matchedCats.flatMap((cat: any) => cat.events));
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [category]);

  return events;
};
