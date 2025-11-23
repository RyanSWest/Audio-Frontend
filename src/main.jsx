import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import { UserAuthProvider } from './util/UserContextProvider'
import App from './App.jsx';
import UploadTabs from './UploadTabs.jsx'
import Dash from './Dash.jsx';
import DistributionForm from './distribute.jsx';
 import Register from './Register.jsx';
 import Login from './Login.jsx';
 import Uploadurl from './Uploadurl.jsx'
 import Home from './Home.jsx';
 import DistForm from './Formie.jsx';
//  import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
// import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
//  import QuickNav from './Nav.jsx'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* <UserAuthProvider >   */}
      {/* <AudioProvider>   */}
    {/* <QuickNav /> */}
      <Router>  
         <Routes>
           <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/upload" element={<App />} />
          <Route path ='/fart' element={<Uploadurl/>}/>
          <Route path="/login" element={<Login />} />
                    <Route path="/distribute" element={<DistributionForm />} />
                                        <Route path="/distribution" element={<DistForm />} />


         </Routes>
      </Router>
{/* </AudioProvider> */}
   {/* </UserAuthProvider> */}
   </StrictMode>,
)
