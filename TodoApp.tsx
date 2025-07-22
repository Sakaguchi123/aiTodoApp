import React from 'react';
import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';

interface Todo {
  id: number;
  text: string;
}

export const todosAtom = atom<Todo[]>([]);

const schema = z.object({
  input: z.string().min(1, { message: '1文字以上入力してください' }).max(100, { message: '100文字以内で入力してください' }),
});

type FormData = z.infer<typeof schema>;

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const addTodo = (data: FormData) => {
    setTodos([...todos, { id: Date.now(), text: data.input.trim() }]);
    reset();
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">TODOリスト</h1>
        <form onSubmit={handleSubmit(addTodo)} className="flex gap-2 mb-6">
          <input
            type="text"
            className={`flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.input ? 'border-red-400' : 'border-indigo-300'}`}
            placeholder="新しいTODOを入力..."
            {...register('input')}
            aria-invalid={!!errors.input}
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 flex items-center transition-colors"
            aria-label="追加"
          >
            <AiOutlinePlus size={20} />
          </button>
        </form>
        {errors.input && (
          <p className="text-red-500 text-xs mb-2">{errors.input.message}</p>
        )}
        <ul className="space-y-3">
          {todos.length === 0 && (
            <li className="text-gray-400 text-center">TODOはありません</li>
          )}
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between bg-indigo-50 px-4 py-2 rounded-lg shadow-sm">
              <span className="text-indigo-800 break-all">{todo.text}</span>
              <button
                className="text-red-400 hover:text-red-600 transition-colors ml-2"
                onClick={() => deleteTodo(todo.id)}
                aria-label="削除"
              >
                <AiOutlineDelete size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
