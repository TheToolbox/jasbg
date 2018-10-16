/*
jasbg.js: turns blog-format folder into 
arguments:
    --serve [port]: Run a local server, which renders pages dynamically (to be used for)
*/
import * as fs from 'fs';

process.on('uncaughtException', error => {
    console.error(error.message);
    return -1;
});

const options = getOptions();
console.log('Using options:', options);

function render() {
    // Find Files
    const posts = fileOps.findFiles(options.cwd, {
        dirs: { include: /posts?/i, exclude: /drafts?/i },
        files: { include: /.*\.md/i, exclude: /^__.*/i }
    });
    console.log('Found posts:', posts);
    const scripts = fileOps.findFiles(options.cwd, {
        dirs: { include: /(js)|(scripts?)/i, exclude: /nothing/i },
        files: { include: /.*\.js/i, exclude: /^__.*/i }
    });
    console.log('Found scripts:', scripts);
    const stylesheets = fileOps.findFiles(options.cwd, {
        dirs: { include: /(css)|(styles?)|(stylesheets?)/i, exclude: /nothing/i },
        files: { include: /.*\.css/i, exclude: /^__.*/i }
    });
    console.log('Found stylesheets:', stylesheets);

    //render posts to html

    //render category pages
    //render index page
    //render search index maybe
}


// Main Sequence Functions
interface Options {
    cwd: string,
    serve?: number,
}
function getOptions(): Options {
    const options: Options = {
        cwd: process.cwd()
    };
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const nextArgs = args.slice(i + 1);
        switch (arg) {
            case "--serve":
                const port = parseInt(nextArgs[0], 10) || 0;
                i++; //consume next arg
                if (port < 1 || port > 65535) {
                    throw new Error(`Port ${nextArgs[0]} is invalid.`)
                }
                options['serve'] = port;
                continue;
            default:
                throw new Error(`Unknown argument "${arg}" supplied`);
        }
    }
    return options;
}

/*
* module to house findFiles
*/
module fileOps {



    /*
     * Finds all files that follow certain naming conventions, within a single level of directories which also follow specified naming conventions
     * 
     */
    export function findFiles(root: string, options: FindFilesOptions): string[] {
        let files: string[] = [];
        const dirs = getDirsIn(root, {
            include: options.dirs.include,
            exclude: options.dirs.exclude
        });
        for (const dir of dirs) {
            files = files.concat(
                getFilesIn(dir, {
                    include: options.files.include,
                    exclude: options.files.exclude
                })
            );
        }
        return files;
    }

    // Util Functions

    function getDirsIn(parent: string, { include, exclude }: includeExclude) {
        return getFilesOrDirsIn(parent, { include, exclude }, true);
    }

    function getFilesIn(parent: string, { include, exclude }: includeExclude) {
        return getFilesOrDirsIn(parent, { include, exclude }, false);
    }

    function getFilesOrDirsIn(parent: string, { include, exclude }: includeExclude, mustBeDir: boolean) {
        return fs.readdirSync(parent)
            .map(fileName => parent + '/' + fileName)
            .filter(fileName =>
                mustBeDir === fs.statSync(fileName).isDirectory()
                && fileName.match(include)
                && !fileName.match(exclude)
            );
    }

    // Interfaces
    interface FindFilesOptions {
        dirs: includeExclude,
        files: includeExclude,
    }

    interface includeExclude {
        include: RegExp | string,
        exclude: RegExp | string,
    }
}

module Markdown {
    export function render(string: string) {
        return "";
    }
}