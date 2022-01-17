import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from '../components/BlogForm'

describe('<BlogForm/>', () => {
    const mockHandler = jest.fn()

    test('handler called with inputted data', () => {
        const component = render (
            <BlogForm handleNewBlog={mockHandler}/>
        )
        const titleInput = component.container.querySelector('#title')
        const authorInput = component.container.querySelector('#author')
        const urlInput = component.container.querySelector('#url')

        const form = component.container.querySelector('form')

        fireEvent.change(titleInput, {
            target: { value: 'test title' }
        })

        fireEvent.change(authorInput, {
            target: { value: 'test author' }
        })

        fireEvent.change(urlInput, {
            target: { value: 'test url' }
        })

        fireEvent.submit(form)

        expect(mockHandler.mock.calls[0][0].title).toBe('test title')
        expect(mockHandler.mock.calls[0][0].author).toBe('test author')
        expect(mockHandler.mock.calls[0][0].url).toBe('test url')
    })
})