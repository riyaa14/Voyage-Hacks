"use client";

import Filters from "@/components/Homepage/Filters";
import Preferences from "@/components/Homepage/Preferences";
import Quests from "@/components/Homepage/Quests";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [authToken, setAuthToken] = useState('');
  const [user, setUser] = useState('');
  const [challenges, setChallenges] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('Adventure'); // Default category
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    setAuthToken(localStorage.getItem("agentToken"));
    setUser(localStorage.getItem("activeUser"))
  }, []);

  if (user === 'Business') {
    window.location.href = '/business-profile';
  }

  const getChallenges = async () => {
    setLoading(true); // Set loading to true when starting the request

    const endpoint =
      selectedCategory === 'All'
        ? "https://voyage-hacks-backend.onrender.com/api/challenges/"
        : `https://voyage-hacks-backend.onrender.com/api/challenges/?category=${selectedCategory}`;

    if (authToken) {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
        });

        if (response.ok) {
          // Successful login
          const jsonResponse = await response.json();

          console.log(jsonResponse)

          setChallenges(jsonResponse)
        } else {
          // Handle error
          console.error('Fetching Challenge Failed');
        }
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete (success or failure)
      }
    }
  }

  useEffect(() => {
    getChallenges();
  }, [authToken, selectedCategory]);

  const handleFilterClick = (title) => {
    setSelectedCategory(title);
  };

  return (
    <main className="">
      <Navbar />
      <Preferences />
      <Filters onFilterClick={handleFilterClick} />
      <Quests data={challenges} loading={loading} authToken={authToken} />
    </main>
  )
}
