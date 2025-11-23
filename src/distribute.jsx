import React, { useState } from "react";
import './distribute.css';
import WalletButton from "./WalletButton";
import{Container, Card, Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';
// const initialState = {
//   legalName: "",
//   stageName: "",
//   email: "",
//   address: "",
//   phone: "",
//   trackTitle: "",
//   uploadLink: "",
//   paymentMethod: "crypto",
//   wallet: "",
//   ownership: false,
//   signature: "",
// };

const DistributionForm=()=>{
   const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
   const location = useLocation();
  const navigate = useNavigate();
   
  const track = location.state?.track;
  const trackUrl = location.state?.trackUrl;
  const title =track.title
  const[currTrack,setCurrTrack]=useState(trackUrl)
  const [currTitle,setCurrTitle]=useState ( title)
// 
// 

  // if(track){
  //   setCurrTitle(track.title)
  //   setCurrTrack(trackUrl)
  // }
const initialState = {
  legalName: "",
  stageName: "",
  email: "",
  address: "",
  phone: "",
  trackTitle: title| "",
  uploadLink: trackUrl,
  paymentMethod: "crypto",
  wallet: "",
  ownership: false,
  signature: "",
};

 const [formData, setFormData] = useState(initialState);

 



  
  
   
  const [release,setRelease]= trackUrl;
  console.log("YO MUTHAFUCKA", track , trackUrl)

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    if (!formData.legalName.trim()) return "Legal name is required.";
    if (!formData.stageName.trim()) return "Artist / stage name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Enter a valid email.";
    if (!formData.trackTitle.trim()) return "Track title is required.";
    if (!formData.uploadLink.trim()) return "Upload link / URL is required.";
    if (!formData.signature.trim())
      return "You must type your legal name as signature.";
    if (!formData.ownership)
      return "You must certify that you own the rights to distribute this track.";
    if (formData.paymentMethod === "crypto") {
      if (!formData.wallet.trim()) return "Crypto wallet address is required.";
      if (/\s/.test(formData.wallet))
        return "Wallet address cannot contain spaces.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/distribution-agreements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to submit form.");
      }

      setSuccess(
        "Thank you! Your agreement has been submitted. You’ll receive a confirmation email shortly."
      );
      setFormData(initialState);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (

    <Container fluid className ='full-scroll-container'> 

      <Row> 

        <Col> 
          <section className='player1'> 
        <h4 
        
        // className ='playlist-text'  
        
        
        
        
        >{track.title}</h4>
        <audio controls src={trackUrl}>


           </audio>

      </section>
      <section> 

        {/* <WalletButton/> */}
      </section>

      <div className="maybeart-form-wrapper">
      
      
       
      
      <form className="maybeart-form" onSubmit={handleSubmit}>
        <h2 className="neon-heading">MAYBEART RECORDS</h2>
        <p className="neon-subtitle">
          Digital Distribution & Royalty Agreement
        </p>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <label>Legal Name *</label>
        <input
          type="text"
          name="legalName"
          value={formData.legalName}
          onChange={handleChange}
        />

        <label>Artist / Stage Name *</label>
        <input
          type="text"
          name="stageName"
          value={formData.stageName}
          onChange={handleChange}
        />

        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Track Title *</label>
        <input
          type="text"
          name="trackTitle"
          value={formData.trackTitle}
          onChange={handleChange}
        />

        <label>Upload Link {trackUrl} / File URL *</label>
        <input
          type="text"
          name="uploadLink"
          value={formData.uploadLink}
          onChange={handleChange}
        />

        <label>Royalty Payment Method *</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="bank">Bank Transfer</option>
          <option value="paypal">PayPal</option>
          <option value="crypto">Crypto Wallet</option>
        </select>

        <label>Crypto Wallet Address (if applicable)</label>
        <input
          type="text"
          name="wallet"
          value={formData.wallet}
          onChange={handleChange}
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            name="ownership"
            checked={formData.ownership}
            onChange={handleChange}
          />
          <span>
            I certify that I own or control 100% of the rights to distribute
            this Track and that it does not infringe any third-party rights.
          </span>
        </label>

        <label>Signature (type full legal name) *</label>
        <input
          type="text"
          name="signature"
          value={formData.signature}
          onChange={handleChange}
        />

        <p className="tiny-text">
          By clicking submit, you agree to the MaybeArt Records Digital
          Distribution & Royalty Agreement, including permanent distribution,
          80/20 royalty split, and 5% + 5% contribution to the MAYBEART Artist
          Grant Pool.
        </p>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Agreement"}
        </button>
      </form>
    </div>
    
        
        
        </Col>
      </Row>
     
       
      
      
    </Container>
  );
}
export default DistributionForm

 