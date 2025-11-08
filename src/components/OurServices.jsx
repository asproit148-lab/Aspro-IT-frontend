import React from "react";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";

export default function OurServices() {
  return (
    <div >
      {/* Heading */}
      <h2
        style={{
          fontFamily: "Poppins",
          fontWeight: 400,
          fontSize: "64px",
          textAlign: "center",
          marginBottom: "45px",
          marginTop: "15px",
          color: "white",
        }}
      >
        Our Services
      </h2>

      {/* Two Images Side by Side */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginBottom: "0",
        }}
      >
        <img
          src={service1}
          alt="Service 1"
          style={{
            width: "618px",
            height: "309px",
            borderRadius: "36px",
            objectFit: "cover",
          }}
        />
        <img
          src={service2}
          alt="Service 2"
          style={{
            width: "592px",
            height: "304px",
            borderRadius: "36px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Text Section */}
      <div
        style={{
          padding: "30px 70px",
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          Our Services and Training Process: Empowering You in Software Development and Training with Placement Assistance
        </h3>

        <div
          style={{
            fontFamily: "Poppins",
            fontWeight: 300,
            fontSize: "20px",
            lineHeight: "120%",
            color: "#ccc",
          }}
        >
          <p style={{ marginBottom: "30px" }}>
            <b>About Our Services and Training Process</b><br />
            <br />
            Welcome to our website! We are thrilled to have you here, and we can't wait to tell you all about our top-notch
            services and our unique training process for software development and software training with placement
            assistance. Whether you're a seasoned professional looking to enhance your skills or a fresh graduate ready
            to kickstart your career, we've got you covered!
          </p>

          <p style={{ marginBottom: "30px" }}>
            <b>Our Services</b><br />
            <br />
            When it comes to software development, we pride ourselves on delivering exceptional results. Our team of
            experienced developers is passionate about creating innovative solutions that meet your specific needs. From
            web and mobile applications to enterprise software, we have the expertise to bring your ideas to life. We
            believe in collaboration and transparency, working closely with you throughout the development process to
            ensure your satisfaction.
          </p>

          <p style={{ marginBottom: "30px" }}>
            But our services don't stop at software development. We also offer comprehensive software training programs
            designed to equip you with the skills and knowledge you need to excel in the industry. Our training courses
            cover a wide range of topics, including programming languages, software testing, project management, and
            more. Whether you're a beginner or an experienced professional, we have the right training program to help
            you level up.
          </p>

          <p style={{ marginBottom: "30px" }}>
            <b>Our Training Process</b><br />
            <br />
            At our training center, we believe in a hands-on approach to learning. Our interactive training sessions are
            led by industry experts who have a wealth of real-world experience. We understand that theory alone is not
            enough, so we provide practical exercises and projects to reinforce your understanding of the concepts.
            <br /><br />
            Our training process is designed to be engaging and enjoyable. We believe that learning should be fun, so we
            incorporate interactive activities, group discussions, and even gamification elements into our training
            sessions. We want you to feel inspired and motivated throughout your learning journey.
          </p>

          <p style={{ marginBottom: "30px" }}>
            One of the unique aspects of our training process is our focus on personalized attention. We understand that
            everyone has different learning styles and paces, so we tailor our training programs to meet your individual
            needs. Whether you prefer one-on-one sessions or thrive in a group setting, we have the flexibility to
            accommodate your preferences.
          </p>

          <p style={{ marginBottom: "30px" }}>
            <b>Placement Assistance</b><br />
            <br />
            We understand that finding the right job after completing your training is crucial. That's why we offer
            placement assistance to our trainees. Our dedicated placement team works tirelessly to connect you with
            leading companies in the industry. We have established strong relationships with reputable organizations, and
            we leverage these connections to help you secure exciting job opportunities.
            <br /><br />
            Our placement assistance doesn't end with just connecting you to potential employers. We also provide support
            in resume building, interview preparation, and career counseling. We want to ensure that you are fully
            equipped to make a lasting impression and land your dream job.
          </p>

          <p>
            <b>Conclusion</b><br />
            <br />
            Whether you're looking for top-notch software development services or comprehensive software training with
            placement assistance, we are here to empower you. With our experienced team, engaging training process, and
            dedicated placement assistance, we are confident that we can help you achieve your goals. So, why wait? Take
            the first step towards success and join us today!
          </p>
        </div>
      </div>
    </div>
  );
}
