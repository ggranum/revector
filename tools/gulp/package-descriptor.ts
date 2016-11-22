const SemVer = require('semver');


export interface NpmRepository {
  type: string
  url: string
}

export interface NpmBugs {
  url: string
}

export interface PackageDescriptor {
  filePath?:string
  name: string
  version: string
  keywords: string[]
  license: string
  homepage: string
  description: string
  main: string
  typings: string
  bugs?: NpmBugs
  repository?: NpmRepository
  dependencies?: {[key: string]: string }
  devDependencies?: {[key: string]: string }
  peerDependencies: {[key: string]: string }
}

const subPackageDefinition: PackageDescriptor = {
  name: "@revector/common",
  version: "0.0.1-beta.5",
  description: "Utility classes and shared functionality for the Revector components.",
  main: "./index.js",
  typings: "./index.d.ts",
  keywords: [],
  license: "MIT",
  homepage: "https://github.com/ggranum/revector/src/lib/util/common",
  peerDependencies: {}

}

const rootPackageDefinition: PackageDescriptor = {
  name: "@revector/common",
  version: "0.0.1-beta.5",
  description: "Utility classes and shared functionality for the Revector components.",
  main: "./index.js",
  typings: "./index.d.ts",
  repository: {
    type: "git",
    url: "https://github.com/ggranum/revector.git"
  },
  keywords: [],
  license: "MIT",
  bugs: {
    url: "https://github.com/ggranum/revector/issues"
  },
  homepage: "https://github.com/ggranum/revector",
  dependencies: {},
  devDependencies: {},
  peerDependencies: {}
}


export class NpmPackageMaker {

  private fullModuleDefinitions: {[key:string]:PackageDescriptor} = {}
  private globalDependencies:{[key:string]:string};
  private previousGlobalVersion:string

  constructor(private globalPackageDefinition: PackageDescriptor,
              private moduleDefinitions:{ [key:string]:PackageDescriptor},
              private bump: string,
              private qualifier: string) {
    this.previousGlobalVersion = this.globalPackageDefinition.version
    this.globalDependencies = this.joinMaps(
      this.globalPackageDefinition.dependencies,
      this.globalPackageDefinition.devDependencies,
      this.globalPackageDefinition.peerDependencies
    )
  }

  updateModules():{[key:string]:PackageDescriptor}{
    this.globalPackageDefinition.version = SemVer.inc(this.globalPackageDefinition.version, this.bump, this.qualifier)
    Object.keys(this.moduleDefinitions).forEach((key:string)=>{
      this.fullModuleDefinitions[key] = this.getFullDefinition(this.moduleDefinitions[key])
    })
    Object.keys(this.fullModuleDefinitions).forEach((key:string)=>{
      let module = this.fullModuleDefinitions[key]
      module.peerDependencies = this.getUpdatedPeerDependencies(module);
    })
    return this.fullModuleDefinitions
  }


  private getFullDefinition(module: PackageDescriptor): PackageDescriptor {
    let newVersion = SemVer.inc(module.version || this.previousGlobalVersion, this.bump, this.qualifier)
    let fullDefinition = Object.assign({}, this.globalPackageDefinition, module, {
      version: newVersion
    })
    fullDefinition.keywords = module.keywords.concat(this.globalPackageDefinition.keywords)
    return fullDefinition
  }

  private getUpdatedPeerDependencies(module: PackageDescriptor):{[key:string]:string} {
    let peers: {[key: string]: string} = {}
    Object.keys(module.peerDependencies).forEach((key: string) => {
      let peerVersion = this.globalDependencies[key]
      if (!peerVersion && this.fullModuleDefinitions[key]) {
        peerVersion =  this.fullModuleDefinitions[key].version
      }
      if (!peerVersion) {
        throw new Error(`Dependency for '${key}' not defined in the global project: cannot determine which version to use for module '${module.name} `)
      }
      peers[key] = peerVersion
    })
    return peers;
  }


  joinMaps(...maps: {[key: string]: string}[]): {[key: string]: string} {
    // Could use varArgs version of assign, but then we couldn't error check
    let output: {[key: string]: string} = Object.assign({}, maps[0])

    for (let i = 1; i < maps.length; i++) {
      let aMap = maps[i];
      Object.keys(aMap).forEach((key: string) => {
        if (output[key]) {
          throw new Error(`Collision while joining maps: '${key}' used multiple times.`)
        }
        output[key] = aMap[key]
      })
    }
    return output
  }
}
