import {
  Body, Container, Head, Heading, Hr, Html, Img,
  Link, Preview, Section, Text, Button,
} from '@react-email/components';
import * as s from './styles';

interface Props {
  firstName?: string;
  siteUrl?: string;
}

export default function ContactConfirmation({
  firstName = 'there',
  siteUrl = 'https://bodybybrad.com',
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>We got your message — Body By Brad</Preview>

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
                MESSAGE<br />
                <span style={{ color: s.LIME }}>RECEIVED!</span>
              </Heading>
              <Text style={s.heroText}>
                We&apos;ll get back to you shortly.
              </Text>
            </div>
          </Section>

          {/* Content */}
          <Section style={s.detailsWrapper}>
            <Heading style={{ ...s.sectionTitle, fontSize: '24px' }}>
              Hey {firstName}! 👋
            </Heading>
            <Text style={{ color: '#B8BEC7', fontSize: '15px', lineHeight: '26px', marginBottom: '16px' }}>
              Thanks for reaching out. We&apos;ve received your message and Brad will get back to you within <strong style={{ color: '#fff' }}>24 hours</strong>.
            </Text>
            <Text style={{ color: '#B8BEC7', fontSize: '15px', lineHeight: '26px', marginBottom: '28px' }}>
              In the meantime, feel free to check out our services and upcoming events.
            </Text>
            <Button href={`${siteUrl}/services`} style={s.limeButton}>
              VIEW SERVICES
            </Button>
          </Section>

          {/* CTA */}
          <Section style={s.ctaSection}>
            <Text style={s.ctaSmall}>WHILE YOU WAIT</Text>
            <Heading style={s.ctaTitle}>
              CHECK OUT<br />OUR EVENTS
            </Heading>
            <Text style={s.ctaText}>Join Charleston&apos;s premier outdoor fitness community.</Text>
            <Button href={`${siteUrl}/events`} style={s.darkButton}>
              VIEW EVENTS
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
