import React from 'react'
import { useHistory } from "react-router-dom"
import {
  PageWrapper,
  Title,
  Description
} from './styles'
import { Button } from './../../common/styles'

export const Page404 = () => {
  const history = useHistory()

  return (
    <PageWrapper>
      <Title>404</Title>
      <Description>Sorry, such page does not exist</Description>
      <Button onClick={() => history.push("/")}>Go to index</Button>
    </PageWrapper>
  )
}
