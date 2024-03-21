import React, { useState } from 'react';
import './App.css';
import AppLayout from './Applayout';

interface IMyContext{
  userId:string
}

export const MyContext = React.createContext<IMyContext>({userId:""});



function App() {

  const [userData,setUserData] = useState<IMyContext>({userId:'bf0bb5b2-cbfa-43a5-b0fb-d219b0841f50'});
  
  return (
    <MyContext.Provider value={userData}>
    <div className="checklist-app">
      <AppLayout/>
    </div>
    </MyContext.Provider>
  );
}

export default App;
