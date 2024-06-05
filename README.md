# Hearthstone Deck validator for Custom Rules

A web application to validate Hearthstone decks under custom rules set by the users. It facilitates tournament with custom rules and players to challenge others under rules they can agree, enabling a different deckbuilding experience to players.

## Technologies

Frontend with React and tests with jest.

## Running the project in DEV mode

### Requirements

- Node JS

### Clone the project

    git clone https://github.com/mateuscechetto/custom-hs-deck-validator.git

### Add the Card collection json to resources folder

Create resources folder

    mkdir src/resources

Inside that folder, create a file named `cards.collectible.json` and add the content of [hearthstoneJSON](https://hearthstonejson.com/) collection to it: https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json.

### Start the app

    npm install
    npm run dev

## Contributing

This is an open-source project. We welcome feedback, pull requests, and bug reports from anyone.

The [issue tracker](https://github.com/mateuscechetto/custom-hs-deck-validator/issues) is the best place for creating bug reports and features requests. Be sure to check whether your issue or idea has already been submitted!

If there's a change you'd like to contribute, follow the README to get started with running the project locally. Before contributing any code, make sure you've had a chance to understand the codebase. Any doubts feel free to DM me on discord: molino.

Create a new branch for your contributions, with a clear name that summarizes the feature change. Try to keep a single branch focused on one change, whether a feature or a bug fix.

Make sure that your commit messages are meaningful and clearly indicate what changes were made at each stage to assist with review when the branch enters PR. Before submitting a PR, make sure your changes pass all relevant tests.
