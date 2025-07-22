import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import TodoApp from './TodoApp';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { todosAtom } from './TodoApp';
import { getDefaultStore } from 'jotai';

const store = getDefaultStore();

describe('TodoApp', () => {
  beforeEach(() => {
    store.set(todosAtom, []);
  });
  afterEach(() => {
    cleanup();
  });
  it('初期状態でTODOリストが空であること', () => {
    render(<TodoApp />);
    expect(screen.getByText('TODOはありません')).toBeInTheDocument();
  });

  it('TODOを追加できること', async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('新しいTODOを入力...');
    fireEvent.change(input, { target: { value: 'テストTODO' } });
    fireEvent.submit(input.closest('form')!);
    expect(await screen.findByText('テストTODO')).toBeInTheDocument();
  });

  it('TODOを削除できること', async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('新しいTODOを入力...');
    fireEvent.change(input, { target: { value: '削除TODO' } });
    fireEvent.submit(input.closest('form')!);
    // 削除ボタンを非同期で取得
    const deleteBtns = await screen.findAllByLabelText('削除');
    fireEvent.click(deleteBtns[0]);
    expect(screen.queryByText('削除TODO')).not.toBeInTheDocument();
  });
});
