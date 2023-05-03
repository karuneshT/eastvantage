import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserPage() {
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = () => {
    setIsLoading(true);
    async function fetchNow(){
        try{
            const response = await axios('https://randomuser.me/api');
            const data = response.data;
            const {email, name:{first,last}} = data.results[0]
            localStorage.setItem("user",JSON.stringify({
                firstName:first,
                lastName:last,
                email
            }))
            setIsLoading(false);
        }catch(err){
            console.log(err)
        }
    }
    fetchNow();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleRefreshClick = () => {
    fetchUser();
  };
  
  const user = JSON.parse(localStorage.getItem("user"));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleRefreshClick}>Refresh</button>
    </div>
  );
}

export default UserPage;
