= ReVector Developer Docs

## Getting started

This project was bootstrapped from the combination of the Angular Material 2 and an Angular2-cli created project. The build system and file layout in particular are inherited from the [Angular Material2](https://github.com/angular/material2) project. 

To start hacking, perform a clone-install-build:

```bash
> git clone git@github.com:ggranum/revector.git
> cd revector
> npm install
> npm run serve

```



## Building

Most builds are just gulp commands aliased in the `package.json` `scripts` section.

See a list of all available gulp build tasks with the `gulp help` command.

### Dev Builds

```bash

# Just build:
> npm run build

# Build and serve with watch:
> npm run serve

```


### Release Builds

```bash
> npm run build.release

```


### Running unit tests

Unit test are not yet configured properly. It's the next milestone.

### Running end-to-end tests

@todo

## 


## Publishing

These steps have only been tested on OSX. It will probably work on any 'nix variant. Windows 10 with developer 'nix shell is a distinct 'maybe'. 

If you are cloning this project for your own devious purposes, see the **Using this project as a bootstrap** section, near the end.


### Do once (AKA 'setup steps')

1) Create a github access token [https://github.com/settings/tokens]() and save it in a file named `generate-changelog-token.local.txt`
1) Clean and build the project successfully



### Do every release

**Only perform a release from Master branch**

1) Pull from origin/master
1) Run 'gulp versionBump --bump=prerelease --alpha'
    * There's also a --beta flag, and --bump can take any of the semver values that npm version accepts (note, however, this is NOT using 'npm version' to do the update.) 
1) Verify the version number has been updated and that there are no uncommitted changes. Version numbers should be consistent across modules prior to release, except for those components still in alpha/beta.
1) Run 'generate-changelog.sh patch'
    * This should only modify and 'git add' the changelog file. You'll need to execute the steps that are printed ot the console. 
1) Verify change log generated and that there are no uncommitted changes. 
1) Run NPM publish steps, below.

The following require your npm user account credentials. Adding a local `.npmrc` file with `username=foo` and `email=foo@example.com` can make this a bit nicer.

```shell
 # sign out of your normal account
> npm logout
 # Sign in to npm account
> npm login
> Username: (revector)
> Password:
> Email: (this IS public) (geoff.granum@gmail.com)
> Logged in as revector on https://registry.npmjs.org/.
 
```


## Using this project as a bootstrap

As mentioned, this project build structure was cloned from the [Angular Material2](https://github.com/angular/material2). The clone was made prior to the Material team updating their build to deliver a single, monolithic NPM project, in line with the Angular2 project structure. 
 
If you wish to release multiple components, but develop in a single project, this project would certainly be a good place to start. You will want to take a look at [the procedures for 'scoped projects'](https://docs.npmjs.com/getting-started/scoped-packages) in NPM, and create a user account that has the name you want to use for the parent project. For example, our project paths here are like '@revector/scopedProjectNames', where 'revector' is the npm 'user' name.
   



