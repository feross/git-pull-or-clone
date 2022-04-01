interface Options {
    depth?: number
}

type Callback = (error?: Error) => void

type GitPullOrClone = {
    (url: string, outPath: string, opts?: Options | Callback, cb?: Callback): void
    async: (url: string, outPath: string, opts?: Options) => Promise<void>
}

const gitPullOrClone: GitPullOrClone

export = gitPullOrClone
