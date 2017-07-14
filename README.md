This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to work with Semantic-UI 
The project is using [React Semantic-UI](https://react.semantic-ui.com/) as a base for css.

To override the semantic's css custom [semantic-ui](https://semantic-ui.com/introduction/build-tools.html) build is used.

For build customization semantic-ui supports the __theming__ mechanism. Please refer [to this page](https://semantic-ui.com/usage/theming.html) for docs and tuturial how to theme your semantic-ui build.

The semantic build src is located in `./client/semantic/src/`. You may use a base theme from a bunch of predefined (change variable in `theme.less` file) and than override specifics of each component in `./site` directory.

Commands:

* `npm run build-semantic` - rebuild semantic-ui package
* `npm run watch-semantic` - watch for changes in semantic-ui build and rebuild it
