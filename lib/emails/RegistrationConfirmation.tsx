import {
  Body, Container, Head, Heading, Hr, Html, Img,
  Link, Preview, Section, Text, Button,
} from '@react-email/components';
import * as s from './styles';

interface Props {
  firstName?: string;
  event?: string;
  siteUrl?: string;
}

export default function RegistrationConfirmation({
  firstName = 'there',
  event = 'Summer Cooldown',
  siteUrl = 'https://bodybybrad.com',
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;re registered — {event}</Preview>

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
                YOU&apos;RE<br />
                <span style={{ color: s.LIME }}>REGISTERED!</span>
              </Heading>
              <Text style={s.heroText}>
                Your spot has been secured.
              </Text>
            </div>
          </Section>

          {/* Content */}
          <Section style={s.detailsWrapper}>
            <Heading style={{ ...s.sectionTitle, fontSize: '24px' }}>
              You&apos;re in, {firstName}! 🎉
            </Heading>
            <Text style={{ color: '#B8BEC7', fontSize: '15px', lineHeight: '26px', marginBottom: '24px' }}>
              Your registration for <strong style={{ color: '#fff' }}>{event}</strong> has been confirmed.
            </Text>

            {/* What to bring card */}
            <Section style={{
              backgroundColor: '#171A20',
              border: '1px solid #242833',
              borderLeft: `4px solid ${s.LIME}`,
              borderRadius: '12px',
              padding: '20px 24px',
              marginBottom: '24px',
            }}>
              <Text style={{ ...s.infoLabel, marginBottom: '14px' }}>WHAT TO BRING</Text>
              <Text style={{ color: '#B8BEC7', fontSize: '14px', lineHeight: '28px', margin: 0 }}>
                ✅ Water bottle{'\n'}
                ✅ Athletic shoes{'\n'}
                ✅ Comfortable workout gear{'\n'}
                ✅ Sunscreen &amp; hat{'\n'}
                ✅ Positive energy!
              </Text>
            </Section>

            <Text style={{ color: '#666', fontSize: '13px', lineHeight: '22px', marginBottom: '28px' }}>
              We&apos;ll send you a reminder as the event date gets closer. See you there!
            </Text>
            <Button href={`${siteUrl}/events`} style={s.limeButton}>
              VIEW EVENTS
            </Button>
          </Section>

          {/* CTA */}
          <Section style={s.ctaSection}>
            <Text style={s.ctaSmall}>GET READY</Text>
            <Heading style={s.ctaTitle}>
              LET&apos;S<br />DO THIS.
            </Heading>
            <Text style={s.ctaText}>Charleston&apos;s premier outdoor fitness awaits.</Text>
            <Button href={`${siteUrl}/events`} style={s.darkButton}>
              EXPLORE MORE
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
            <Link href={siteUrl} style={s.footerLink}>
              bodybybrad.com
            </Link>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
