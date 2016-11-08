= ReVector Developer Docs

== Getting started


== Building

@todo

== Publishing

1) Commit all changes
1) Run 'gulp versionBump --bump=patch'
1) Verify the version number has been updated and that there are no uncommitted changes. 
1) Run 'generate-changelog.sh patch'
1) Verify change log generated and that there are no uncommitted changes. 
1) Run NPM publish steps, below.

Requires the npm 'revector' user account credentials.

```shell
 // sign out of your normal account
> npm logout
  // Sign in to @revector account
> npm login
> Username: (revector)
> Password:
> Email: (this IS public) (geoff.granum@gmail.com)
> Logged in as revector on https://registry.npmjs.org/.
> 
  // 

 
```

=== Build

@todo

=== Running unit tests

@todo

=== Running end-to-end tests

@todo

