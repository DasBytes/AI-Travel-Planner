import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Make sure you have Button component
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options'; // Import your options
import { toast } from 'sonner';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [locationName, setLocationName] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle location search
  const handleLocationSearch = async (e) => {
    const searchQuery = e.target.value;
    setLocationName(searchQuery);
    setSearchResults([]);

    if (searchQuery.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        if (data.length > 0) {
          setSearchResults(data);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectLocation = (location) => {
    setLocationName(location.display_name);
    setCoordinates({
      lat: location.lat,
      lng: location.lon,
    });
    setSearchResults([]);

    // Update formData with selected location
    setFormData({
      ...formData,
      location: {
        label: location.display_name, // Store the location label
        lat: location.lat,
        lng: location.lon,
      },
    });
  };

  const OnGenerateTrip = async () => {
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast('Please fill all details');
      return;
    }

    const FINAL_PROMPT = `
      Generate a detailed travel plan for the following information:
      - Location: {location}
      - Duration: {totalDays} days
      - Budget: {budget}
      - Traveler type: {traveler}

      The plan should include:
      1. A list of 3-5 hotels with the following information:
          - Hotel Name
          - Address
          - Price
          - Image URL
          - Geo Coordinates
          - Rating
          - Description

      2. A day-by-day itinerary for the trip, with each day's plan containing:
          - Place Name
          - Place Details
          - Image URL
          - Geo Coordinates
          - Ticket Pricing
          - Time to travel between places
          - Best time to visit the place
    `;

    const populatedPrompt = FINAL_PROMPT
      .replace('{location}', formData?.location?.label || locationName)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    console.log('Generated Prompt:', populatedPrompt);

    try {
      setLoading(true);

      // Make request to Google Gemini Flash API with the correct API key
      const response = await fetch('https://api.google.com/gemini/flash', { // Use the correct Gemini Flash endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VITE_GOOGLE_GEMINI_AI_API_KEY}`, // Ensure correct API key is used
        },
        body: JSON.stringify({
          prompt: populatedPrompt,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate trip plan');
      }

      const data = await response.json();
      console.log('Trip Plan:', data.result.trim());
      toast('Trip plan generated successfully!');
    } catch (error) {
      console.error('Error generating trip plan:', error);
      toast('Error generating trip plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        {/* Location Search Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <input
            type="text"
            value={locationName}
            onChange={handleLocationSearch}
            placeholder="Search for a location"
            className="border border-gray-300 rounded-md p-2 w-full  bg-white"
          />
          
          {loading && <p className="text-gray-500">Loading...</p>}

          {/* Display search results */}
          {searchResults.length > 0 && (
            <div className="border border-gray-300 rounded-md mt-2 bg-white shadow-md">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectLocation(result)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  <p>{result.display_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <input
            type="number"
            placeholder="Ex. 3"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full  bg-white"
          />
        </div>
      </div>

      <br />
      <br />

      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.budget === item.title && 'shadow-lg border-black'
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />

      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.traveler === item.people && 'shadow-lg border-black'
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
