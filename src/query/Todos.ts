import { type UseQueryResult, useQuery, UseMutationResult, useQueryClient, useMutation, UndefinedInitialDataOptions } from "@tanstack/react-query"
import useClient from "../hooks/useClient"
import { AxiosError, AxiosResponse } from "axios"

export interface TodoDTO {
  id: number
  name: string
  description: string
}

export const useGetTodos = (options: UndefinedInitialDataOptions<AxiosResponse<TodoDTO[]>, AxiosError, TodoDTO[], string[]>): UseQueryResult<TodoDTO[]> => {
  const client = useClient()

  return useQuery({
    queryFn: async () => await client.get<TodoDTO[]>('/Todo'),
    select: ({ data }) => data,
    ...options
  })
}

export const useAddTodo = (): UseMutationResult<AxiosResponse<TodoDTO>, AxiosError, TodoDTO, unknown> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['addTodo'],
    mutationFn: async (todo: TodoDTO) => await client.post<TodoDTO, AxiosResponse<TodoDTO>, TodoDTO>('/Todo', todo),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['todos']
      })
    }
  })
}

export const useEditTodo = (): UseMutationResult<AxiosResponse<TodoDTO>, AxiosError, TodoDTO, unknown> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['addTodo'],
    mutationFn: async (todo: TodoDTO) => await client.put<TodoDTO, AxiosResponse<TodoDTO>, TodoDTO>('/Todo', todo),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['todos']
      })
    }
  })
}

export const useDeleteTodo = (): UseMutationResult<AxiosResponse, AxiosError, TodoDTO, unknown> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['addTodo'],
    mutationFn: async (todo: TodoDTO) => await client.delete(`/Todo/${todo.id}`),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['todos']
      })
    }
  })
}
