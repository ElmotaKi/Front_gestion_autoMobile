import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dataclient, setDataclient] = useState(null);
  const [dataagent, setDataagent] = useState(null);
  const [dataprking, setDataprking] = useState(null);
  const [datavoi, setDdatavoi] = useState(null);
  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await axios.get(url);
        setter(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData('http://127.0.0.1:8000/api/nbrclient', setDataclient);
    fetchData('http://127.0.0.1:8000/api/nbragent', setDataagent);
    fetchData('http://127.0.0.1:8000/api/nbrparking', setDataprking);
    fetchData('http://127.0.0.1:8000/api/nbrvoi', setDdatavoi);
  }, []);

  return (
    
    <div className="container mx-auto mt-12  width " >
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg font-semibold mb-3">Chiffre d'affaires</p>
          <p className="text-3xl">100000DH</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg font-semibold mb-3">Clients</p>
          <p className="text-3xl">{dataclient}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg font-semibold mb-3">Agents</p>
          <p className="text-3xl">{dataagent}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg font-semibold mb-3">Parking</p>
          <p className="text-3xl">{dataprking}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg font-semibold mb-3">Voitures</p>
          <p className="text-3xl">0</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg font-semibold mb-3">Voitures Louees</p>
          <p className="text-3xl">0</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg font-semibold mb-3">Voitures Libres</p>
          <p className="text-3xl">000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg font-semibold mb-3">Voiture en panne</p>
          <p className="text-3xl">000</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;