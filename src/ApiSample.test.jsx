import { render, screen } from '@testing-library/react'
import { beforeEach, afterEach, vi } from 'vitest'
import ApiSample from './ApiSample'

describe('ApiSample', () => {
  beforeEach(() => {
    // 毎回 fetch を差し替える
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('読み込み中は「読み込み中…」が表示される', () => {
    // fetch が永遠に返らないPromiseを返すようにする
    globalThis.fetch.mockReturnValue(new Promise(() => {}))
    render(<ApiSample />)
    expect(screen.getByText('読み込み中…')).toBeInTheDocument()
  })

  it('取得成功時にリストが表示される', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, title: 'A', completed: false },
        { id: 2, title: 'B', completed: true },
      ],
    })

    render(<ApiSample />)

    // 非同期に現れる要素は findBy で待つ
    expect(await screen.findByText(/A/)).toBeInTheDocument()
    expect(screen.getByText(/B/)).toBeInTheDocument()
  })

  it('通信失敗時にエラーが表示される', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: false,
    })

    render(<ApiSample />)

    expect(await screen.findByText(/エラー/)).toBeInTheDocument()
  })

  it('ネットワーク例外時にもエラー表示される', async () => {
    globalThis.fetch.mockRejectedValue(new Error('network down'))

    render(<ApiSample />)

    expect(await screen.findByText('エラー：network down')).toBeInTheDocument()
  })
})