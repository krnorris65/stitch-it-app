# Stitch-It App

Web application that allows users to keep track of their own cross stitch projects as well as follow other users and see their cross stitch projects. Created with React Hooks, React Context API, Cloudinary and utilizing JSON-server for storing data

### *Prerequisites*: Before running this app locally, you need to complete the below steps:
1) Install `nss-json-server` globally
`npm i -g nss-json-server`

1) Create an account with Cloudinary and in settings create a new upload preset; make sure the mode is 'unsigned'. After you've created a Cloudinary account, use the `CloudinaryInfo.js.example` file to create a `CloundinaryInfo.js` file in the `src/components/design` directory.

1) Use `database.json.example` to create a `database.json` file in the `api` directory,

### To run this app locally:
1) Clone repo
1) Complete the prerequisites listed above 
1) In your terminal, open two windows/tabs
1) In one tab, navigate to the `api` directory and run `nss-json-server -X 7h -p 5002 -w database.json`
1) In the other tab, run `npm start` from the root directory
1) Navigate to `localhost:3000` in your browser and register an account to begin using the app
