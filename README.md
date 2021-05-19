# Virtual Markers

Welcome to the Virtual Markers project !
-


It aims to be a self contained manager for everchanging browser tabs/urls, i-e series of URLs or aggregations of bookmarks (with additional details when the native bookmark system is too simplistic).
-

# Index

- [Setup](doc:linking-to-pages#section-Setup)
- [Organization](doc:linking-to-pages#section-Organization)
- [Functionalities](doc:linking-to-pages#section-functionalities)
- [About me](doc:linking-to-pages#section-About-me)


# Setup

## Install packages :
 `yarn install` (preferred), or `npm i`
-
## Run the app : 
`npx react-native run-windows` (requires windows dev tools) || `npx react-native run-ios` || `npx react-native run-android` 
-

# Organization : 
## Files : 
- Styles can be found in **_`src/style`_**; the theme is injected and additional style is contained in files.

- The database and it's backups can be found in **_`src/database`_** and **_`src/database/backups`_** respectively.

- The Redux ( `'@reduxjs/toolkit'` ) files can be found in **_`src/app`_** and **_`src/features`_**.

## Paths : 

This project uses Typescript & Babel custom paths (see `tsconfig.json` & `babel.config.js`).
-

Here are the currently available paths :

      @components*: ["./src/components/*"],

      @screens*:[ "./src/screens/*"],
      
      @stores*: ["./src/stores/*"],
      
      @utils*: ["./src/utils/*"],
      
      @services*: ["./src/services/*"],
      
      STYLE*: ["./src/style/*"],
      
      @assets*: ["./assets/*"],
      
      @constants*: ["./src/constants/*"]

if you wish to add additional custom paths but don't know how, it requires adding the path to TS and babel config files. 

Head over to [the RN Typescript documentation](https://github.com/reactnative.dev/docs/0.60/typescript#using-custom-path-aliases-with-typescript) to see how to implement this functionality in React-Native, and to [TS' paths documentation from the handbook](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) if you wish to further understand path mapping in Typescript.

# About me

I'm a french developer based in Marseille.