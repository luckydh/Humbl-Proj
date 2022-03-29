export type VersionObject = {
  major: string;
  minor: string;
  build: string;
};

export function buildVersionString(testingVersionObject?: VersionObject): string {
  const majorVersionNumber = testingVersionObject?.major ?? process.env.REACT_APP_VERSION_MAJOR;
  const minorVersionNumber = testingVersionObject?.minor ?? process.env.REACT_APP_VERSION_MINOR;
  const buildVersionNumber = testingVersionObject?.build ?? process.env.REACT_APP_CI_BUILD_NUMBER;

  const majorMinorString = `${majorVersionNumber}.${minorVersionNumber}`;

  return buildVersionNumber ? `${majorMinorString}.${buildVersionNumber}` : majorMinorString;
}
