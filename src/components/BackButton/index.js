import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ ...rest }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Button
            className='backBtn'
            leftIcon={<Icon as={HiArrowLeft} style={{ margin: "0px !important" }} />}
            colorScheme="brand"
            variant="solid"
            onClick={handleBack}
            borderRadius="50%"
            paddingInline="0px"
            mb={4}
            {...rest}
        />
    );
};

export default BackButton;
