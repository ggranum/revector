import {existsSync, readdirSync, statSync} from 'fs';
import {task} from 'gulp';

const semvar = require('semver');
const jsonFile = require('jsonfile');

import gulpRunSequence = require('run-sequence');
import path = require('path');
import minimist = require('minimist');

import {PROJECT_ROOT, SOURCE_ROOT} from '../constants';

const argv = minimist(process.argv.slice(3));

const pathIsComponentDir = function (filePath: string) {
  let file = path.join(filePath, 'package.json')
  return existsSync(file)
}

const allDirectories = function (dirPath: string): string[] {
  let dirs: string[] = []
  let childPaths: string[] = readdirSync(dirPath)
  childPaths.forEach((childName) => {
    if (childName != 'node_modules') {
      const childPath = path.join(dirPath, childName);
      const stat = statSync(childPath);
      if (stat.isDirectory()) {
        dirs.push(childPath)
        dirs = dirs.concat(allDirectories(childPath))
      }
    }
  })
  return dirs
}

const collectComponents = function (dirPath: string): string[] {
  let componentPaths: string[] = []
  let paths: string[] = allDirectories(dirPath)
  paths.forEach((dirPath) => {
    if (pathIsComponentDir(dirPath)) {
      componentPaths.push(dirPath)
    }
  })
  return componentPaths
}

const versionBumpPaths = function (paths: string[], bump: any, qualifier: string|string) {
// Build a promise chain that updates each component's version.
  paths.forEach((componentPath: string) => {
    _execUpdateVersion(componentPath, bump || 'patch', qualifier)
  })
};


function _execUpdateVersion(componentPath: string, bump: string, qualifier: string) {

  let file = path.join(componentPath, 'package.json')
  let pkgJson = jsonFile.readFileSync(file)
  let semv = semvar.inc(pkgJson.version, bump, qualifier)

  console.log(`Updating '${componentPath}' \tfrom ${pkgJson.version} to: ${semv}`);
  pkgJson.version = semv

  jsonFile.writeFileSync(file, pkgJson, {spaces: 2})

}


task(':versionBump', function (done: (err?: any) => void) {
  const bump = argv['bump'];
  const beta = argv['beta'];
  const alpha = argv['alpha'];
  const qualifier = alpha ? 'alpha' : beta ? 'beta' : null

  if (!bump) {
    console.log("You can specify a bump level with --bump=[<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git].");
    console.log("Publishing using 'patch'.");
  } else {
    console.log(`Publishing using the ${bump} tag.`);
  }

  if (!beta && !alpha) {
    console.log("You can increment a pre-release qualifier with '--bump=prerelease --[alpha|beta]'.");
  }
  let paths: string[] = collectComponents(SOURCE_ROOT)
  paths.push(PROJECT_ROOT)
  paths.sort()
  versionBumpPaths(paths, bump, qualifier);
  done()
});

task('versionBump', function (done: () => void) {
  gulpRunSequence(
    ':versionBump',
    done
  );
});
