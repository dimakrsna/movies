import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ListLink = styled(Link)`
  display: inline-block;
`

export const ListItem = styled.li`
  list-style-type: none;
`

export const ListWrapper = styled.ul``

export const FormWrapper = styled.form`
  padding: 30px 40px 20px;
`

export const SearchInput = styled.input`
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  line-height: 30px;
  padding: 0 10px;
  outline: none;
  margin-right: 10px;
`