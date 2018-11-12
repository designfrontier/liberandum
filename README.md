# liberandum

liberandum is a system designed to get funds into the hands of people in at risk populations in need of evacuation
before natural disasters with an eye toward mid-term help until their insurance checks come in in the event that
they experience property damage. Basically evacuating is expensive ($2k avg for family of four). We are trying to
help people who can't afford it evacuate anyway.

## setup

0. Clone this repo
0. run `npm i` in the cloned directory
0. go up a directory
0. clone [gremlin-local](https://github.com/designfrontier/gremlin-local)
0. install [serverless](https://serverless.com/) `npm i -g serverless`
0. install [dory](https://github.com/FreedomBen/dory) `gem install dory`
0. install [ngrok](https://ngrok.com/)
0. run ngrok
0. configure twillio or get Daniel to configure it for you
0. run gremlin-local with docker-compose
0. get the tokens from Daniel for local development
0. in the liberandum directory run serverless `serverless offline start`

## The Stack™

This is a serverless app with much of it written in js. It runs a lambdas behind a web api gateway and uses 
neptune (or tinkerpop locally) for most of its data storage. 
