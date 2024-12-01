import { GoogleGenerativeAI } from "@google/generative-ai";



const apiKey = process.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: " Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\nfor AI travel planner\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "I cannot directly access and display real-time information, including hotel prices, availability, images, and geo-coordinates.  Hotel prices are incredibly dynamic and change constantly.  Also, obtaining and displaying image URLs requires access to image hosting services, which I do not have.\n\nHowever, I can provide you with a JSON template structured to hold the information you requested. You will need to use this template and populate it with data you find from your own research using online travel agencies (like Booking.com, Expedia, Kayak, etc.) and search engines (like Google).\n\n\n```json\n{\n  \"tripName\": \"Las Vegas Budget Trip for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": 2,\n  \"duration\": 3,\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"hotelAddress\": \"Hotel Address 1\",\n      \"price\": \"$$$ (Replace with actual price range)\",\n      \"hotelImageUrl\": \"URL to hotel image (Replace with actual URL)\",\n      \"geoCoordinates\": {\n        \"latitude\": 00.0000, \n        \"longitude\": 00.0000\n      },\n      \"rating\": 4.0,\n      \"description\": \"Hotel description (Replace with actual description)\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"Hotel Address 2\",\n      \"price\": \"$$$ (Replace with actual price range)\",\n      \"hotelImageUrl\": \"URL to hotel image (Replace with actual URL)\",\n      \"geoCoordinates\": {\n        \"latitude\": 00.0000, \n        \"longitude\": 00.0000\n      },\n      \"rating\": 4.5,\n      \"description\": \"Hotel description (Replace with actual description)\"\n    },\n     {\n      \"hotelName\": \"Hotel Name 3\",\n      \"hotelAddress\": \"Hotel Address 3\",\n      \"price\": \"$$$ (Replace with actual price range)\",\n      \"hotelImageUrl\": \"URL to hotel image (Replace with actual URL)\",\n      \"geoCoordinates\": {\n        \"latitude\": 00.0000, \n        \"longitude\": 00.0000\n      },\n      \"rating\": 3.5,\n      \"description\": \"Hotel description (Replace with actual description)\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free outdoor pedestrian mall with light shows.\",\n        \"placeImageUrl\": \"URL to image (Replace with actual URL)\",\n        \"geoCoordinates\": {\n          \"latitude\": 00.0000,\n          \"longitude\": 00.0000\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.2,\n        \"timeToSpend\": \"2-3 hours\",\n        \"bestTimeToVisit\": \"Evening (for the light shows)\"\n      },\n      {\n        \"placeName\": \"Downtown Container Park\",\n        \"placeDetails\": \"Shopping, dining, and entertainment area made from shipping containers.\",\n        \"placeImageUrl\": \"URL to image (Replace with actual URL)\",\n        \"geoCoordinates\": {\n          \"latitude\": 00.0000,\n          \"longitude\": 00.0000\n        },\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 4.0,\n        \"timeToSpend\": \"1-2 hours\",\n        \"bestTimeToVisit\": \"Afternoon or early evening\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"The Strip (walking tour)\",\n        \"placeDetails\": \"Walk along the Las Vegas Strip and see the iconic hotels and casinos.\",\n        \"placeImageUrl\": \"URL to image (Replace with actual URL)\",\n        \"geoCoordinates\": {\n          \"latitude\": 00.0000,\n          \"longitude\": 00.0000\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"timeToSpend\": \"3-4 hours\",\n        \"bestTimeToVisit\": \"Late afternoon/evening for lights\"\n      },\n       {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Free water show with music and lights.\",\n        \"placeImageUrl\": \"URL to image (Replace with actual URL)\",\n        \"geoCoordinates\": {\n          \"latitude\": 00.0000,\n          \"longitude\": 00.0000\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.8,\n        \"timeToSpend\": \"30-60 minutes\",\n        \"bestTimeToVisit\": \"Evenings\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Outdoor art installation south of Las Vegas (requires transportation).\",\n        \"placeImageUrl\": \"URL to image (Replace with actual URL)\",\n        \"geoCoordinates\": {\n          \"latitude\": 00.0000,\n          \"longitude\": 00.0000\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.3,\n        \"timeToSpend\": \"1-2 hours\",\n        \"bestTimeToVisit\": \"Afternoon\"\n      }\n    ]\n  }\n}\n```\n\nRemember to replace the placeholder values with the actual information you find.  Consider using public transportation or ride-sharing services to save money on transportation within Las Vegas.  Free activities and exploring the Strip on foot are great ways to keep the trip budget-friendly.\n"},
        ],
      },

    ],
  });

