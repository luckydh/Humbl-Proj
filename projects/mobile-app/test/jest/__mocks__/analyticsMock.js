module.exports = {
  analytics: {
    ...analytics,
    track: jest.fn(),
  },
};
