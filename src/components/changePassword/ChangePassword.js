import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
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
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import BackButton from 'components/BackButton';

function ChangePassword() {
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleShowPassword = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Current password is required'),
            newPassword: Yup.string()
                .min(8, 'New password must be at least 8 characters')
                .required('New password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: (values) => {
            console.log('Password changed:', values);
        },
    });

    return (
        <Box pt={{ base: '80px', md: '80px', xl: '80px' }}>
            <BackButton />
            <Flex align="center" justify="center">
                <Box p={6} borderRadius="lg" boxShadow="lg" bg="white" w={{ base: '90%', md: '500px' }}>
                    <Heading color={textColor} fontSize={{ base: '24px', md: '28px', lg: '32px' }}
                        mb={4}>Change Password</Heading>
                    <form onSubmit={formik.handleSubmit}>
                        {['currentPassword', 'newPassword', 'confirmPassword'].map((field, index) => (
                            <FormControl key={index} isInvalid={formik.touched[field] && formik.errors[field]} mb={4}>
                                <FormLabel color={textColor}>{
                                    field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm Password'
                                }</FormLabel>
                                <InputGroup>
                                    <Input
                                        variant="auth"
                                        name={field}
                                        type={showPassword[field] ? 'text' : 'password'}
                                        placeholder={`Enter ${field === 'currentPassword' ? 'current' : field === 'newPassword' ? 'new' : 'confirm'} password`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values[field]}
                                    />
                                    <InputRightElement>
                                        <Icon
                                            color="gray.400"
                                            as={showPassword[field] ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                            cursor="pointer"
                                            onClick={() => handleShowPassword(field)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                {formik.touched[field] && formik.errors[field] && (
                                    <Text color="red.500" fontSize="sm">{formik.errors[field]}</Text>
                                )}
                            </FormControl>
                        ))}
                        <Button type="submit" colorScheme="blue" w="full" mt={4}>Change Password</Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    );
}

export default ChangePassword;
