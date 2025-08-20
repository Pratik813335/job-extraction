import { useState, useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _jobs, JOB_PUBLISH_OPTIONS, JOB_DETAILS_TABS } from 'src/_mock';
// components
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
//
import JobDetailsToolbar from '../job-details-toolbar';
import JobDetailsContent from '../job-details-content';
import JobDetailsCandidates from '../job-details-candidates';

const mockJob=[
  {
    "id": "1",
    "source": "TimesJobs",
    "title": "Frontend Developer",
    "company": "M&M Web Solutions",
    "location": "Kolkata, India",
     "benefits": ["Health Insurance", "Work from Home", "Flexible Hours"],
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
     "benefits": ["Health Insurance", "Work from Home", "Flexible Hours"],
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
     "benefits": ["Health Insurance", "Work from Home", "Flexible Hours"],
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
     "benefits": ["Health Insurance", "Work from Home", "Flexible Hours"],
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
    "benefits": ["Health Insurance", "Work from Home", "Flexible Hours"],
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
     "benefits": ["Health Insurance", "Work from Home", "Flexible Hours"],
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

// ----------------------------------------------------------------------

export default function JobDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentJob = mockJob.filter((job) => job.id === id)[0];

  const [publish, setPublish] = useState(currentJob?.publish);

  const [currentTab, setCurrentTab] = useState('title');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {JOB_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'candidates' ? (
              <Label variant="filled">{currentJob?.candidates.length}</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <JobDetailsToolbar
        backLink={paths.dashboard.job.root}
        editLink={paths.dashboard.job.edit(`${currentJob?.id}`)}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={JOB_PUBLISH_OPTIONS}
      />
      {renderTabs}

      {currentTab === 'title' && <JobDetailsContent job={currentJob} />}
       {/* {mockJob.map((job) => (
                <JobDetailsContent
                  key={job.id}
                  job={job}
                />
              ))} */}

      {currentTab === 'candidates' && <JobDetailsCandidates candidates={currentJob?.candidates} />}
    </Container>
  );
}
