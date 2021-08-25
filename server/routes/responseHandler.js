module.exports = ([statusCode, data], req, res, next) => {
  const responses = {
    200: { message: 'Success', data },
    201: { message: 'Resource Created', data },
    400: { message: 'Bad Request' },
    401: { message: 'Unauthorized' },
    403: { message: 'Forbidden' },
    409: { message: 'Conflict' },
    429: { message: 'Rate limit exceeded. Too many requests.' },
    500: { message: 'Internal Server Error' },
    503: { message: 'Backend Server at Capacity' },
    530: {
      message: 'Some unknown error has occurred. Please contact an administrator to report this issue.',
      contact: 'admin@example.com',
    },
  };
  const matchingStatusObject = (responses[statusCode] && { ...responses[statusCode], statusCode })
    || { ...responses[530], statusCode: 530 };
  if (statusCode === 204) return res.status(204).send();
  return res.status(matchingStatusObject.statusCode).json(matchingStatusObject);
};
