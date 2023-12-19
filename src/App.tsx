import { useRef, useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Button,
  Input,
  Text,
  StackDivider,
} from '@chakra-ui/react';
import Todo from './components/Todo';
import { TodoDTO, useAddTodo, useGetTodos } from './query/Todos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Sample data for testing
// const initialTodos: TodoDTO[] = [
//   { id: 1, title: 'Task 1', description: 'Description for Task 1' },
//   { id: 2, title: 'Task 2', description: 'Description for Task 2' },
// ];

const Home = (): JSX.Element => {
  const { data: todos } = useGetTodos({ queryKey: ['todos'] }) 
  const { mutateAsync: postTodo } = useAddTodo()
  const [newTodo, setNewTodo] = useState<TodoDTO>({
    id: 0,
    title: '',
    description: '',
  });

  const addTodo = () => {
    postTodo(newTodo)
  };

  return (
    <Box p={8} >
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
      >
        <Text fontSize="2xl">Todo List</Text>
        <VStack align="stretch" spacing={2}>
          <Input
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) =>
              setNewTodo({ ...newTodo, title: e.target.value })
            }
          />
          <Input
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
          <Button colorScheme="blue" onClick={addTodo}>
            Add Todo
          </Button>
        </VStack>
        <Text fontSize="xl">Todo Items:</Text>
        <VStack align="stretch" spacing={2}>
          {todos?.map((todo) => (
            <Todo {...todo} />
          ))}
        </VStack>
      </VStack>
    </Box>
  )
}

function App() {
  const queryClient = useRef(new QueryClient())

  return (
    <QueryClientProvider client={queryClient.current}>
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
