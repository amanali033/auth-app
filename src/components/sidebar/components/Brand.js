import React from 'react';

// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex align="center" direction="column">
      <Text
        color={logoColor}
        fontSize={{ base: '20px', md: '26px' }}
        fontWeight="900"
        lineHeight="100%"
        mb="20px"
      >
        Auth <span style={{ fontWeight: '500' }}>App</span>
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
