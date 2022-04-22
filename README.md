# Locations Challenge

This is a solution for the Locations Challenge.
- The project is a pure typescript react/next application without any additional libraries.
- The Locations page is at the http://localhost:3000/locations url.
- To avoid CORS the api provided is proxied.
- All tests are under the **tests** folder.
- The screenshots requested are in the root folder.

## The solution

The InfiniteScroll works with the **useIntersect** hook which uses an **IntersectionObserver** to trigger the api.

## The project

The app uses the *Inversion Of Control* pattern to create all the services needed.
These services are contained in the **IOCContainer** class and they are:
- **Rest**: which provides an augmented "fetch" with a baseURL included
- **I18n**: which provides a simple internationaliztion mechanism
- **Apis**: which provides all the apis of the app

The IOCContainer is injected in the React application through the Context APIs.
It's possible to use the container inside the "**getServerSideProps**" api using the high order function "**withServerSideContainer**" (see the locations.tsx page)

Under the styles folder it's possible to set some css variable.
The classes file provides some css shorthands similar to "Tailwind".

Components' styles simulate the css-module mechanism (appending an unique identifier to the class name).
In order to easily create an unique identidier for the classes, you can use the **randomgen** script under **/support**. (i.e. *./randomgen 4*  generates a 4-digit identifier every 5 seconds).


## Usage

    yarn install //Install dependencies
    yarn dev //Start project
    yarn test //Run tests
