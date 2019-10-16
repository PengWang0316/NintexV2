module.exports = {
  preset: 'ts-jest',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // For some test need jsdom
  /**
 * @jest-environment jsdom
 */
  // testEnvironment: 'jest-environment-jsdom-global',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '__tests__/.*.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/app/tools/setupTests.ts'],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    // '@testing-library/jest-dom/extend-expect',
    // ... other setup files ...
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/app/tools/assetsTransformer.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: ['app/components/**/*.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/libs/'],
};
