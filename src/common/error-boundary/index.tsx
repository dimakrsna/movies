import React from 'react'
import { PageWrapper, Title } from './styles'

interface State {
  hasError: boolean
}

interface Props {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<Props, State> {

  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <PageWrapper>
          <Title>Something went wrong</Title>
        </PageWrapper>
      )
    }

    return this.props.children
  }
}