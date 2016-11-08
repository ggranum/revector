import {spawn} from 'child_process';
import {existsSync, readdirSync, statSync} from 'fs';
import {task} from 'gulp';
import gulpRunSequence = require('run-sequence');
import path = require('path');
import minimist = require('minimist');

import {DIST_COMPONENTS_ROOT} from '../constants';

const argv = minimist(process.argv.slice(3));

const logMessageBuffer = (data: Buffer) => {
  console.log(`stdout: ${data.toString().split(/[\n\r]/g).join('\n        ')}`);
}

function _execUpdateVersion(componentName: string, bump: string): Promise<void> {
  const componentPath = path.join(DIST_COMPONENTS_ROOT, componentName);
  const stat = statSync(componentPath);

  if (!stat.isDirectory()) {
    return;
  }

  if (!existsSync(path.join(componentPath, 'package.json'))) {
    console.log(`Skipping ${componentPath} as it does not have a package.json.`);
    return;
  }

  process.chdir(componentPath);
  console.log(`Updating revision for '${componentName}' from '${componentPath}/'...`);
//npm version ${1:-$bump} -m "chore(release): %s" &&
  const command = 'npm';
  let args = ['--no-git-tag-version', 'version', bump, '-m', '"chore(release): %s' ];

  return new Promise((resolve, reject) => {
    console.log(`Executing "${command} ${args.join(' ')}"...`);
    let errMsg = ''
    const childProcess = spawn(command, args);
    childProcess.stdout.on('data', logMessageBuffer);
    childProcess.stderr.on('data', (data: Buffer) => {
      errMsg = errMsg + data.toString().split(/[\n\r]/g).join('\n        ');
    });

    childProcess.on('close', (code: number) => {
      if (code == 0) {
        resolve();
      } else {
        if(errMsg && errMsg.length){
          console.error('stderr:' + errMsg.replace('npm ERR!', ''));
        }
        reject(new Error(`Component ${componentName} did not update, status: ${code}.`));
      }
    });
  });
}

task(':versionBump', function(done: (err?: any) => void) {
  const bump = argv['bump'];
  const currentDir = process.cwd();

  if (!bump) {
    console.log("You can specify a bump level with --bump=[<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git].");
    console.log("Publishing using 'patch'.");
  } else {
    console.log(`Publishing using the ${bump} tag.`);
  }
  console.log('\n\n');

  // Build a promise chain that publish each component.
  readdirSync(DIST_COMPONENTS_ROOT)
    .reduce((prev, dirName) => prev.then(() => _execUpdateVersion(dirName, bump || 'patch')), Promise.resolve())
    .then(() => done())
    .catch((err: Error) => done(err))
    .then(() => process.chdir(currentDir));
});

task('versionBump', function(done: () => void) {
  gulpRunSequence(
    'build:release',
    ':versionBump',
    done
  );
});
