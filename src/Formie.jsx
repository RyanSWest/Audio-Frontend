   import {useState} from 'react';
   import './distribute.css';
   
   
   const initialState = {
     legalName: "",
     stageName: "",
     email: "",
     address: "",
     phone: "",
     trackTitle:  "",
     uploadLink:  "",
     paymentMethod: "crypto",
     wallet: "",
     ownership: false,
     signature: "",
   };
   

   const DistForm = ()=> {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");
     const [success, setSuccess] = useState("");
     const [loading, setLoading] = useState(false);
   
   
   return (
   
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

        <label>Upload Link / File URL *</label>
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
    


)}
export default DistForm