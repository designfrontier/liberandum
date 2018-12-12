# liberandum

liberandum is a system designed to get funds into the hands of people in at risk populations in need of evacuation
before natural disasters with an eye toward mid-term help until their insurance checks come in in the event that
they experience property damage. Basically evacuating is expensive (\$2k avg for family of four). We are trying to
help people who can't afford it evacuate anyway.

## setup

0. Clone this repo
1. run `npm i` in the cloned directory
2. go up a directory
3. clone [gremlin-local](https://github.com/designfrontier/gremlin-local)
4. install [serverless](https://serverless.com/) `npm i -g serverless`
5. install [dory](https://github.com/FreedomBen/dory) `gem install dory`
6. install [ngrok](https://ngrok.com/)
7. run ngrok
8. configure twillio or get Daniel to configure it for you
9. run gremlin-local with docker-compose
10. get the tokens from Daniel for local development
11. in the liberandum directory run serverless `serverless offline start`

## The Stack™

This is a serverless app with much of it written in js. It runs a lambdas behind a web api gateway and uses
neptune (or tinkerpop locally) for most of its data storage.

## RUNNING THE PROJECT

With the setup steps completed... run `serverless offline start`, or
`sls offline start`. This will start up the local api gateway which you can visit
by going to `http://localhost:4201`. That is truly it...

## LOCAL DEVELOPMENT

The cleanest path is to install eslint and flow plugins for your code editor. That
makes it easy to stay on top of errors as they arrise in development.

For tests you can run them all with `npm test` (which will also run eslint and
flow), or you can run a watched version with `npm run test:watch` that will watch
for file changes and run the related tests.

If you need a way to run eslint and flow with a watch option outside of your code
editor then that's something we can add.

For ease of debugging there is also the lovely `npm run local` script that provides
`ndb` wrapped serverless offline. That way you get a chrome-debugger in place for
quick and easy inline debugging!
