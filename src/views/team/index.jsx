import React from 'react';
import TeamTable from './components/TeamTable';
import { Box } from '@chakra-ui/react';

const Team = () => {
  const teamData = [
    {
      name: 'Clinic',
      email: 'Clinic@gmail.com',
      requestStatus: 'Accepted',
      role: 'Admin',
      userStatus: 'Enable',
    },
    {
      name: 'Shahrukh',
      email: 'Shahrukh@azulcode.com',
      requestStatus: 'Pending',
      role: 'Admin',
      userStatus: 'Disabled',
    },
    {
      name: 'Asad Ali',
      email: 'Asad.ali@dental360usa.com',
      requestStatus: 'Accepted',
      role: 'Admin',
      userStatus: 'Enable',
    },
    {
      name: 'Arslan Akhtar',
      email: 'Arslan@dental360usa.com',
      requestStatus: 'Accepted',
      role: 'Admin',
      userStatus: 'Enable',
    },
    {
      name: 'Hello Azul',
      email: 'Hello@azulcode.com',
      requestStatus: 'Accepted',
      role: 'Lab',
      userStatus: 'Enable',
    },
    {
      name: 'Benjamin Threloff',
      email: 'Benjamin.t@dental360usa.com',
      requestStatus: 'Accepted',
      role: 'Staff',
      userStatus: 'Enable',
    },
    {
      name: 'Angie Bueno',
      email: 'Angie.b@dental360usa.com',
      requestStatus: 'Pending',
      role: 'Staff',
      userStatus: 'Disabled',
    },
    {
      name: 'Eva Garcia',
      email: 'Eva.g@dental360usa.com',
      requestStatus: 'Accepted',
      role: 'Staff',
      userStatus: 'Enable',
    },
    {
      name: 'Aalian Daar',
      email: 'Aalian.d@dental360usa.com',
      requestStatus: 'Accepted',
      role: 'Staff',
      userStatus: 'Enable',
    },
    {
      name: 'Alyssa Harmer',
      email: 'Alyssa.h@dental360usa.com',
      requestStatus: 'Accepted',
      role: 'Staff',
      userStatus: 'Enable',
    },
    {
      name: 'Admin',
      email: 'Nimra@dental360usa.com',
      requestStatus: 'Accepted',
      role: 'Admin',
      userStatus: 'Enable',
    },
    {
      name: 'Tammi Zavala',
      email: 'Tammi.z@dental360usa.com',
      requestStatus: 'Pending',
      role: 'Staff',
      userStatus: 'Enable',
    },
    {
      name: 'Pranav Mathur',
      email: 'Admin@buybotmbs.com',
      requestStatus: 'Accepted',
      role: 'Admin',
      userStatus: 'Enable',
    },
    {
      name: 'Hassan123',
      email: 'Hassanpubg57@gmail.com',
      requestStatus: 'Accepted',
      role: 'Staff',
      userStatus: 'Enable',
    },
    {
      name: 'Reema Babar',
      email: 'Reema@dental360grp.com',
      requestStatus: 'Accepted',
      role: 'Admin',
      userStatus: 'Disabled',
    },
    {
      name: 'Abdul Hameed',
      email: 'Hameed@dental360usa.com',
      requestStatus: 'Accepted',
      role: 'Manager',
      userStatus: 'Enable',
    },
  ];
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <TeamTable tableData={teamData} />{' '}
    </Box>
  );
};

export default Team;
