# Twitter Bot Action

**GitHub Action for running Twitter Bot**

This is a GitHub Action that runs your twitter bot periodically without services like Heroku, Render and AWS.

> _Only JavaScript Supported_

### Setup

1. Create a `config.js` file and export an object with the following.

   ```js
   module.exports = {
     consumer_key: process.env.CONSUMER_KEY,
     consumer_secret: process.env.CONSUMER_SECRET,
     access_token: process.env.ACCESS_TOKEN,
     access_token_secret: process.env.ACCESS_TOKEN_SECRET,
   };
   ```

1. Import `config.js` into your file and use for your bot configuration.

   ```js
   const config = require('./config');

   // Using Twitter library
   const Bot = new Twitter(config);
   // Using Twit library
   const Bot = new Twit(config);
   ```

1. Create a twitter app with your shared twitter account and store the credentials as `CONSUMER_KEY`,`CONSUMER_SECRET`,`ACCESS_TOKEN` and `ACCESS_TOKEN_SECRET` in your repository’s [secrets settings](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository).

1. **Add a workflow file** to your project (e.g. `.github/workflows/build.yml`) with this:

   ```yml
   name: Tweet

   on:
     workflow_dispatch:
     schedule:
       - cron: '*/30 * * * *' # Runs Bot every 30 minutes

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Use Node.js
           uses: actions/setup-node@v1
           with:
             node-version: '12.x'
         - name: Run Bot
           uses: dephraiim/twitter-bot-action@v1.2.1
           env:
             CONSUMER_KEY: ${{ secrets.CONSUMER_KEY }}
             CONSUMER_SECRET: ${{ secrets.CONSUMER_SECRET }}
             ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
             ACCESS_TOKEN_SECRET: ${{ secrets.ACCESS_TOKEN_SECRET }}
   ```

### Tweeting

Using the workflow above, GitHub will run your twitter bot every 30 minutes.

### Options

You can configure the action further with the following options:

- `package_root`: Directory where NPM/Yarn commands should be run (default: `"."`)
- `file_name`: Name of the main bot file (default: `"index.js"`)

### Development

Contributions and Suggestions are always welcome!

### LICENSE

[MIT](./license)
