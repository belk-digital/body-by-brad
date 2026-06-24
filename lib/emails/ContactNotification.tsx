import {
  Body, Container, Head, Heading, Hr, Html, Img,
  Link, Preview, Section, Text, Button,
} from '@react-email/components';
import * as s from './styles';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Section style={s.infoRowOuter}>
      <Text style={s.infoLabel}>{label}</Text>
      <Text style={s.infoValue}>{value}</Text>
    </Section>
  );
}

interface Props {
  name?: string;
  email?: string;
  plan?: string;
  location?: string;
  preferredDate?: string;
}

export default function ContactNotification({
  name = 'Dev Test',
  email = 'test@example.com',
  plan = 'Online Coaching',
  location = 'Charleston',
  preferredDate = 'Not specified',
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Submission — BBB Fitness</Preview>

      <Body style={s.body}>
        <Container style={s.mainContainer}>

          {/* Header */}
          <Section style={s.headerStyle}>
            <Img src={s.LOGO_URL} alt="Body By Brad" width="120" style={{ margin: '0 auto', display: 'block' }} />
          </Section>

          {/* Hero */}
          <Section style={s.heroSection}>
            <Img
              src={s.CTA_IMG}
              alt="BBB Fitness"
              width="600"
              style={{ width: '100%', display: 'block' }}
            />
            <div style={s.heroOverlay}>
              <Img src={s.LOGO_URL} alt="Body By Brad" width="100" style={{ marginBottom: '16px' }} />
              <Heading style={s.heroTitle}>
                NEW CONTACT<br />
                <span style={{ color: s.LIME }}>SUBMISSION</span>
              </Heading>
              <Text style={s.heroText}>
                Someone just reached out through the website and is interested in your services.
              </Text>
              <Button href={`mailto:${email}`} style={s.limeButton}>
                REPLY TO LEAD
              </Button>
            </div>
          </Section>

          {/* Details */}
          <Section style={s.detailsWrapper}>
            <Heading style={s.sectionTitle}>LEAD DETAILS</Heading>
            <InfoRow label="NAME" value={name} />
            <InfoRow label="EMAIL" value={email} />
            <InfoRow label="PLAN" value={plan} />
            <InfoRow label="LOCATION" value={location} />
            <InfoRow label="PREFERRED DATE" value={preferredDate} />
          </Section>

          {/* CTA */}
          <Section style={s.ctaSection}>
            <Text style={s.ctaSmall}>NEW LEAD RECEIVED</Text>
            <Heading style={s.ctaTitle}>
              READY TO<br />CONNECT?
            </Heading>
            <Text style={s.ctaText}>A new prospect is waiting for your response.</Text>
            <Button href={`mailto:${email}`} style={s.darkButton}>
              CONTACT NOW
            </Button>
          </Section>

          {/* Footer */}
          <Section style={s.footerSection}>
            <Heading style={s.footerHeading}>
              STRONGER<br />
              <span style={{ color: s.LIME }}>EVERYDAY.</span>
            </Heading>
            <Hr style={s.divider} />
            <Text style={s.footerText}>
              BBB FITNESS<br />Charleston, SC
            </Text>
            <Link href="https://bodybybrad.com" style={s.footerLink}>
              bodybybrad.com
            </Link>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
