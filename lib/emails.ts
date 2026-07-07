import 'server-only';
import { render } from '@react-email/render';
import ContactNotification from './emails/ContactNotification';
import ContactConfirmation from './emails/ContactConfirmation';
import RegistrationNotification from './emails/RegistrationNotification';
import RegistrationConfirmation from './emails/RegistrationConfirmation';

const SITE_URL_DEFAULT = 'https://bodybybradfitness.com';

export async function contactNotificationEmail(data: {
  firstName: string;
  lastName?: string;
  email: string;
  plan?: string;
  location?: string;
  date?: string;
}) {
  const name = `${data.firstName} ${data.lastName ?? ''}`.trim();
  const html = await render(
    ContactNotification({
      name,
      email: data.email,
      plan: data.plan || 'Not specified',
      location: data.location || 'Not specified',
      preferredDate: data.date || 'Not specified',
    })
  );
  return { subject: `New Contact: ${name}`, html };
}

export async function contactConfirmationEmail(data: {
  firstName: string;
  siteUrl: string;
}) {
  const html = await render(
    ContactConfirmation({
      firstName: data.firstName,
      siteUrl: data.siteUrl,
    })
  );
  return { subject: 'We got your message — Body By Brad', html };
}

export async function registrationNotificationEmail(data: {
  registrantName: string;
  registrantEmail: string;
  event: string;
  fitnessLevel?: string;
  heardFrom?: string;
  emergencyName?: string;
  notes?: string;
}) {
  const html = await render(
    RegistrationNotification({
      registrantName: data.registrantName,
      registrantEmail: data.registrantEmail,
      event: data.event,
      fitnessLevel: data.fitnessLevel || 'Not specified',
      heardFrom: data.heardFrom || 'Not specified',
      emergencyName: data.emergencyName || 'Not provided',
      notes: data.notes || 'None',
    })
  );
  return { subject: `New Registration: ${data.registrantName} — ${data.event}`, html };
}

export async function registrationConfirmationEmail(data: {
  firstName: string;
  event: string;
  siteUrl: string;
}) {
  const html = await render(
    RegistrationConfirmation({
      firstName: data.firstName,
      event: data.event,
      siteUrl: data.siteUrl,
    })
  );
  return { subject: `You're registered — ${data.event}`, html };
}
