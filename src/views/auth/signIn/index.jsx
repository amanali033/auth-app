import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuth from 'layouts/auth/Default';
// Assets
import illustration from 'assets/img/auth/bg-auth.jpg';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { createAPIEndPoint } from 'config/api/api';
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';

function SignIn() {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const textColorSecondary = 'secondaryGray.600';
  const brandStars = useColorModeValue('red.500', 'red.400');
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [otp, setOtp] = useState('');

  const handleClick = () => setShow(!show);

  const login = async (email, password) => {
    try {
      const data = JSON.stringify({ email, password });
      const response = await createAPIEndPoint('login').create(data);
      setTempToken(response.data.temp_token);
      setQrCodeUrl(`data:image/png;base64,${response.data.qr_code}`);
      setShowQrCode(true);
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const verifyOtp = async () => {
    if (otp.length === 6) {
      try {
        const data = JSON.stringify({ token: otp, temp_token: tempToken });
        const response = await createAPIEndPoint('verify_2fa').create(data);
        localStorage.setItem('access_token', response.data.token);
        alert(response?.data?.message || 'OTP verified successfully!');
        navigate('/');
      } catch (error) {
        alert(error?.response?.data?.error || 'OTP verification failed.');
      }
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password:
        Yup.string()
        .required('Required'),
    }),
    onSubmit: (values) => login(values.email, values.password),
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
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
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
            {/* <Text color="gray.400" mx="14px">
              or
            </Text> */}
            <HSeparator />
          </Flex>
          <form onSubmit={formik.handleSubmit}>
            {!showQrCode ? (
              <>
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
                    Email<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    name="email"
                    variant="auth"
                    fontSize="sm"
                    type="email"
                    placeholder="Enter your email"
                    mb="8px"
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
                    <Text color="red.500" fontSize="sm">
                      {formik.errors.email}
                    </Text>
                  )}
                </FormControl>

                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                  mt={4}
                >
                  <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                  >
                    Password <Text color={brandStars}>*</Text>
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      name="password"
                      fontSize="sm"
                      placeholder="Enter your password"
                      mb="8px"
                      size="lg"
                      type={show ? 'text' : 'password'}
                      variant="auth"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      borderColor={
                        formik.errors.password && formik.touched.password
                          ? 'red.500'
                          : 'gray.200'
                      }
                    />
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      mt="4px"
                    >
                      <Icon
                        color={textColorSecondary}
                        _hover={{ cursor: 'pointer' }}
                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <Text color="red.500" fontSize="sm">
                      {formik.errors.password}
                    </Text>
                  )}
                </FormControl>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <NavLink to="/auth/forgot-password">
                    <Text
                      color={textColorBrand}
                      fontSize="sm"
                      w="124px"
                      fontWeight="500"
                    >
                      Forgot password?
                    </Text>
                  </NavLink>
                </Flex>
                <Button
                  type="submit"
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Text align="center" color={textColor} fontWeight="500">
                  {' '}
                  Scan the QR Code to Proceed
                </Text>
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  style={{ width: '75%', height: 'auto' }}
                />
                <Text align="center" color={textColor} fontWeight="500">
                  Enter OTP
                </Text>

                <Box display="flex" justifyContent="center" mt={2}>
                  <OTPInput
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    numInputs={6}
                    separator={<span style={{ margin: '0 8px' }}>-</span>}
                    inputStyle={{
                      width: '40px',
                      height: '40px',
                      margin: '0 4px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      textAlign: 'center',
                      outline: 'none',
                    }}
                    isInputNum
                    shouldAutoFocus
                    renderInput={(props) => (
                      <input {...props} className="otp-input" />
                    )}
                  />
                </Box>
                <Button
                  onClick={verifyOtp}
                  disabled={otp.length < 6}
                  mt={4}
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Submit OTP
                </Button>
              </>
            )}
          </form>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
