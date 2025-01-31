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

const StatusModal = ({ isOpen, onClose, type = 'add', endpoint = 'lab_case', initialData = {} }) => {
  console.log("StatusModal ~ endpoint:", endpoint)
  const validationSchema = Yup.object().shape({
    statusName: Yup.string().required('Status Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      statusName: initialData?.statusName || '',

    },
    validationSchema,
    onSubmit: (values) => {
      console.log(
        'Adding location...',
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
          Add New Status
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            {[
              'statusName',
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
              Add Status
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StatusModal;
