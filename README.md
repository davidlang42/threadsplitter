# ThreadSplitter
An add-on to split GMail threads.

GMail conversation threads are great, but sometimes stupid companies send you multiple emails about different things (eg. orders) with an IDENTICAL subject line. These get automatically made into threads because GMail doesn't know any better, so this add-on lets you split them up when required.

The add-on is hosted directly on Google Apps Script, free for anyone to use: (Google Workspace add-on url TBA)

But by all means, [buy me a coffee](https://ko-fi.com/davidlang42).

## Set up local repo
* Clone git repo: `git clone https://github.com/davidlang42/threadsplitter.git`
* Install [clasp](https://developers.google.com/apps-script/guides/clasp): `npm install @google/clasp -g`
* Login to clasp: `clasp login`
* Enter app directory: `cd app`
* Connect apps script project: `clasp clone [scriptId]`

## Deploying changes
### Use bash script
* Run from the root of the repo: `./deploy.sh`
  * Warning: This will overwrite any changes made directly on google apps scripts, but they will still exist in a reverted commit labelled 'possible lost changes'
### Execute manually
* Enter app directory: `cd app`
* Pull changes to local git repo: `git pull`
* Push changes to apps scripts: `clasp push`
  * Warning: This will overwrite any changes made directly on google apps scripts
* Find existing deployment: `clasp deployments`
  * Returns deployment id: `- AKfycby34UVLubaiUs-68eAwC1qD9Pl0_W05ZzghoSOeOZZ2 @58 - Test via Clasp`
* Create version & update existing deployment: `clasp deploy -i [deploymentId] -d "[description]"`
