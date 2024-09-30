import { useEffect, useState } from 'react';
import JobListings from "../components/JobListings";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="home">
      <JobListings jobs={jobs} />
    </div>
  );
};

export default Home;

// import JobListings from "../components/JobListings";

// const Home = () => {
//   return (
//     <div className="home">
//       <JobListings  />
//     </div>
//   );
// };

// export default Home;
