import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from '../components/Blog'

describe('<Blog/>', () => {

    const mockHandler = jest.fn()

    const blogData = {
        title: 'testTitle',
        author: 'author',
        url:'www.testurl.com',
        likes: 10,
        id: 'testid123',
        user: {
            id: 'abc123',
            username: 'testuser',
            name: 'joe schmoe'
        }
    }

    let component;

    beforeEach(() => {
        component = render(
            <Blog 
            blog={blogData} 
            handleAddLike={mockHandler} 
            handleDelete={mockHandler}
            />
        )        
    })

    test('details not visible by default', () => {
        expect(
            component.container.querySelector('.details')
        ).toHaveStyle('display: none')
    })

    test('clicking button displays and hides details', () => {
        const detailsDiv = component.container.querySelector('.details')
        const button = component.getByText('view')
        fireEvent.click(button)
        expect(detailsDiv).not.toHaveStyle('display: none')
        fireEvent.click(button)
        expect(detailsDiv).toHaveStyle('display: none')
    })

    test('clicking like button twice fires event twice', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

