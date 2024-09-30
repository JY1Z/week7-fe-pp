import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const [job, setJob] = useState(null); // Initialize job state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { id } = useParams();
  const navigate = useNavigate();

  // Declare state variables for form fields
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Function to handle the PUT request to update the job
  const updateJob = async (job) => {
    try {
      console.log("Updating job:", job);
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error("Failed to update job");
      return res.ok;
    } catch (error) {
      console.error("Error updating job:", error);
      return false;
    }
  };

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data); // Set the job data

        console.log("Fetched job data:", data);

        // Initialize form fields with fetched job data
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchJob();
  }, [id]);

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      id,
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };

    console.log("Updated job data to submit:", updatedJob);

    const success = await updateJob(updatedJob);
    if (success) {
      navigate(`/jobs/${id}`);
    } else {
      setError("Failed to update the job. Please try again.");
    }
  };

  return (
    <div className="create">
      <h2>Update Job</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Job title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Job type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>

          <label>Job Description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label>Company Name:</label>
          <input
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <label>Contact Email:</label>
          <input
            type="text"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <label>Contact Phone:</label>
          <input
            type="text"
            required
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <button>Update Job</button>
        </form>
      )}
    </div>
  );
};

export default EditJobPage;

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const EditJobPage = () => {
//   const { id } = useParams();  
//   const navigate = useNavigate();

//   const [job, setJob] = useState(null); 
//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("Full-Time");
//   const [description, setDescription] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [contactEmail, setContactEmail] = useState("");
//   const [contactPhone, setContactPhone] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const updateJob = async (job) => {
//     try {
//       const res = await fetch(`/api/jobs/${job.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(job),
//       });
//       if (!res.ok) throw new Error("Failed to update job");
//       return true; // Indicate success
//     } catch (error) {
//       console.error("Error updating job:", error);
//       return false; // Indicate failure
//     }
//   };

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const res = await fetch(`/api/jobs/${id}`);
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await res.json();

//         setTitle(data.title);
//         setType(data.type);
//         setDescription(data.description);
//         setCompanyName(data.company.name);
//         setContactEmail(data.company.contactEmail);
//         setContactPhone(data.company.contactPhone);
//       } catch (error) {
//         console.error("Failed to fetch job:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchJob();
//   }, [id]);

//   const submitForm = async (e) => {
//     e.preventDefault();

//     const updatedJob = {
//       id,  
//       title,
//       type,
//       description,
//       company: {
//         name: companyName,
//         contactEmail,
//         contactPhone,
//       },
//     };

//     const success = await updateJob(updatedJob);
//     if (success) {
//       navigate(`/jobs/${id}`); 
//     } else {
//       setError("Failed to update the job. Please try again.");
//     }
//   };

//   return (
//     <div className="create">
//       <h2>Update Job</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <form onSubmit={submitForm}>
//           <label>Job Title:</label>
//           <input
//             type="text"
//             required
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <label>Job Type:</label>
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="Full-Time">Full-Time</option>
//             <option value="Part-Time">Part-Time</option>
//             <option value="Remote">Remote</option>
//             <option value="Internship">Internship</option>
//           </select>

//           <label>Job Description:</label>
//           <textarea
//             required
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>

//           <label>Company Name:</label>
//           <input
//             type="text"
//             required
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//           />

//           <label>Contact Email:</label>
//           <input
//             type="email"
//             required
//             value={contactEmail}
//             onChange={(e) => setContactEmail(e.target.value)}
//           />

//           <label>Contact Phone:</label>
//           <input
//             type="text"
//             required
//             value={contactPhone}
//             onChange={(e) => setContactPhone(e.target.value)}
//           />

//           <button type="submit">Update Job</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditJobPage;
