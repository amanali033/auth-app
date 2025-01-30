import {
  Box,
  Button,
  Grid,
  Select,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import Card from 'components/card/Card';
import BackButton from 'components/BackButton';

export default function LocationDetails(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  const [isEnabled, setIsEnabled] = useState(true); // For status toggle

  const handleStatusChange = () => {
    setIsEnabled(!isEnabled); // Toggle between enabled and disabled
  };

  const [currentRole, setCurrentRole] = useState('Staff');
  const [currentStatus, setCurrentStatus] = useState('Active');

  useEffect(() => {
    setCurrentStatus(isEnabled === true ? 'Active' : 'Inactive');
  }, [isEnabled]);
  const handleRoleChange = (event) => {
    setCurrentRole(event.target.value);
  };

  const handleResetPassword = () => {
    // Logic for resetting password goes here (e.g., open modal or API call)
    alert('Password reset logic goes here.');
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <BackButton />
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '1fr 1fr',
        }}
        templateRows={{
          base: 'repeat(2, 1fr)',
          lg: '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
      >
        <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mt="8px"
            mb="24px"
          >
            General Information
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Display Clinic Information */}
            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                Name:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                Clinic
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                Email:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                clinic@gmail.com
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                Role:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                Admin
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color={textColorPrimary}>
                Designation:
              </Text>
              <Text color={textColorSecondary} fontSize="md">
                Lab
              </Text>
            </Box>
            {/* Status Toggle (Enable/Disable) */}
            <Box>
              <Text fontWeight="semibold" color={textColorPrimary} mb="10px">
                Status:
              </Text>
              <Switch
                isChecked={isEnabled}
                onChange={handleStatusChange}
                colorScheme="brand"
              />
              <Text color={textColorSecondary} fontSize="md" mt="5px">
                {isEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </Box>

            {/* Reset Password Button */}
            <Box mt="30px">
              <Button
                fontWeight="500"
                colorScheme="red"
                onClick={handleResetPassword}
                size="md"
              >
                Reset Password
              </Button>
            </Box>
          </SimpleGrid>
        </Card>
        <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mt="10px"
            mb="4px"
          >
            Role Setting
          </Text>

          <Text color={textColorSecondary} fontSize="md" me="26px" mb="20px">
            Status: <strong>{currentStatus}</strong>
          </Text>

          <Text color={textColorSecondary} fontSize="md" me="26px" mb="10px">
            Role:
          </Text>
          <Select
            value={currentRole}
            onChange={handleRoleChange}
            w="100%"
            mb="20px"
          >
            <option value="Staff">Staff</option>
            <option value="Lab">Lab</option>
            <option value="Admin">Admin</option>
          </Select>
        </Card>
      </Grid>
    </Box>
  );
}
