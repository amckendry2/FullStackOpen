import { gql } from '@apollo/client'
import { REPO_DETAILS, REVIEW_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
	query repositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String
  ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword
      first: $first,
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepoDetails
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
	}
  ${REPO_DETAILS}
`

export const GET_SINGLE_REPOSITORY = gql`
  query repository(
    $repositoryId: ID!,
    $reviewsFirst: Int
    $reviewsAfter: String
  ) {
    repository(id: $repositoryId) {
      ...RepoDetails
      reviews(first: $reviewsFirst, after: $reviewsAfter) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
             id
             username 
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPO_DETAILS}
`

export const GET_ME = gql`
  query Query($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        ...ReviewDetails
      }
    }
  }
  ${REVIEW_DETAILS}
`