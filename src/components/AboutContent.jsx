import React from "react";
import styled from "@emotion/styled";

// --- Constants ---
const desktopBreakpoint = 768;

// --- Styled Components ---

// 1. Main Container Wrapper
const StyledContentWrapper = styled.div`
  /* DESKTOP DEFAULTS */
  padding: 40px 50px;
  box-shadow: 0px 4px 25px 0px rgba(61, 150, 224, 0.4);
  margin: 0;
  height: auto;
  width: 95%; /* Desktop width */
  margin: 0 auto; /* Center the 98% width container */

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    padding: 30px 20px; /* Reduced padding on mobile */
    width: 90%; /* Take full width on mobile */
    box-shadow: none; /* Optionally remove heavy shadow on small screens */
  }

  /* Very Small Mobile Optimization */
  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

// 2. Section Heading Style
const Heading = styled.h2`
  /* DESKTOP DEFAULTS */
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 100%;
  color: white;
  margin-bottom: 20px;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 28px;
    margin-bottom: 15px;
  }
`;

// 3. Paragraph Text Style
const Text = styled.p`
  /* DESKTOP DEFAULTS */
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 150%;
  color: #ccc;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 16px;
    line-height: 160%;
  }

  /* Smaller font for very small screens */
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

// 4. Individual Content Section
const ContentSection = styled.div`
  /* DESKTOP DEFAULTS */
  margin-bottom: 40px;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    margin-bottom: 30px;
  }

  &:last-child {
    margin-bottom: 0; /* Remove bottom margin from the last section */
  }
`;

// --- Component Start ---

export default function AboutContent() {
  return (
    <StyledContentWrapper>
      {/* About Us */}
      <ContentSection>
        <Heading>About Us</Heading>
        <Text>
          Welcome to Aspro IT, a premier provider of cutting-edge software
          development and training services on a global scale. We are your
          gateway to high-quality, accessible education in emerging
          technologies, committed to excellence without compromise.
        </Text>
      </ContentSection>

      {/* Mission */}
      <ContentSection>
        <Heading>Our Mission</Heading>
        <Text>
          Our mission is to democratize top-tier education and empower
          businesses and individuals worldwide. We believe in making
          high-quality learning and innovative software solutions accessible and
          affordable for everyone, everywhere. We strive to bridge the digital
          divide by providing practical, real-world skills and state-of-the-art
          solutions that drive personal and professional growth.
        </Text>
      </ContentSection>

      {/* Who We Are */}
      <ContentSection>
        <Heading>Who We Are</Heading>
        <Text>
          Aspro IT is a dedicated team of passionate educators, seasoned
          industry experts, and innovative technologists. We work tirelessly to
          create and deliver content and services that are not only informative
          but also engaging and impactful. We live by the principle of quality,
          seamlessly blending expertise with experience to ignite innovation and
          empower futures.
        </Text>
      </ContentSection>

      {/* What We Offer */}
      <ContentSection>
        <Heading>What We Offer</Heading>
        <Text>
          We offer a diverse range of services designed to meet the evolving
          needs of individuals and organizations:
          <br />• <b>Immersive Training Programs:</b> We equip individuals and
          teams with the skills needed to thrive in the dynamic field of
          software development through both offline and online courses.
          <br />• <b>Tech Courses:</b> Programming, Web Development, Data
          Science, Artificial Intelligence, and more.
          <br />• <b>Non-Tech Courses:</b> Digital Marketing, Creative Writing,
          Personal Development, and more.
          <br />• <b>Corporate Training:</b> Customized training solutions for
          businesses to upskill their workforce.
          <br />• <b>Software Development:</b> Innovative software solutions
          crafted to meet the specific needs of businesses worldwide.
        </Text>
      </ContentSection>

      {/* Values */}
      <ContentSection>
        <Heading>Our Values</Heading>
        <Text>
          Our values are at the core of everything we do. They guide our
          decisions and shape our culture:
          <br />• <b>Quality:</b> We are committed to delivering high-quality,
          practical, and relevant solutions and content.
          <br />• <b>Accessibility:</b> We prioritize making excellence in
          education and technology accessible to all, regardless of financial or
          geographical barriers.
          <br />• <b>Innovation:</b> We continuously innovate in our courses and
          software solutions to stay at the forefront of industry trends.
          <br />• <b>Community:</b> We foster a supportive community where
          learners, educators, and businesses can collaborate and grow together.
        </Text>
      </ContentSection>

      {/* Contact */}
      <ContentSection>
        <Heading>Contact Us</Heading>
        <Text>
          Embark on your journey into the forefront of technology with us. If
          you have any questions or need support, we are here to help.
        </Text>
      </ContentSection>
    </StyledContentWrapper>
  );
}