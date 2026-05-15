import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App 統合', () => {
  beforeEach(() => {
    // localStorage を毎テスト初期化（前のテストの影響を切る）
    localStorage.clear()
  })

  it('TODO を追加するとリストに表示される', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, '牛乳を買う')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(screen.getByText('牛乳を買う')).toBeInTheDocument()
  })

  it('追加→削除でリストから消える', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, '一時TODO')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(screen.getByText('一時TODO')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '削除' }))
    expect(screen.queryByText('一時TODO')).not.toBeInTheDocument()
  })
})