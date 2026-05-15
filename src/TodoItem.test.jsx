import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem'
import { expect, it } from 'vitest'

describe('TodoItem',()=>{
    it('textが画面に表示される', ()=>{
        const todo = {id:1, text:'牛乳を買う', completed:false}
        render(<TodoItem todo={todo} onDelete={()=>{}} />)
        expect(screen.getByText('牛乳を買う')).toBeInTheDocument()
    })

    it('削除ボタンが存在する', ()=>{
        const todo = {id:1,text:'テスト', completed:false}
        render(<TodoItem todo={todo} onDelete={()=>{}} />)
        expect(screen.getByRole('button', {name: '削除'})).toBeInTheDocument()
    })

    it('completedがtrueなら打ち消し線スタイルが当たる', ()=>{
        const todo = {id:1, text:'done', completed:true}
        render(<TodoItem todo={todo} onDelete={()=>{}}/>)
        const text = screen.getByText('done')
        expect(text).toHaveStyle({textDecoration: 'line-through'})
    })

    it('completedがfalseなら打ち消し線は当たらない', ()=>{
        const todo = {id:1, text:'todo', completed:false}
        render(<TodoItem todo={todo} onDelete={()=>{}}/>)
        const text = screen.getByText('todo')
        expect(text).toHaveStyle({textDecoration: 'none'})
    })

    it('checkboxの判定 チェックされてない',()=>{
        const todo = {id:1, text:'check', completed:false}
        render(<TodoItem todo={todo} onDelete={()=>{}}/>)
        const check = screen.getByRole('checkbox')
        expect(check).not.toBeChecked()
    })

    it('checkboxの判定 チェックされてる', ()=>{
        const todo = {id:1, text:'check', completed:true}
        render(<TodoItem todo={todo} onDelete={()=>{}}/>)
        const check = screen.getByRole('checkbox')
        expect(check).toBeChecked()
    })
})

describe('TodoItem の削除ボタン', () => {
  it('削除ボタンを押すと onDelete が id 付きで呼ばれる', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    const todo = { id: 42, text: 'テスト', completed: false }

    render(<TodoItem todo={todo} onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: '削除' }))

    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(42)
  })
})