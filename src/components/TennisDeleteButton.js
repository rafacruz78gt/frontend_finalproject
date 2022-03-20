import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export const DeleteButton = ( props ) => {
    const [isLoading, setLoading ] = useState(false);
    const deleteAction = props.deleteAction;
    const deleteId = props.id;
    const tid = props.tid;

    useEffect(() => {
        if(isLoading) {
            deleteAction(deleteId, tid).then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <Button
          //variant="primary"
          variant="danger"
          disabled={isLoading}
          onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Loading...' : 'Delete'}
        </Button>
    );
}

export default DeleteButton;