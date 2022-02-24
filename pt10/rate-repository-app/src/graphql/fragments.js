import { gql } from "@apollo/client"

export const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
    id
    ownerAvatarUrl
    description
    language
    stargazersCount
    reviewCount
    ratingAverage
    fullName
    forksCount
    url
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on ReviewConnection {
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
        repository{
          id
          fullName
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
`