import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
//
import JobItem from './job-item';

// ----------------------------------------------------------------------
const mockJob=[
  {
    "id": "1",
    "source": "TimesJobs",
    "title": "Frontend Developer",
    "company": "M&M Web Solutions",
    "location": "Kolkata, India",
    "description": "Looking for a Frontend Developer with strong skills in HTML5, CSS3, and React.js. Candidates should have a good eye for design and experience with responsive web development.",
    "skills": ["HTML5", "CSS3", "React.js", "JavaScript", "UI/UX"],
    "salary": "3 - 6 LPA",
    "experience": "1 - 3 Years",
    "jobType": "Full Time",
    "postedDate": "2025-08-01T09:15:00.000Z",
    "createdAt": "2025-08-04T11:32:11.524Z",
    "updatedAt": "2025-08-04T11:32:11.524Z"
  },
  {
    "id": "2",
    "source": "Naukri",
    "title": "Backend Developer",
    "company": "TechNova Pvt Ltd",
    "location": "Bangalore, India",
    "description": "We are seeking a Backend Developer skilled in Node.js, Express, and MongoDB. The candidate should have experience building scalable APIs and working with cloud services.",
    "skills": ["Node.js", "Express", "MongoDB", "REST API", "AWS"],
    "salary": "6 - 10 LPA",
    "experience": "2 - 5 Years",
    "jobType": "Full Time",
    "postedDate": "2025-08-05T10:00:00.000Z",
    "createdAt": "2025-08-05T12:45:00.000Z",
    "updatedAt": "2025-08-05T12:45:00.000Z"
  },
  {
    "id": "3",
    "source": "LinkedIn",
    "title": "UI/UX Designer",
    "company": "Designify",
    "location": "Remote",
    "description": "Creative UI/UX Designer with knowledge of Figma and Adobe XD. Should be able to create modern, responsive interfaces and work closely with developers.",
    "skills": ["Figma", "Adobe XD", "Wireframing", "Prototyping", "Responsive Design"],
    "salary": "5 LPA",
    "experience": "3 - 6 Years",
    "jobType": "Contract",
    "postedDate": "2025-08-07T14:30:00.000Z",
    "createdAt": "2025-08-07T14:45:00.000Z",
    "updatedAt": "2025-08-07T14:45:00.000Z"
  },
    {
    "id": "4",
    "source": "Naukri",
    "title": "React Developer",
    "company": "Designify",
    "location": "Remote",
    "description": "Creative UI/UX Designer with knowledge of Figma and Adobe XD. Should be able to create modern, responsive interfaces and work closely with developers.",
    "skills": ["Familier with React", "JavaScript", "CSS", "HTML", "Responsive Design"],
    "salary": "5 LPA",
    "experience": "3 - 6 Years",
    "jobType": "Contract",
    "postedDate": "2025-08-07T14:30:00.000Z",
    "createdAt": "2025-08-07T14:45:00.000Z",
    "updatedAt": "2025-08-07T14:45:00.000Z"
  },
    {
    "id": "5",
    "source": "LinkedIn",
    "title": "UI/UX Designer",
    "company": "Designify",
    "location": "Remote",
    "description": "Creative UI/UX Designer with knowledge of Figma and Adobe XD. Should be able to create modern, responsive interfaces and work closely with developers.",
    "skills": ["Figma", "Adobe XD", "Wireframing", "Prototyping", "Responsive Design"],
    "salary": "5 LPA",
    "experience": "3 - 6 Years",
    "jobType": "Contract",
    "postedDate": "2025-08-07T14:30:00.000Z",
    "createdAt": "2025-08-07T14:45:00.000Z",
    "updatedAt": "2025-08-07T14:45:00.000Z"
  },
    {
    "id": "6",
    "source": "Naukri",
    "title": "UI/UX Designer",
    "company": "Designify",
    "location": "Remote",
    "description": "Creative UI/UX Designer with knowledge of Figma and Adobe XD. Should be able to create modern, responsive interfaces and work closely with developers.",
    "skills": ["Figma", "Adobe XD", "Wireframing", "Prototyping", "Responsive Design"],
    "salary": "5 LPA",
    "experience": "3 - 6 Years",
    "jobType": "Contract",
    "postedDate": "2025-08-07T14:30:00.000Z",
    "createdAt": "2025-08-07T14:45:00.000Z",
    "updatedAt": "2025-08-07T14:45:00.000Z"
  }
]


export default function JobList() {
  const router = useRouter();

  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.job.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id) => {
      router.push(paths.dashboard.job.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {mockJob.map((job) => (
          <JobItem
            key={job.id}
            job={job}
            onView={() => handleView(job.id)}
            onEdit={() => handleEdit(job.id)}
            onDelete={() => handleDelete(job.id)}
          />
        ))}
      </Box>

      {mockJob.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}


