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
  registrantName?: string;
  registrantEmail?: string;
  event?: string;
  fitnessLevel?: string;
  heardFrom?: string;
  emergencyName?: string;
  notes?: string;
}

export default function RegistrationNotification({
  registrantName = 'John Doe',
  registrantEmail = 'john@example.com',
  event = 'Summer Cooldown',
  fitnessLevel = 'Intermediate',
  heardFrom = 'Instagram',
  emergencyName = 'Jane Doe',
  notes = 'None',
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>New Event Registration — {registrantName}</Preview>

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
                NEW EVENT<br />
                <span style={{ color: s.LIME }}>REGISTRATION</span>
              </Heading>
              <Text style={s.heroText}>
                {registrantName} just registered for an upcoming event.
              </Text>
              <Button href={`mailto:${registrantEmail}`} style={s.limeButton}>
                REPLY TO REGISTRANT
              </Button>
            </div>
          </Section>

          {/* Details */}
          <Section style={s.detailsWrapper}>
            <Heading style={s.sectionTitle}>REGISTRATION DETAILS</Heading>
            <InfoRow label="NAME" value={registrantName} />
            <InfoRow label="EMAIL" value={registrantEmail} />
            <InfoRow label="EVENT" value={event} />
            <InfoRow label="FITNESS LEVEL" value={fitnessLevel} />
            <InfoRow label="HEARD FROM" value={heardFrom} />
            <InfoRow label="EMERGENCY CONTACT" value={emergencyName} />
            <InfoRow label="NOTES" value={notes} />
          </Section>

          {/* CTA */}
          <Section style={s.ctaSection}>
            <Text style={s.ctaSmall}>NEW REGISTRATION</Text>
            <Heading style={s.ctaTitle}>
              ANOTHER ONE<br />LOCKED IN.
            </Heading>
            <Text style={s.ctaText}>The community keeps growing.</Text>
            <Button href={`mailto:${registrantEmail}`} style={s.darkButton}>
              CONTACT REGISTRANT
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
            <Link href="https://bodybybradfitness.com" style={s.footerLink}>
              bodybybradfitness.com
            </Link>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
