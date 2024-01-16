import React, { useState } from 'react';
import {
  Box,
  Text,
  Input,
  Textarea,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useEditTodo } from '../query/Todos';

// Define the TodoDTO interface
interface TodoDTO {
  id: number;
  name: string;
  description: string;
}

const TodoContainer = styled(Box)`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Todo: React.FC<TodoDTO> = ({ id, name, description }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const { mutateAsync: editTodo } = useEditTodo()

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    setEditing(false);
    // You can implement saving the edited name and description here
    editTodo({ id, name: editedName, description: editedDescription })
  };

  return (
    <TodoContainer>
      <Text fontSize="xl" fontWeight="bold">
        {isEditing ? (
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleSaveEdit}
          />
        ) : (
          name
        )}
        <IconButton
          aria-label="Edit"
          icon={<EditIcon />}
          colorScheme="blue"
          onClick={handleEditClick}
          size="sm"
          ml={2}
        />
      </Text>
      {isEditing ? (
        <Textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onBlur={handleSaveEdit}
        />
      ) : (
        <Text>{description}</Text>
      )}
    </TodoContainer>
  );
};

export default Todo;
