import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuth from 'layouts/auth/Default';
// Assets
import illustration from 'assets/img/auth/bg-auth.jpg';
import { MdArrowBack } from 'react-icons/md';

function ForgotPassword() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('brand.500', 'white');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: '90%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="fit-content"
        alignItems="start"
        justifyContent="center"
        px={{ base: '25px', md: '30px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Box me="auto">
          <Heading
            color={textColor}
            fontSize={{ base: '24px', md: '32px', lg: '36px' }}
            mb="10px"
          >
            Forgot Password
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email to reset your password.
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <Flex align="center" mb="25px">
            <HSeparator />
          </Flex>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color="red.500">*</Text>
              </FormLabel>
              <Input
                name="email"
                variant="auth"
                fontSize="sm"
                type="email"
                placeholder="mail@simmmple.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                borderColor={
                  formik.errors.email && formik.touched.email
                    ? 'red.500'
                    : 'gray.200'
                }
              />
              {formik.touched.email && formik.errors.email && (
                <Text color="red.500" fontSize="sm" mt="1">
                  {formik.errors.email}
                </Text>
              )}
            </FormControl>
            <NavLink to="/auth/reset-password">
              <Button
                type="submit"
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Reset Password
              </Button>
            </NavLink>
          </form>
          <NavLink to="/auth/sign-in">
            <motion.div
              whileHover={{
                scale: 1.1, // Move the arrow 5px to the right
                transition: { duration: 0.3 },
              }}
            >
              <Flex
                fontSize="sm"
                variant="outline"
                fontWeight="500"
                w="100%"
                h="50"
                borderColor="gray.300"
                align="center"
                justify="center"
                p="10px"
                _hover={{
                  cursor: 'pointer',
                  borderColor: 'gray.500',
                }}
              >
                <MdArrowBack
                  style={{ marginRight: '8px', marginBottom: '-1px' }}
                />
                Back to Login
              </Flex>
            </motion.div>
          </NavLink>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ForgotPassword;
