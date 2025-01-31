import React from 'react';
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
    Input,
    Select,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import BackButton from 'components/BackButton';

function ProfileForm() {
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';

    const formik = useFormik({
        initialValues: {
            username: '',
            address: '',
            phoneNumber: '',
            timeZone: '',
            enable2FA: false,
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            address: Yup.string().required('Address is required'),
            phoneNumber: Yup.string()
                .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
                .required('Phone number is required'),
            timeZone: Yup.string().required('Time zone is required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Box pt={{ base: '80px', md: '80px', xl: '80px' }}>
            <BackButton />
            <Flex align="center" justify="center">
                <Box p={6} borderRadius="lg" boxShadow="lg" bg="white" w="500px">
                    <Heading color={textColor}
                        fontSize={{ base: '24px', md: '28px', lg: '32px' }} mb="10px">Profile</Heading>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl isInvalid={formik.touched.username && formik.errors.username} mb={4}>
                            <FormLabel>Username</FormLabel>
                            <Input name="username" placeholder="Enter your username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                            {formik.touched.username && formik.errors.username && <Text color="red.500" fontSize="sm">{formik.errors.username}</Text>}
                        </FormControl>

                        <FormControl isInvalid={formik.touched.address && formik.errors.address} mb={4}>
                            <FormLabel>Address</FormLabel>
                            <Input name="address" placeholder="Enter your address" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
                            {formik.touched.address && formik.errors.address && <Text color="red.500" fontSize="sm">{formik.errors.address}</Text>}
                        </FormControl>

                        <FormControl isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber} mb={4}>
                            <FormLabel>Phone Number</FormLabel>
                            <Input name="phoneNumber" placeholder="Enter your phone number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phoneNumber} />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && <Text color="red.500" fontSize="sm">{formik.errors.phoneNumber}</Text>}
                        </FormControl>

                        <FormControl isInvalid={formik.touched.timeZone && formik.errors.timeZone} mb={4}>
                            <FormLabel>Time Zone</FormLabel>
                            <Select name="timeZone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.timeZone}>
                                <option value="">Select Time Zone</option>
                                <option value="GMT">GMT</option>
                                <option value="EST">EST</option>
                                <option value="PST">PST</option>
                            </Select>
                            {formik.touched.timeZone && formik.errors.timeZone && <Text color="red.500" fontSize="sm">{formik.errors.timeZone}</Text>}
                        </FormControl>

                        <FormControl mb={4}>
                            <Checkbox name="enable2FA" onChange={formik.handleChange} isChecked={formik.values.enable2FA}>
                                Enable 2FA
                            </Checkbox>
                        </FormControl>

                        <Button type="submit" colorScheme="blue" width="full">Submit</Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    );
}

export default ProfileForm;
