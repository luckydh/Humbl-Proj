import { PaymentMethodCategory } from "generated/graphql";

export const CreditCard = {
  id: "0123",
  lastFour: "0123",
  expirationDate: "12/02/2034",
  name: "Johnny Tests",
  status: undefined,
  type: PaymentMethodCategory.Card,
  cardBrand: {
    display: "Visa",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzgwIiBoZWlnaHQ9IjUwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNzgwIDUwMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNzgwIDUwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDAsMGg3MDBjMjIuMDkyLDAsNDAsMTcuOTA5LDQwLDQwdjQyMGMwLDIyLjA5Mi0xNy45MDgsNDAtNDAsNDBINDBjLTIyLjA5MSwwLTQwLTE3LjkwOC00MC00MFY0MCAgIEMwLDE3LjkwOSwxNy45MDksMCw0MCwweiIgZmlsbD0iIzBFNDU5NSIvPjxwYXRoIGQ9Im0yOTMuMiAzNDguNzNsMzMuMzYxLTE5NS43Nmg1My4zNmwtMzMuMzg1IDE5NS43NmgtNTMuMzM2em0yNDYuMTEtMTkxLjU0Yy0xMC41Ny0zLjk2Ni0yNy4xMzctOC4yMjItNDcuODIyLTguMjIyLTUyLjcyNSAwLTg5Ljg2NSAyNi41NS05MC4xOCA2NC42MDMtMC4yOTkgMjguMTMgMjYuNTE0IDQzLjgyMiA0Ni43NTIgNTMuMTg2IDIwLjc3MSA5LjU5NSAyNy43NTIgMTUuNzE0IDI3LjY1NCAyNC4yODMtMC4xMzEgMTMuMTIxLTE2LjU4NiAxOS4xMTYtMzEuOTIyIDE5LjExNi0yMS4zNTcgMC0zMi43MDMtMi45NjctNTAuMjI3LTEwLjI3NmwtNi44NzYtMy4xMS03LjQ4OSA0My44MjNjMTIuNDYzIDUuNDY0IDM1LjUxIDEwLjE5OCA1OS40MzggMTAuNDQzIDU2LjA5IDAgOTIuNS0yNi4yNDYgOTIuOTE2LTY2Ljg4MiAwLjE5OS0yMi4yNjktMTQuMDE2LTM5LjIxNi00NC44MDEtNTMuMTg4LTE4LjY1LTkuMDU1LTMwLjA3Mi0xNS4wOTktMjkuOTUxLTI0LjI2OCAwLTguMTM3IDkuNjY4LTE2LjgzOSAzMC41NTctMTYuODM5IDE3LjQ0OS0wLjI3IDMwLjA5IDMuNTM1IDM5LjkzOCA3LjVsNC43ODEgMi4yNiA3LjIzMi00Mi40MjltMTM3LjMxLTQuMjIzaC00MS4yMzJjLTEyLjc3MyAwLTIyLjMzMiAzLjQ4Ny0yNy45NDEgMTYuMjM0bC03OS4yNDQgMTc5LjRoNTYuMDMxczkuMTYtMjQuMTIzIDExLjIzMi0yOS40MThjNi4xMjUgMCA2MC41NTUgMC4wODQgNjguMzM4IDAuMDg0IDEuNTk2IDYuODUzIDYuNDkgMjkuMzM0IDYuNDkgMjkuMzM0aDQ5LjUxNGwtNDMuMTg4LTE5NS42NHptLTY1LjQxOCAxMjYuNDFjNC40MTItMTEuMjc5IDIxLjI2LTU0LjcyMyAyMS4yNi01NC43MjMtMC4zMTYgMC41MjIgNC4zNzktMTEuMzM0IDcuMDc0LTE4LjY4NGwzLjYwNSAxNi44NzlzMTAuMjE5IDQ2LjcyOSAxMi4zNTQgNTYuNTI4aC00NC4yOTN6bS0zNjMuMy0xMjYuNDFsLTUyLjI0IDEzMy41LTUuNTY3LTI3LjEzYy05LjcyNS0zMS4yNzMtNDAuMDI1LTY1LjE1NS03My44OTgtODIuMTE4bDQ3Ljc2NiAxNzEuMiA1Ni40NTYtMC4wNjQgODQuMDA0LTE5NS4zOWgtNTYuNTIxIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTE0Ni45MiAxNTIuOTZoLTg2LjA0MWwtMC42ODEgNC4wNzNjNjYuOTM4IDE2LjIwNCAxMTEuMjMgNTUuMzYzIDEyOS42MiAxMDIuNDFsLTE4LjcxLTg5Ljk2Yy0zLjIzLTEyLjM5NS0xMi41OTctMTYuMDk0LTI0LjE4Ni0xNi41MjciIGZpbGw9IiNGMkFFMTQiLz48L3N2Zz4=",
  },
};

export const CardBrandsObject = {
  visa: CreditCard,
  amex: {
    ...CreditCard,
    id: "4567",
    cardBrand: {
      id: "amex",
      display: "Amex",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzgwIiBoZWlnaHQ9IjUwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNzgwIDUwMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNzgwIDUwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDAsMGg3MDBjMjIuMDkyLDAsNDAsMTcuOTA5LDQwLDQwdjQyMGMwLDIyLjA5Mi0xNy45MDgsNDAtNDAsNDBINDBjLTIyLjA5MSwwLTQwLTE3LjkwOC00MC00MFY0MCAgIEMwLDE3LjkwOSwxNy45MDksMCw0MCwweiIgZmlsbD0iIzBFNDU5NSIvPjxwYXRoIGQ9Im0yOTMuMiAzNDguNzNsMzMuMzYxLTE5NS43Nmg1My4zNmwtMzMuMzg1IDE5NS43NmgtNTMuMzM2em0yNDYuMTEtMTkxLjU0Yy0xMC41Ny0zLjk2Ni0yNy4xMzctOC4yMjItNDcuODIyLTguMjIyLTUyLjcyNSAwLTg5Ljg2NSAyNi41NS05MC4xOCA2NC42MDMtMC4yOTkgMjguMTMgMjYuNTE0IDQzLjgyMiA0Ni43NTIgNTMuMTg2IDIwLjc3MSA5LjU5NSAyNy43NTIgMTUuNzE0IDI3LjY1NCAyNC4yODMtMC4xMzEgMTMuMTIxLTE2LjU4NiAxOS4xMTYtMzEuOTIyIDE5LjExNi0yMS4zNTcgMC0zMi43MDMtMi45NjctNTAuMjI3LTEwLjI3NmwtNi44NzYtMy4xMS03LjQ4OSA0My44MjNjMTIuNDYzIDUuNDY0IDM1LjUxIDEwLjE5OCA1OS40MzggMTAuNDQzIDU2LjA5IDAgOTIuNS0yNi4yNDYgOTIuOTE2LTY2Ljg4MiAwLjE5OS0yMi4yNjktMTQuMDE2LTM5LjIxNi00NC44MDEtNTMuMTg4LTE4LjY1LTkuMDU1LTMwLjA3Mi0xNS4wOTktMjkuOTUxLTI0LjI2OCAwLTguMTM3IDkuNjY4LTE2LjgzOSAzMC41NTctMTYuODM5IDE3LjQ0OS0wLjI3IDMwLjA5IDMuNTM1IDM5LjkzOCA3LjVsNC43ODEgMi4yNiA3LjIzMi00Mi40MjltMTM3LjMxLTQuMjIzaC00MS4yMzJjLTEyLjc3MyAwLTIyLjMzMiAzLjQ4Ny0yNy45NDEgMTYuMjM0bC03OS4yNDQgMTc5LjRoNTYuMDMxczkuMTYtMjQuMTIzIDExLjIzMi0yOS40MThjNi4xMjUgMCA2MC41NTUgMC4wODQgNjguMzM4IDAuMDg0IDEuNTk2IDYuODUzIDYuNDkgMjkuMzM0IDYuNDkgMjkuMzM0aDQ5LjUxNGwtNDMuMTg4LTE5NS42NHptLTY1LjQxOCAxMjYuNDFjNC40MTItMTEuMjc5IDIxLjI2LTU0LjcyMyAyMS4yNi01NC43MjMtMC4zMTYgMC41MjIgNC4zNzktMTEuMzM0IDcuMDc0LTE4LjY4NGwzLjYwNSAxNi44NzlzMTAuMjE5IDQ2LjcyOSAxMi4zNTQgNTYuNTI4aC00NC4yOTN6bS0zNjMuMy0xMjYuNDFsLTUyLjI0IDEzMy41LTUuNTY3LTI3LjEzYy05LjcyNS0zMS4yNzMtNDAuMDI1LTY1LjE1NS03My44OTgtODIuMTE4bDQ3Ljc2NiAxNzEuMiA1Ni40NTYtMC4wNjQgODQuMDA0LTE5NS4zOWgtNTYuNTIxIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTE0Ni45MiAxNTIuOTZoLTg2LjA0MWwtMC42ODEgNC4wNzNjNjYuOTM4IDE2LjIwNCAxMTEuMjMgNTUuMzYzIDEyOS42MiAxMDIuNDFsLTE4LjcxLTg5Ljk2Yy0zLjIzLTEyLjM5NS0xMi41OTctMTYuMDk0LTI0LjE4Ni0xNi41MjciIGZpbGw9IiNGMkFFMTQiLz48L3N2Zz4=",
    },
  },
};

export const CardWithAddress = {
  ...CreditCard,
  cityAddress: "TestCity",
  country: "us",
  PostalAddress: "Test-123",
  region: "JS",
  streetAddress: "1234 Test St.",
  streetAdditional: "Unit #Test",
};
