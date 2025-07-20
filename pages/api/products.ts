import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const response = await axios.get(
      "https://apidojo-booking-v1.p.rapidapi.com/properties/list-by-map",
      {
        params: {
          room_qty: 1,
          guest_qty: 1,
          bbox: "14.291283,14.948423,120.755688,121.136864",
          search_id: "none",
          children_age: "11,5",
          price_filter_currencycode: "USD",
          categories_filter: "class::1,class::2,class::3",
          languagecode: "en-us",
          travel_purpose: "leisure",
          children_qty: 2,
          order_by: "popularity",
          offset: 0,
          arrival_date: formatDate(today), // <-- always today
          departure_date: formatDate(tomorrow), // <-- always tomorrow
        },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
          "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
