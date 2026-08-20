/*
 * Written to Indian convention, as supplied: CGPA and percentages, board names
 * (HSC, CBSE), and full month names.
 *
 * Optional fields per entry, rendered only when non-empty:
 *
 *   coursework: ["Operating Systems", "Computer Networks", "Databases"]
 *       Gives the distributed-systems interest some formal grounding.
 *
 *   highlights: ["Final year project: …", "Department rank 2 of 120"]
 *       Rank, scholarships, the final year project, a TA role. The one field
 *       that can say something a CGPA cannot.
 *
 *   activities: ["ACM student chapter", "Coding club core team"]
 */
const education = [
  // Master's goes here when it starts — entries run newest first.
  //
  // `grade` is skipped while empty, so an in-progress degree simply shows no
  // GPA line until there is one. `duration` renders verbatim: "Sep 2026 -
  // Present" while studying, or "Sep 2026 - Jun 2028 (expected)" if you would
  // rather state the end date up front.
  // {
  //   institution: "",
  //   location: "",
  //   degree: "Master of Science - Computer Science",
  //   duration: "Sep 2026 - Present",
  //   grade: "",
  //   coursework: [],
  //   highlights: [],
  //   activities: [],
  // },
  {
    institution: "Savitribai Phule Pune University",
    location: "Pune, India",
    degree: "Bachelor of Engineering - Computer Engineering",
    grade: "CGPA: 9.02",
    duration: "July 2020 - June 2024",
    coursework: [],
    highlights: [],
    activities: [],
  },
  {
    institution: "Chhatrapati Shahu Vidyalaya & Jr. College",
    location: "Kolhapur, India",
    degree: "Higher Secondary Certificate",
    grade: "Percentage: 80%",
    duration: "July 2018 - March 2020",
  },
  {
    institution: "Dr. D. Y. Patil's Academy Shantiniketan",
    location: "Kolhapur, India",
    degree: "Secondary School Certificate",
    grade: "Percentage: 95%",
    duration: "March 2018",
  },
];

export default education;
