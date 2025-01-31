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
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTrashAlt } from 'react-icons/fa';

export const ProceduresModal = ({
  isOpen,
  onClose,
  type = 'add',
  initialData = {},
}) => {
  // State for procedure options and steps
  const [procedureOptions, setProcedureOptions] = useState(
    initialData?.procedureOptions || [],
  );
  const [procedureSteps, setProcedureSteps] = useState(
    initialData?.procedureSteps || [],
  );
  const [selectedTab, setSelectedTab] = useState('options'); // For switching between procedure options and procedure steps

  // Validation Schema
  const validationSchema = Yup.object().shape({
    procedureName: Yup.string().required('Procedure Name is required'),
    code: Yup.string().required('Code is required'),
    cost: Yup.number().required('Cost is required'),
    procedureOptions: Yup.array().of(
      Yup.object().shape({
        optionName: Yup.string().required('Option Name is required'),
        additionalCost: Yup.number().required('Additional Cost is required'),
      }),
    ),
    procedureSteps: Yup.array().of(
      Yup.object().shape({
        stepNumber: Yup.number().required('Step Number is required'),
        stepName: Yup.string().required('Step Name is required'),
        stepDescription: Yup.string().required('Step Description is required'),
        price: Yup.number().required('Price is required'),
      }),
    ),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      procedureName: initialData?.procedureName || '',
      code: initialData?.code || '',
      cost: initialData?.cost || '',
      procedureOptions: procedureOptions,
      procedureSteps: procedureSteps,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(
        type === 'edit' ? 'Updating procedure...' : 'Adding procedure...',
        values,
      );
      onClose();
    },
  });

  // Add Procedure Option
  const addProcedureOption = () => {
    setProcedureOptions([
      ...procedureOptions,
      { optionName: '', additionalCost: '' },
    ]);
  };

  // Remove Procedure Option
  const removeProcedureOption = (index) => {
    setProcedureOptions(procedureOptions.filter((_, i) => i !== index));
  };

  // Add Procedure Step
  const addProcedureStep = () => {
    setProcedureSteps([
      ...procedureSteps,
      { stepNumber: '', stepName: '', stepDescription: '', price: '' },
    ]);
  };

  // Remove Procedure Step
  const removeProcedureStep = (index) => {
    setProcedureSteps(procedureSteps.filter((_, i) => i !== index));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="16px"
        pb="16px"
        maxWidth={{ base: '90%', md: '500px' }}
        maxH="90vh"
        overflowY="auto"
      >
        <ModalHeader color="brand.500">
          {type === 'edit' ? 'Edit Procedure' : 'Add New Procedure'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            {/* Procedure Name Field */}
            <FormControl
              isInvalid={
                formik.touched.procedureName && formik.errors.procedureName
              }
              mb={2}
            >
              <FormLabel mb={0}>Procedure Name</FormLabel>
              <Input
                name="procedureName"
                placeholder="Enter Procedure Name"
                variant="auth"
                fontSize="sm"
                fontWeight="500"
                value={formik.values.procedureName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.procedureName && formik.errors.procedureName && (
                <Text color="red.500" fontSize="sm">
                  {formik.errors.procedureName}
                </Text>
              )}
            </FormControl>
            <FormControl
              isInvalid={formik.touched.code && formik.errors.code}
              mb={2}
            >
              <FormLabel mb={0}>Code</FormLabel>
              <Input
                name="code"
                placeholder="Enter Code"
                variant="auth"
                fontSize="sm"
                fontWeight="500"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.code && formik.errors.code && (
                <Text color="red.500" fontSize="sm">
                  {formik.errors.code}
                </Text>
              )}
            </FormControl>
            <FormControl
              isInvalid={formik.touched.cost && formik.errors.cost}
              mb={2}
            >
              <FormLabel mb={0}>Cost</FormLabel>
              <Input
                name="cost"
                placeholder="Enter Cost"
                variant="auth"
                fontSize="sm"
                fontWeight="500"
                value={formik.values.cost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cost && formik.errors.cost && (
                <Text color="red.500" fontSize="sm">
                  {formik.errors.cost}
                </Text>
              )}
            </FormControl>

            {/* Procedure Tabs */}
            <Stack direction="row" spacing={4} my={4}>
              <Button
                onClick={() => setSelectedTab('options')}
                colorScheme={selectedTab === 'options' ? 'brand' : 'teal'}
                w="50%"
              >
                Procedure Options
              </Button>
              <Button
                onClick={() => setSelectedTab('steps')}
                colorScheme={selectedTab === 'steps' ? 'brand' : 'teal'}
                w="50%"
              >
                Procedure Steps
              </Button>
            </Stack>

            {/* Procedure Options */}
            {selectedTab === 'options' && (
              <>
                {procedureOptions.map((option, index) => (
                  <Stack
                    key={index}
                    spacing={3}
                    mb={3}
                    border="1px solid #E3E7EA"
                    p={4}
                    borderRadius="16px"
                  >
                    <FormControl
                      isInvalid={
                        formik.touched.procedureOptions?.[index]?.optionName &&
                        formik.errors.procedureOptions?.[index]?.optionName
                      }
                    >
                      <FormLabel>Option Name</FormLabel>
                      <Input
                        name={`procedureOptions[${index}].optionName`}
                        placeholder="Enter Option Name"
                        variant="auth"
                        fontSize="sm"
                        fontWeight="500"
                        value={
                          formik.values.procedureOptions[index]?.optionName ||
                          ''
                        }
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.procedureOptions?.[index]
                          ?.additionalCost &&
                        formik.errors.procedureOptions?.[index]?.additionalCost
                      }
                    >
                      <FormLabel>Additional Cost</FormLabel>
                      <Input
                        name={`procedureOptions[${index}].additionalCost`}
                        type="number"
                        placeholder="Enter Additional Cost"
                        variant="auth"
                        fontSize="sm"
                        fontWeight="500"
                        value={
                          formik.values.procedureOptions[index]
                            ?.additionalCost || ''
                        }
                        onChange={formik.handleChange}
                      />
                    </FormControl>

                    <Button
                      colorScheme="red"
                      onClick={() => removeProcedureOption(index)}
                    >
                      <FaTrashAlt style={{ marginRight: 5 }} /> Remove
                    </Button>
                  </Stack>
                ))}
                <Button onClick={addProcedureOption} colorScheme="blue" mb={4}>
                  Add Option
                </Button>
              </>
            )}

            {/* Procedure Steps */}
            {selectedTab === 'steps' && (
              <>
                {procedureSteps.map((step, index) => (
                  <Stack
                    key={index}
                    spacing={3}
                    mb={3}
                    border="1px solid #E3E7EA"
                    p={4}
                    borderRadius="16px"
                  >
                    <FormControl
                      isInvalid={
                        formik.touched.procedureSteps?.[index]?.stepNumber &&
                        formik.errors.procedureSteps?.[index]?.stepNumber
                      }
                    >
                      <FormLabel>Step Number</FormLabel>
                      <Input
                        name={`procedureSteps[${index}].stepNumber`}
                        type="number"
                        placeholder="Enter Step Number"
                        variant="auth"
                        fontSize="sm"
                        fontWeight="500"
                        value={
                          formik.values.procedureSteps[index]?.stepNumber || ''
                        }
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.procedureSteps?.[index]?.stepName &&
                        formik.errors.procedureSteps?.[index]?.stepName
                      }
                    >
                      <FormLabel>Step Name</FormLabel>
                      <Input
                        name={`procedureSteps[${index}].stepName`}
                        placeholder="Enter Step Name"
                        variant="auth"
                        fontSize="sm"
                        fontWeight="500"
                        value={
                          formik.values.procedureSteps[index]?.stepName || ''
                        }
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.procedureSteps?.[index]
                          ?.stepDescription &&
                        formik.errors.procedureSteps?.[index]?.stepDescription
                      }
                    >
                      <FormLabel>Step Description</FormLabel>
                      <Input
                        name={`procedureSteps[${index}].stepDescription`}
                        placeholder="Enter Step Description"
                        variant="auth"
                        fontSize="sm"
                        fontWeight="500"
                        value={
                          formik.values.procedureSteps[index]
                            ?.stepDescription || ''
                        }
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.procedureSteps?.[index]?.price &&
                        formik.errors.procedureSteps?.[index]?.price
                      }
                    >
                      <FormLabel>Price</FormLabel>
                      <Input
                        name={`procedureSteps[${index}].price`}
                        type="number"
                        placeholder="Enter Price"
                        variant="auth"
                        fontSize="sm"
                        fontWeight="500"
                        value={formik.values.procedureSteps[index]?.price || ''}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <Button
                      colorScheme="red"
                      onClick={() => removeProcedureStep(index)}
                    >
                      <FaTrashAlt style={{ marginRight: 5 }} /> Remove
                    </Button>
                  </Stack>
                ))}
                <Button onClick={addProcedureStep} colorScheme="blue" mb={4}>
                  Add Step
                </Button>
              </>
            )}

            <Button type="submit" colorScheme="brand" w="100%" mt={4}>
              {type === 'edit' ? 'Edit Procedure' : 'Add New Procedure'}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
