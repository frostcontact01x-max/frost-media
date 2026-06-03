/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

interface LeadForm {
  name: string;
  email: string;
  business?: string;
  phone?: string;
  budget?: string;
  details?: string;
}

interface Lead extends LeadForm {
  id: string;
  submittedAt: string;
  selectedSlot?: string | null;
  scheduledAt?: string;
  status: "pending_schedule" | "scheduled";
  emailsSent: {
    inquiryNotification: boolean;
    inquiryConfirmation: boolean;
    bookingNotification: boolean;
    bookingConfirmation: boolean;
  };
}

const LEADS_FILE_PATH = path.join(process.cwd(), "leads.json");

// Helper to load leads from JSON database file safely
async function loadLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return [];
    }
    console.error("Error reading leads file, returning empty array:", err);
    return [];
  }
}

// Helper to save leads to JSON database file safely
async function saveLeads(leads: Lead[]): Promise<void> {
  await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");
}

// Mailer client setup with lazy evaluation to prevent crash on startup if credentials are missing
function getMailerTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "SMTP configuration is missing. Please set the SMTP_USER and SMTP_PASS environment variables in your Settings."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route - Submit Inquiry (Step 1)
  app.post("/api/contact/submit", async (req, res) => {
    try {
      const { name, email, business, phone, budget, details } = req.body as LeadForm;

      // Basic validation
      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Name, Email, and Phone Number are required fields." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
      }

      // Generate a unique ID
      const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const newLead: Lead = {
        id: leadId,
        name,
        email,
        business: business || "",
        phone: phone || "",
        budget: budget || "To be discussed during call",
        details: details || "",
        submittedAt: new Date().toISOString(),
        status: "pending_schedule",
        emailsSent: {
          inquiryNotification: false,
          inquiryConfirmation: false,
          bookingNotification: false,
          bookingConfirmation: false,
        },
      };

      // Email delivery attempt (Lazy initialized inside route handler)
      let mailerError = null;
      try {
        const transporter = getMailerTransporter();
        const adminEmail = "frostcontact01x@gmail.com";

        // Bullet list details
        const detailsHtml = `
          <h3>Frost Media - New Lead Inquiry Details</h3>
          <p><strong>Name:</strong> ${newLead.name}</p>
          <p><strong>Email:</strong> ${newLead.email}</p>
          <p><strong>Phone:</strong> ${newLead.phone || "Not Provided"}</p>
          <p><strong>Company/Channel:</strong> ${newLead.business || "None/Individual"}</p>
          <p><strong>Budget Range:</strong> ${newLead.budget}</p>
          <p><strong>Project Details & Goals:</strong></p>
          <blockquote style="background: #f4f4f4; border-left: 5px solid #7dd3fc; padding: 10px; margin: 10px 0;">
            ${(newLead.details || "No details provided.").replace(/\n/g, "<br/>")}
          </blockquote>
          <p><em>This lead has been saved. The visitor is currently on the booking selector stage to lock in a time slot.</em></p>
        `;

        // Send Email 1: Notification to Admin
        await transporter.sendMail({
          from: `"Frost Media Lead Bot" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject: `🔥 New Lead Inquiry: ${newLead.name}`,
          html: detailsHtml,
        });
        newLead.emailsSent.inquiryNotification = true;

        // Send Email 2: Confirmation to Visitor
        const visitorHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
            <h2 style="color: #050505; border-bottom: 2px solid #7dd3fc; padding-bottom: 10px;">Inquiry Received — Frost Media Agency</h2>
            <p>Hi <strong>${newLead.name}</strong>,</p>
            <p>Thank you for submitting your inquiry. We have successfully received your project details and goals.</p>
            <p>Our team is reviewing your profile and we'll get back to you within 24 hours. To make our first sync highly productive, please ensure you complete the discovery call booking selector step on our website to immediately claim your preferred 20-minute discussion slot.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Submitted details summary:</strong></p>
            <ul>
              <li><strong>Company/Channel:</strong> ${newLead.business || "N/A"}</li>
              <li><strong>Stated Budget:</strong> ${newLead.budget}</li>
            </ul>
            <p>Looking forward to connecting soon!</p>
            <p>Best regards,<br/><strong>Frost Media Team</strong></p>
          </div>
        `;

        await transporter.sendMail({
          from: `"Frost Media Agency" <${process.env.SMTP_USER}>`,
          to: newLead.email,
          subject: `We've received your request - Frost Media`,
          html: visitorHtml,
        });
        newLead.emailsSent.inquiryConfirmation = true;

      } catch (err: any) {
        console.warn("Mail dispatch failed, registering incident but continuing lead filing:", err.message);
        mailerError = err.message;
      }

      // Add to database
      const leads = await loadLeads();
      leads.push(newLead);
      await saveLeads(leads);

      // Respond back
      if (mailerError && !process.env.SMTP_USER) {
        // Return a special error response so client can retry or know about the missing configuration
        return res.status(500).json({
          error: `Email delivery failed. Setup error: ${mailerError}. We have recorded your info, but to send verified confirmation emails please configure your SMTP keys.`,
          leadId,
        });
      } else if (mailerError) {
        // Standard mailer connection/auth failure
        return res.status(500).json({
          error: `Email dispatch failed: ${mailerError}. Please try again.`,
          leadId,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Inquiry saved successfully and confirmation emails dispatched.",
        leadId,
      });

    } catch (err: any) {
      console.error("API error during step 1 submit:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  });

  // API Route - Book Discovery Slot (Step 2)
  app.post("/api/contact/book", async (req, res) => {
    try {
      const { leadId, selectedSlot } = req.body;

      if (!leadId || !selectedSlot) {
        return res.status(400).json({ error: "leadId and selectedSlot are required fields." });
      }

      const leads = await loadLeads();
      const leadIndex = leads.findIndex((l) => l.id === leadId);

      if (leadIndex === -1) {
        return res.status(404).json({ error: "Lead record not found." });
      }

      const lead = leads[leadIndex];
      lead.selectedSlot = selectedSlot;
      lead.status = "scheduled";
      lead.scheduledAt = new Date().toISOString();

      // Trigger Booking Confirmation Emails
      let mailerError = null;
      try {
        const transporter = getMailerTransporter();
        const adminEmail = "frostcontact01x@gmail.com";

        const bookingDetailsHtml = `
          <h3>📅 Frost Media - Direct Call Scheduled</h3>
          <p>Client <strong>${lead.name}</strong> (${lead.email}) has booked a discovery slot!</p>
          <div style="background: #111; color: #7dd3fc; border: 1px solid #7dd3fc; padding: 15px; border-radius: 8px; font-weight: bold; margin: 15px 0; text-align: center;">
            SELECTED SLOT: ${selectedSlot}
          </div>
          <p><strong>Associated Lead Profile:</strong></p>
          <ul>
            <li><strong>Company/Channel:</strong> ${lead.business || "None/Individual"}</li>
            <li><strong>Phone:</strong> ${lead.phone || "Not Provided"}</li>
            <li><strong>Budget Range:</strong> ${lead.budget}</li>
          </ul>
        `;

        // Send Email 3: Booking Alert to Admin
        await transporter.sendMail({
          from: `"Frost Media Scheduler" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject: `📅 Call Booked: ${lead.name} - ${selectedSlot}`,
          html: bookingDetailsHtml,
        });
        lead.emailsSent.bookingNotification = true;

        // Send Email 4: Booking Confirmation to Visitor
        const visitorBookingHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
            <h2 style="color: #050505; border-bottom: 2px solid #7dd3fc; padding-bottom: 10px;">📅 Discovery Call Confirmed — Frost Media</h2>
            <p>Hi <strong>${lead.name}</strong>,</p>
            <p>Your casual 20-minute direct discovery call is locked and scheduled for: </p>
            <div style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 15px; border-radius: 6px; font-weight: bold; font-size: 16px; margin: 15px 0; text-align: center;">
              ${selectedSlot}
            </div>
            <p>Our representative will reach out to you at <strong>${lead.email}</strong> ${lead.phone ? `or via phone at <strong>${lead.phone}</strong>` : ""} directly at your chosen time coordinate. Please ensure your calendar is cleared for this session.</p>
            <p>We look forward to talking through your content roadmap soon!</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><em>Frost Media Agency Team</em></p>
          </div>
        `;

        await transporter.sendMail({
          from: `"Frost Media Agency" <${process.env.SMTP_USER}>`,
          to: lead.email,
          subject: `📅 Confirmed: Discovery Call on ${selectedSlot}`,
          html: visitorBookingHtml,
        });
        lead.emailsSent.bookingConfirmation = true;

      } catch (err: any) {
        console.warn("Booking mail dispatch failed:", err.message);
        mailerError = err.message;
      }

      // Save updated lead
      await saveLeads(leads);

      if (mailerError && !process.env.SMTP_USER) {
        return res.status(500).json({
          error: `Booking saved, but notification emails could not be sent because SMTP configuration is missing.`,
          lead,
        });
      } else if (mailerError) {
        return res.status(500).json({
          error: `Booking saved, but confirmation email dispatch failed: ${mailerError}`,
          lead,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Booking confirmed and calendar invitation dispatched.",
        lead,
      });

    } catch (err: any) {
      console.error("API error during step 2 cataloging:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  });

  // Serve static assets / handle SPA routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational at http://0.0.0.0:${PORT}`);
  });
}

startServer();
