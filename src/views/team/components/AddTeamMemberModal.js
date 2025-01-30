import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

const AddTeamMemberModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    role: Yup.string().required('Role is required'),
    designation: Yup.string().required('Designation is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      role: '',
      designation: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="16px" pb="16px">
          <ModalHeader color="brand.500">Add Team Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.touched.fullName && formik.errors.fullName}
                mb={2}
              >
                <FormLabel mb={0}>Full Name</FormLabel>
                <Input
                  name="fullName"
                  placeholder="Enter full name"
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.fullName}
                  </Text>
                )}
              </FormControl>

              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
                mb={2}
              >
                <FormLabel mb={0}>Email</FormLabel>
                <Input
                  name="email"
                  placeholder="Enter email"
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.email}
                  </Text>
                )}
              </FormControl>

              <FormControl
                isInvalid={formik.touched.role && formik.errors.role}
                mb={2}
              >
                <FormLabel mb={0}>Select Role</FormLabel>
                <Select
                  name="role"
                  placeholder="Select role"
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="admin">Admin</option>
                  <option value="lab">Lab</option>
                  <option value="staff">Staff</option>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.role}
                  </Text>
                )}
              </FormControl>

              <FormControl
                isInvalid={
                  formik.touched.designation && formik.errors.designation
                }
                mb={2}
              >
                <FormLabel mb={0}>Designation</FormLabel>
                <Input
                  name="designation"
                  placeholder="Enter designation"
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.designation && formik.errors.designation && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.designation}
                  </Text>
                )}
              </FormControl>

              <FormControl
                isInvalid={formik.touched.password && formik.errors.password}
                mb={2}
              >
                <FormLabel mb={0}>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    variant="auth"
                    fontSize="sm"
                    fontWeight="500"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement>
                    <Icon
                      as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handlePasswordVisibility}
                      cursor="pointer"
                    />
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.password}
                  </Text>
                )}
              </FormControl>

              <Button type="submit" colorScheme="brand" w="100%" mt={4}>
                Add Team Member
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTeamMemberModal;
