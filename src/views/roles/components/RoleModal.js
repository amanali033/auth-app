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

const RoleModal = ({ isOpen, onClose, type = 'add', initialData = {} }) => {
  const validationSchema = Yup.object().shape({
    roleName: Yup.string().required('Location Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      roleName: initialData?.roleName || '',

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
          {type === 'edit' ? 'Edit Role' : 'Create New Clinic Role'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            {[
              'roleName',
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
              {type === 'edit' ? 'Update Role' : 'Create Role'}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RoleModal;
