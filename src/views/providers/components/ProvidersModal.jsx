import React from 'react';
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
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const ProvidersModal = ({
  isOpen,
  onClose,
  type = 'add',
  initialData = {},
}) => {
  // Validation Schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    phone: Yup.string()
      .matches(/^\d+$/, 'Phone number must be digits only')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    designation: Yup.string().required('Designation is required'),
    NPI: Yup.string().required('NPI is required'),
    TIN: Yup.string().required('TIN is required'),
    stateId: Yup.string().required('State ID is required'),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      fullName: initialData?.fullName || '',
      phone: initialData?.phone || '',
      email: initialData?.email || '',
      designation: initialData?.designation || '',
      NPI: initialData?.NPI || '',
      TIN: initialData?.TIN || '',
      stateId: initialData?.stateId || '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(
        type === 'edit' ? 'Updating provider...' : 'Adding provider...',
        values,
      );
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="16px"
        pb="16px"
        maxWidth={{ base: '90%', md: '448px' }}
        maxH="90vh"
        overflowY="auto"
      >
        <ModalHeader color="brand.500">
          {type === 'edit' ? 'Edit Provider' : 'Create Provider'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            {[
              'fullName',
              'phone',
              'email',
              'designation',
              'NPI',
              'TIN',
              'stateId',
            ].map((field, index) => (
              <FormControl
                key={index}
                isInvalid={formik.touched[field] && formik.errors[field]}
                mb={2}
              >
                <FormLabel mb={0} textTransform="capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </FormLabel>
                <Input
                  name={field}
                  placeholder={`Enter ${field
                    .replace(/([A-Z])/g, ' $1')
                    .trim()}`}
                  variant="auth"
                  fontSize="sm"
                  fontWeight="500"
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors[field]}
                  </Text>
                )}
              </FormControl>
            ))}
            <Button type="submit" colorScheme="brand" w="100%" mt={4}>
              {type === 'edit' ? 'Edit Provider' : 'Create Provider'}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
