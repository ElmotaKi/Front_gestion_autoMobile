import React, { useEffect, useState } from 'react';
import axios from 'axios';

const userDetailsStyle = {
  backgroundColor: '#fff',
  marginTop: '60px',
  position:'relative',
  padding: '70px',
  borderRadius: '10px',
  boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '10px',
  
};

const contactInfoStyle = {
  listStyleType: 'none',
  padding: '0',
};

const contactInfoItemStyle = {
  marginBottom: '10px',
};
const AdminProfile = () => {
  const [agent, setAgent] = useState({
    NomAgent: '',
    PrenomAgent: '',
    SexeAgent: '',
    EmailAgent: '',
    TelAgent: '',
    AdresseAgent: '',
    VilleAgent: '',
    CodePostalAgent: ''
  });

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/agents/1'); // Remplacez par l'URL de votre API
        setAgent(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchAgentData();
  }, []);

  return (
   
    <div>
      <div  style={{position:'absolute', top:'5rem', left:'15rem',padding:'30px', background:'white', width:'950px', height:'700px', borderRadius:'10px', boxShadow: '5px 10px 5px rgba(0, 0, 0, 0.2)'}} className='space-y-6 font-sans'>
       <section className="userProfile card">
         <div className="profile">
          <figure>
       <img src="https://png.pngtree.com/png-vector/20220809/ourmid/pngtree-round-button-with-flat-design-in-dark-gray-and-white-for-users-vector-png-image_19437050.jpg" alt="profile" width="150px" height="100px" backgroundColor='#ffff'/>
       </figure>
       </div>
    </section>
    <div className='flex space-x-10'>
      <label className='font-bold'>Nom:</label>
      <input type='text' value={agent.NomAgent} /> 
      </div>
      <div className='flex space-x-10 ' >
      <label className='font-bold'>Prénom:</label>
      <input type='text' value={agent.PrenomAgent} /> 
      </div>
      <div className='flex space-x-10' >
      <label className='font-bold'>Sexe:</label>
      <input type='text' value={agent.SexeAgent} /> 
      </div>
      <div className='flex space-x-10' >
      <label className='font-bold'>Adresse:</label>
      <input type='text' value={agent.AdresseAgent}  style={{width:'20rem'}}/> 
      </div>
      <div className='flex space-x-10' >
      <label className='font-bold'>Ville:</label>
      <input type='text' value={agent.VilleAgent}  /> 
      </div>
      <div className='flex space-x-10' >
      <label className='font-bold'>Code Postal:</label>
      <input type='text' value={agent.CodePostalAgent}  /> 
      </div>
      <div className='flex space-x-10' >
      <label className='font-bold'>Telephone:</label>
      <input type='text' value={agent.TelAgent}  /> 
      </div>
      <div className='flex space-x-10' >
      <label className='font-bold'>E-mail:</label>
      <input type='text' value={agent.EmailAgent}  style={{width:'20rem'}} /> 
      </div>
    </div>
    </div>
    
  );
};


export default AdminProfile;
