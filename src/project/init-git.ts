import execa from 'execa';

export const initGit = async options => {
  const response = await execa('git', ['init'], { cwd: options.targetDirectory });

  if (response.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }
};
