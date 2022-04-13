# Concept Review
In this Template you will find examples of usages of custom components and hooks with pure Javascript.
## Roles & Permissions
- To add new `roles` check `src/shared/Navbar/sidebar.js`
- To change the `permissions` check the `src/App.js` and change the `CustomToolbar` for each component you will apply the new `rule`
## Theme, Colors & Language
In this Template each `employee` has a object nested in the db, wich includes all the mentioned aboved, in order to change that you will need to change the logic in the Backend.

The initial call is made by the `authProvider` once logged in and using the function `getIdentity()` is refreshed by the `CustomLayout` each time the localStorage changes, this is not a React State change is a cheap workaround forcing the Layout component to refresh.
## Authorization
By default the App will try to refresh the `token` once get a `401` code from the API, to change the expiration and token persistance you need to check the Backend auth endpoints.
## Docs
[React Admin Docs](https://marmelab.com/react-admin/Readme.html)
### Standalone App
If you want run this application as a Standalone client, you need the check the instructions in the docs folder and change in the config file.