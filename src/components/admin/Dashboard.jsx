import React,{useState,useEffect} from "react";
import { BookOpen, Megaphone, Users } from "lucide-react";
import { totalCourse,totalEnrollments } from "../../api/course";
import { totalBanners } from "../../api/campaign";
export default function Dashboard() {
    const [totalCourses, setTotalCourses] = useState(0);
    const [enrollment, setEnrollment] = useState(0);
    const [banners, setBanners] = useState(0);

    const fetchDetails = async () => {
      try {
        const data = await totalCourse();
        const enrollmentData = await totalEnrollments();
        const bannersData = await totalBanners();
        setEnrollment(enrollmentData.total || 0);
        setTotalCourses(data.total || 0);
        setBanners(bannersData.data.total || 0);
      } catch (err) {
        console.error("Error fetching total courses:", err);
      }
    };

    useEffect(() => {
      fetchDetails();
    }, []);
  
  const stats = [
    {
      label: "Active Courses",
      value: totalCourses,
      icon: <BookOpen size={22} color="#FFFFFF" />,
    },
    {
      label: "Active Campaigns",
      value: banners,
      icon: <Megaphone size={22} color="#FFFFFF" />,
    },
    {
      label: "Total Enrollment",
      value: enrollment,
      icon: <Users size={22} color="#FFFFFF" />,
    },
  ];

  return (
    <div
      style={{
        left: "100px",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "140px",
        paddingLeft: "120px",
        minHeight: "90vh",
      }}
    >
      {/* Heading */}
      <div>
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "100%",
            color: "#FFFFFF",
            marginLeft: "24px",
          }}
        >
          Dashboard Overview
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "10%",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          Welcome to AsproIT Admin Control Hub
        </p>
      </div>

      {/* Stats Boxes */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          marginTop: "60px",
          marginLeft: "50px",
          gap: "30px",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "30%",
              height: "124px",
              borderRadius: "20px",
              padding: "2px",
              background:
                "linear-gradient(180deg, #CB46DB 0%, #000000 25.96%, #000000 78.85%, #8A38F5 100%)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                background: "#000000",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px 28px",
                boxSizing: "border-box",
                backgroundClip: "padding-box",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
                {item.icon}
              </div>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "32px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
