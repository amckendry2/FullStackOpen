import styled from 'styled-components'

export const Input = styled.input`
	background: #f5f5f5;
	margin: 3px;
	border-radius: 4px;
	width: 130px;
`

export const Button = styled.button`
	border: 1px solid black;
	background-color: pink;
	margin: 4px;
	padding: 3px;
`
export const InputForm = styled.form`
	padding: 0;
`

export const Header = styled.p`
	text-align: center;
	font-size: 30px;
	margin: 0px;
	padding: 10px;
`

export const Panel = styled.div`
	border: 2px solid #c2b0c1;
	border-radius: 13px;
	padding: 8px;
	box-shadow: 4px 4px 8px 1px lightgrey;
`

export const PageHeader = styled.div`
`

export const PageTitle = styled.div`
	float: left;
	font-weight: bold;
	background-color: pink;
	text-align: center;
	font-size: 30px;
	height: 40px;
	line-height: 40px;
	padding: 0px 10px;
	border: 1px solid black;
`

export const NavBar = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	height: 41px;
	font-style: italic;
`

export const NavItem = styled.li`
	display: inline-block;
	border: 1px solid black;
	background-color: #c2b0c1;
	&:hover {
		background-color: white;
	}
	a {
		text-decoration: none;
		display: block;
		color: black;
		text-align: center;
		line-height: 30px;	
	}
`

