import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobPage = () => {
  const { id } = useParams();  // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  // Fetch job details when the component loads
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          console.error('Failed to fetch job');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [id]);

  // Function to delete the job
  const deleteJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Job deleted successfully');
        navigate('/');  // Navigate to the homepage after deleting
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Confirm deletion before calling deleteJob
  const onDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (confirmDelete) {
      deleteJob();
    }
  };

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p> {/* Assuming job.company is an object */}
      <p>Contact Email: {job.contactEmail}</p>
      <p>Contact Phone: {job.contactPhone}</p>
      
      <button onClick={onDeleteClick}>Delete Job</button>
      <button onClick={() => navigate(`/edit-job/${job._id}`)}>edit</button>

    </div>
  );
};

export default JobPage;
