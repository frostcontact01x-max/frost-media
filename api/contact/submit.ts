import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

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
  status: string;
  emailsSent: {
    inquiryNotification: boolean;
    inquiryConfirmation: boolean;
  };
}

const LEADS_FILE_PATH = path.join(process.cwd(), "leads.json");

// Safe loader from filesystem
async function loadLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err: any) {
    return [];
  }
}

// Safe saver to filesystem (handles read-only environment gracefully)
async function saveLeads(leads: Lead[]): Promise<boolean> {
  try {
    await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (err: any) {
    console.warn("Local storage write failed (expected on read-only environments like Vercel):", err.message);
    return false;
  }
}

// Transporter lazy evaluator
function getMailerTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "SMTP credentials not configured. Please define SMTP_USER and SMTP_PASS in environment variables."
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  try {
    const { name, email, business, phone, budget, details } = req.body as LeadForm;

    // Rigid validation
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, Email, and Phone Number are required fields." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

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
      status: "pending_onboarding",
      emailsSent: {
        inquiryNotification: false,
        inquiryConfirmation: false,
      },
    };

    let mailerError = null;

    try {
      const transporter = getMailerTransporter();
      const adminEmail = "frostcontact01x@gmail.com";

      // Admin Email Details
      const detailsHtml = `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 24px; border-radius: 8px;">
          <h2 style="color: #0d9488; border-bottom: 1px solid #eee; padding-bottom: 12px; margin-top: 0;">🔥 New Content Partner Lead</h2>
          <p>A new potential partner has requested a consultation from the Frost Media landing page.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 18px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #555;">Name:</td>
              <td style="padding: 8px 0; color: #111;">${newLead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${newLead.email}">${newLead.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 8px 0; color: #111;">${newLead.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Company/Channel:</td>
              <td style="padding: 8px 0; color: #111;">${newLead.business || "None / Individual"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Monthly Budget:</td>
              <td style="padding: 8px 0; color: #7dd3fc; font-weight: bold;">${newLead.budget}</td>
            </tr>
          </table>
          <p style="font-weight: bold; color: #555; margin-bottom: 6px;">Content Goals & Targets:</p>
          <blockquote style="background: #f8fafc; border-left: 4px solid #7dd3fc; padding: 12px 16px; margin: 0 0 20px 0; font-style: italic; color: #334155; border-radius: 0 4px 4px 0;">
            ${(newLead.details || "No custom goals provided.").replace(/\n/g, "<br/>")}
          </blockquote>
          <p style="font-size: 11px; color: #ef4444; border-top: 1px dashed #eee; padding-top: 12px; margin-bottom: 0;">
            * Action Required: Reach out or schedule onboarding conversation with client.
          </p>
        </div>
      `;

      // Dispatch Email 1 to Admin
      await transporter.sendMail({
        from: `"Frost Media Lead Bot" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `🔥 New Lead Inquiry: ${newLead.name}`,
        html: detailsHtml,
      });
      newLead.emailsSent.inquiryNotification = true;

      // Dispatch Email 2 to Visitor (Confirmation)
      const visitorHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #f0f0f0; border-radius: 8px;">
          <h2 style="color: #000; border-bottom: 2px solid #7dd3fc; padding-bottom: 12px; margin-top: 0; font-weight: 800; letter-spacing: -0.025em; text-transform: uppercase;">Frost Media Agency</h2>
          <p>Hi <strong>${newLead.name}</strong>,</p>
          <p>Thank you for taking the time to share your content vision and goals with us. We have successfully received your partner inquiry.</p>
          <p>Our team is currently reviewing your profile. We normally respond with proposed action frameworks inside 24 hours.</p>
          <div style="background: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 6px; padding: 16px; margin: 20px 0; text-align: center;">
            <p style="margin: 0 font-weight: bold; color: #115e59; font-size: 14px;">⚡ Need to accelerate onboarding?</p>
            <p style="margin: 6px 0 0px 0; font-size: 12px; color: #14b8a6;">
              <a href="https://wa.me/message/ME4KGS4IC52VN1" style="color: #0f766e; font-weight: bold; text-decoration: underline;" target="_blank" rel="noreferrer">Tap here to align directly with our leadership team on WhatsApp</a>.
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #f0f0f0; margin: 24px 0;" />
          <p style="font-size: 11px; color: #888; margin-bottom: 0;">
            This confirmation receipt was dispatched to ${newLead.email}. If you did not request this, please ignore.
          </p>
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
      console.error("Nodemailer dispatch failed:", err.message);
      mailerError = err.message;
    }

    // Try storing the lead inside leads.json, capturing read-only exceptions safely
    const leads = await loadLeads();
    leads.push(newLead);
    await saveLeads(leads);

    // Analyze outcome
    if (mailerError && !process.env.SMTP_USER) {
      return res.status(500).json({
        error: `Inquiry received but SMTP mail dispatch could not proceed because SMTP_USER / SMTP_PASS credentials are not configured in Vercel settings.`,
        leadId,
      });
    } else if (mailerError) {
      return res.status(500).json({
        error: `Inquiry received but email dispatch failed: ${mailerError}. Please try again later.`,
        leadId,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead submitted successfully and notifications dispatched.",
      leadId,
    });

  } catch (err: any) {
    console.error("Critical error in submission handler:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}
