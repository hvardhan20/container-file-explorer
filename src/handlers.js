import Moment from 'moment'

exports.handleCreateFolder = (key) => {
    this.setState(state => {
        state.files = state.files.concat([{
            key: key,
        }])
        return state
    })
}

let createfiles = (files, prefix) => {
    this.setState(state => {
        const newFiles = files.map((file) => {
            let newKey = prefix
            if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
                newKey += '/'
            }
            newKey += file.name
            return {
                key: newKey,
                size: file.size,
                modified: +Moment(),
            }
        })

        const uniqueNewFiles = []
        newFiles.map((newFile) => {
            let exists = false
            state.files.map((existingFile) => {
                if (existingFile.key === newFile.key) {
                    exists = true
                }
            })
            if (!exists) {
                uniqueNewFiles.push(newFile)
            }
        })
        state.files = state.files.concat(uniqueNewFiles)
        return state
    })
}
exports.handleCreateFiles = createfiles;

exports.handleRenameFolder = (oldKey, newKey) => {
    this.setState(state => {
        const newFiles = []
        state.files.map((file) => {
            if (file.key.substr(0, oldKey.length) === oldKey) {
                newFiles.push({
                    ...file,
                    key: file.key.replace(oldKey, newKey),
                    modified: +Moment(),
                })
            } else {
                newFiles.push(file)
            }
        })
        state.files = newFiles
        return state
    })
}
exports.handleRenameFile = (oldKey, newKey) => {
    this.setState(state => {
        const newFiles = []
        state.files.map((file) => {
            if (file.key === oldKey) {
                newFiles.push({
                    ...file,
                    key: newKey,
                    modified: +Moment(),
                })
            } else {
                newFiles.push(file)
            }
        })
        state.files = newFiles
        return state
    })
}
exports.handleDeleteFolder = (folderKey) => {
    this.setState(state => {
        const newFiles = []
        state.files.map((file) => {
            if (file.key.substr(0, folderKey.length) !== folderKey) {
                newFiles.push(file)
            }
        })
        state.files = newFiles
        return state
    })
}
exports.handleDeleteFile = (fileKey) => {
    this.setState(state => {
        const newFiles = []
        state.files.map((file) => {
            if (file.key !== fileKey) {
                newFiles.push(file)
            }
        })
        state.files = newFiles
        return state
    })
}

// let handleCreateFolder = (key) => {
//     setFiles(state => {
//         state.files = state.files.concat([{
//             key: key,
//         }])
//         return state
//     })
// }
// let handleCreateFiles = (files, prefix) => {
//     setFiles(state => {
//         const newFiles = files.map((file) => {
//             let newKey = prefix
//             if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
//                 newKey += '/'
//             }
//             newKey += file.name
//             return {
//                 key: newKey,
//                 size: file.size,
//                 modified: +Moment(),
//             }
//         })
//
//         const uniqueNewFiles = []
//         newFiles.map((newFile) => {
//             let exists = false
//             state.files.map((existingFile) => {
//                 if (existingFile.key === newFile.key) {
//                     exists = true
//                 }
//             })
//             if (!exists) {
//                 uniqueNewFiles.push(newFile)
//             }
//         })
//         state.files = state.files.concat(uniqueNewFiles)
//         return state
//     })
// }
// let handleRenameFolder = (oldKey, newKey) => {
//     setFiles(state => {
//         const newFiles = []
//         state.files.map((file) => {
//             if (file.key.substr(0, oldKey.length) === oldKey) {
//                 newFiles.push({
//                     ...file,
//                     key: file.key.replace(oldKey, newKey),
//                     modified: +Moment(),
//                 })
//             } else {
//                 newFiles.push(file)
//             }
//         })
//         state.files = newFiles
//         return state
//     })
// }
// let handleRenameFile = (oldKey, newKey) => {
//     setFiles(state => {
//         const newFiles = []
//         state.files.map((file) => {
//             if (file.key === oldKey) {
//                 newFiles.push({
//                     ...file,
//                     key: newKey,
//                     modified: +Moment(),
//                 })
//             } else {
//                 newFiles.push(file)
//             }
//         })
//         state.files = newFiles
//         return state
//     })
// }
// let handleDeleteFolder = (folderKey) => {
//     setFiles(state => {
//         const newFiles = []
//         state.files.map((file) => {
//             if (file.key.substr(0, folderKey.length) !== folderKey) {
//                 newFiles.push(file)
//             }
//         })
//         state.files = newFiles
//         return state
//     })
// }
// let handleDeleteFile = (fileKey) => {
//     setFiles(state => {
//         const newFiles = []
//         state.files.map((file) => {
//             if (file.key !== fileKey) {
//                 newFiles.push(file)
//             }
//         })
//         state.files = newFiles
//         return state
//     })
// }