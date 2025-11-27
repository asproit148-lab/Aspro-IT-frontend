export default function AboutContent() {
  const sectionStyle = {
    marginBottom: "40px",
  };

  const headingStyle = {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "36px",
    lineHeight: "100%",
    color: "white",
    marginBottom: "20px",
  };

  const textStyle = {
    fontFamily: "Poppins",
    fontWeight: 300,
    fontSize: "20px",
    lineHeight: "150%",
    color: "#ccc",
  };

  return (
    <div
      style={{
        background:
      "radial-gradient(75.43% 86.11% at 6.76% 93.52%, rgba(61,150,224,0.1) 0%, rgba(61,61,61,0.3) 100%)",
    borderRadius: "20px",
    padding: "40px 50px",
    boxShadow: "0px 4px 25px 0px rgba(61,150,224,0.4)",
    margin: "0",
    width: "95%",
      }}
    >
      {/* About Us */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>About Us</h2>
        <p style={textStyle}>
          Welcome to Aspro IT, a premier provider of cutting-edge software
          development and training services on a global scale. We are your
          gateway to high-quality, accessible education in emerging
          technologies, committed to excellence without compromise.
        </p>
      </div>

      {/* Mission */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Our Mission</h2>
        <p style={textStyle}>
          Our mission is to democratize top-tier education and empower
          businesses and individuals worldwide. We believe in making
          high-quality learning and innovative software solutions accessible and
          affordable for everyone, everywhere. We strive to bridge the digital
          divide by providing practical, real-world skills and state-of-the-art
          solutions that drive personal and professional growth.
        </p>
      </div>

      {/* Who We Are */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Who We Are</h2>
        <p style={textStyle}>
          Aspro IT is a dedicated team of passionate educators, seasoned
          industry experts, and innovative technologists. We work tirelessly to
          create and deliver content and services that are not only informative
          but also engaging and impactful. We live by the principle of quality,
          seamlessly blending expertise with experience to ignite innovation and
          empower futures.
        </p>
      </div>

      {/* What We Offer */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>What We Offer</h2>
        <p style={textStyle}>
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
        </p>
      </div>

      {/* Values */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Our Values</h2>
        <p style={textStyle}>
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
        </p>
      </div>

      {/* Contact */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Contact Us</h2>
        <p style={textStyle}>
          Embark on your journey into the forefront of technology with us. If
          you have any questions or need support, we are here to help.
        </p>
      </div>
    </div>
  );
}
