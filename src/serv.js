 
// // import mongoose from "mongoose";

// // const DistributionAgreementSchema = new mongoose.Schema(
// //   {
// //     legalName: { type: String, required: true },
// //     stageName: { type: String, required: true },
// //     email: { type: String, required: true },
// //     address: String,
// //     phone: String,
// //     trackTitle: { type: String, required: true },
// //     uploadLink: { type: String, required: true },
// //     paymentMethod: {
// //       type: String,
// //       enum: ["bank", "paypal", "crypto"],
// //       required: true,
// //     },
// //     wallet: String,
// //     ownership: { type: Boolean, required: true },
// //     signature: { type: String, required: true },
// //     ipAddress: String,
// //     userAgent: String,
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model(
// //   "DistributionAgreement",
// //   DistributionAgreementSchema
// // );
// // 3.2 Route – routes/distributionAgreements.js
// import express from "express";
// import DistributionAgreement from "./DistributionAgreement.js";
// import nodemailer from "nodemailer";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const {
//       legalName,
//       stageName,
//       email,
//       address,
//       phone,
//       trackTitle,
//       uploadLink,
//       paymentMethod,
//       wallet,
//       ownership,
//       signature,
//     } = req.body;

//     if (!legalName || !stageName || !email || !trackTitle || !uploadLink || !signature) {
//       return res
//         .status(400)
//         .json({ message: "Missing required fields. Please complete the form." });
//     }

//     if (!ownership) {
//       return res.status(400).json({
//         message:
//           "You must certify that you own the rights to distribute this track.",
//       });
//     }

//     if (paymentMethod === "crypto" && (!wallet || /\s/.test(wallet))) {
//       return res.status(400).json({
//         message: "Valid crypto wallet address is required for crypto payment.",
//       });
//     }

//     const doc = await DistributionAgreement.create({
//       legalName,
//       stageName,
//       email,
//       address,
//       phone,
//       trackTitle,
//       uploadLink,
//       paymentMethod,
//       wallet,
//       ownership,
//       signature,
//       ipAddress: req.ip,
//       userAgent: req.get("User-Agent"),
//     });

//     if (process.env.SMTP_HOST) {
//       const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: Number(process.env.SMTP_PORT || 587),
//         secure: false,
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       });

//       const from = process.env.MAYBEART_NOTIFICATIONS_EMAIL;

//       const artistMail = {
//         from,
//         to: email,
//         subject: "MaybeArt Records – Distribution Agreement Received",
//         text: `Hi ${legalName},

// Thank you for submitting your track "${trackTitle}" to MaybeArt Records for distribution.

// Key terms:
// - Distribution: permanent for the life of the recording
// - Split: 80% Artist / 20% MaybeArt Records
// - 5% from each party goes into the MAYBEART Artist Grant Pool

// We will review your submission and begin distribution soon.

// Love,
// MaybeArt Records`,
//       };

//       const internalMail = {
//         from,
//         to: from,
//         subject: `New Distribution Agreement – ${stageName} – ${trackTitle}`,
//         text: `New agreement submitted:

// Artist: ${legalName} (${stageName})
// Email: ${email}
// Track: ${trackTitle}
// Upload: ${uploadLink}
// Payment Method: ${paymentMethod}
// Wallet: ${wallet || "N/A"}
// Signature: ${signature}

// MongoDB ID: ${doc._id}
// `,
//       };

//       await Promise.all([
//         transporter.sendMail(artistMail),
//         transporter.sendMail(internalMail),
//       ]);
//     }

//     return res.status(201).json({ message: "Agreement submitted successfully." });
//   } catch (err) {
//     console.error("Error creating distribution agreement:", err);
//     return res.status(500).json({ message: "Server error." });
//   }
// });

// export default router;