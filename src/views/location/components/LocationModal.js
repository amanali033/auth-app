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

const LocationModal = ({ isOpen, onClose, type = 'add', initialData = {} }) => {
  const validationSchema = Yup.object().shape({
    locationName: Yup.string().required('Location Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    phone: Yup.string()
      .matches(/^\d+$/, 'Phone number must be digits only')
      .required('Phone number is required'),
    postalCode: Yup.string().required('Postal Code is required'),
  });

  const formik = useFormik({
    initialValues: {
      locationName: initialData?.locationName || '',
      address: initialData?.address || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      phone: initialData?.phone || '',
      postalCode: initialData?.postalCode || '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(
        type === 'edit' ? 'Updating location...' : 'Adding location...',
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
          {type === 'edit' ? 'Edit Location' : 'Add Location'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            {[
              'locationName',
              'address',
              'city',
              'state',
              'phone',
              'postalCode',
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
              {type === 'edit' ? 'Update Location' : 'Add Location'}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LocationModal;
