import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
} from '@chakra-ui/react';

const DeleteModal = ({ isOpen, onClose, onDelete, itemId = '' }) => {
    // Handler for deleting the item
    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
        onClose(); // Close the modal after deletion
    };

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
                <ModalHeader color="red.500">Delete Confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you sure you want to delete {itemId}?</Text>
                    <Text mt={2} color="gray.500">
                        This action cannot be undone.
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" colorScheme="teal" onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleDelete}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteModal;
