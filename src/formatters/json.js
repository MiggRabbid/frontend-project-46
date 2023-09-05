// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import path from 'node:path';

export default (diffTree, filepath1, filepath2) => {
  const nameFile1 = filepath1.split('/').at(-1);
  const nameFile2 = filepath2.split('/').at(-1);

  let countRemote = 0;
  let countAdded = 0;
  let countChanged = 0;
  let countUnchanged = 0;

  const iter = (tree) => {
    const keysFromFiles = Object.keys(tree).sort();

    keysFromFiles.forEach((key) => {
      const { status } = tree[key];
      if (status === 'remote') {
        countRemote += 1;
      } else if (status === 'added') {
        countAdded += 1;
      } else if (status === 'changed') {
        countChanged += 1;
      } else if (status === 'unchanged') {
        if (_.has(tree[key], 'value') && _.isObject(tree[key].value)) {
          iter(tree[key].value);
        } else {
          countUnchanged += 1;
        }
      }
    });
  };

  iter(diffTree);

  const resaltJson = [{
    file1: [{ name: nameFile1 }, { extName: path.extname(filepath1) }, { path: filepath1 }],
    file2: [{ name: nameFile2 }, { extName: path.extname(filepath2) }, { path: filepath2 }],
    changedLines: [{ remote: countRemote },
      { added: countAdded },
      { changed: countChanged },
      { unchanged: countUnchanged }],
    diffTree: [_.cloneDeep(diffTree)],
  }];

  return JSON.stringify(resaltJson);
};
