# Humble Consumer

## Libraries used

- React-router-dom
  - For routing
- Apollo Client
  - For graphql queries
- React Hook Form
  - Form/input management and control
- RecoilJS for basic state management.
  - No need to use redux or something complicated for the time being...
- Capacitor
  - Cross-platform runtime for web apps that run natively on iOS, Andriod, and the Web.
  - For more info refer to the <a href="https://capacitorjs.com/docs/getting-started/dependencies">Capacitor Docs</a>.

## Getting Started
View latest onboarding documentation here:
[Engineering FE Onboarding Doc](https://humblpay.atlassian.net/wiki/spaces/EN/pages/509640705/FE+Onboarding+Documentation)

First, pull latest and run this command:

`npm start`

To Run Storybook:

`npm storybook`

### Android Development

#### Requirements

- <a href="">Andriod Studio</a>
- For more info on installation and getting started refer to the <a href="https://capacitorjs.com/docs/android">Capacitor Android Docs</a>.

### iOS

#### Requirements

- Xcode 11
- Xcode command line tools
- For more info on installation and getting started refer to the <a href="https://capacitorjs.com/docs/ios">Capacitor iOS Docs</a>.

## Generating graphql types based on server schema

`npm generate`

## Generating snapshots for tests

`npm test -u`
