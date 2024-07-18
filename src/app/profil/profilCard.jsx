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
// boxShadow: '5px 10px 5px rgba(0, 0, 0, 0.2)
    fetchAgentData();
  }, []);

  return (
   
    <div className='flex' style={{position:'absolute',top:'5rem',left:'15rem',height:'32rem'}}>
      
              <section className="userProfile card bg-gray-500" style={{width:'25rem'}}>
                    <div className="profile flex-col justify-items-center mt-10" >
                      <figure  style={{position:'relative',left:'5rem'}} > 
                        <img className='rounded-full' src="https://png.pngtree.com/png-vector/20220809/ourmid/pngtree-round-button-with-flat-design-in-dark-gray-and-white-for-users-vector-png-image_19437050.jpg" alt="profile" width="150px" height="100px" backgroundColor='#ffff'/>
                    </figure>
                    <div className='  space-y-7 ml-12 mt-6'>
                    <div className='flex space-x-6 font-serif text-white mt-19 ml-4'>
                      <h2>{agent.NomAgent}</h2>
                      <h2>{agent.PrenomAgent}</h2>
                    </div>
                    </div>
                  <h2 className='font-serif text-white mt-6'>Super Admin</h2>
                  </div>
            </section>
            <div className='bg-white font-serif' style={{width:'40rem'}}>
                <h1 className='text-gray-500 mt-7 mb-5 mr-80  text-xl italic'  style={{}}>Informations:</h1>
                <hr />

              <div className='flex mt-20'>
                    <div className='flex-col space-x-10' >
                    <label className='text-gray-500' style={{position:'relative',left:'0.5rem'}}>Sexe:</label>
                    
                    <input type='text' className='mr-30 ' style={{width:'8rem'}} value={agent.SexeAgent} /> 
                    </div>
                    <div className='flex-col space-x-10' >
                    <label className='text-gray-500'>Adresse:</label>
                    <input type='text' value={agent.AdresseAgent}  style={{width:'20rem'}}/> 
                    </div>
                </div>

                <div className='flex mt-6'>
                <div className='flex-col space-x-10' >
                    <label className='text-gray-500' style={{position:'relative',left:'-2rem'}}>Ville:</label>
                    <input type='text' className='mr-15' value={agent.VilleAgent}  /> 
                    </div>
                    <div className='flex-col space-x-10' >
                    <label className='text-gray-500' style={{position:'relative',left:'-1.5rem'}}>Code Postal:</label>
                    <input type='text' value={agent.CodePostalAgent}  /> 
                    </div>
                </div>
                
                <div className='flex mt-6'>
                    <div className='flex-col space-x-10' >
                      <label className='text-gray-500'>Telephone:</label>
                      <input type='text' value={agent.TelAgent}  /> 
                      </div>
                      <div className='flex-col space-x-10' >
                      <label className='text-gray-500'>E-mail:</label>
                      <input type='text' value={agent.EmailAgent}  style={{width:'20rem'}} /> 
                      </div>
                </div>
                  
              </div>
    </div>
   
  );
};


export default AdminProfile;
