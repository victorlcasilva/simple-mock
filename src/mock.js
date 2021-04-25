const mockedRequests = [
  {
    req: {
      method: 'get',
      path: '/test'
    },
    res: {
      body: {
        message: 'Hello World!'
      },
      headers: {
        mock: 'enabled'
      }
    }
  },
  {
    req: {
      method: 'get',
      path: '/test?name=you'
    },
    res: {
      body: {
        message: 'Hello You!'
      },
      headers: {
        mock: 'enabled'
      }
    }
  }
]
;

function getMockResponse (method, path) {
  const mocked = mockedRequests.find(m =>
    m.req.method.toLowerCase() === method.toLowerCase() &&
    m.req.path.toLowerCase() === path.toLowerCase()
  );
  if (mocked) {
    return mocked.res;
  }
}

function getMock (req) {
  if (!req || !req.method || !req.path) {
    return;
  }
  let fullPath = req.path;
  if (req.originalUrl) {
    fullPath = req.originalUrl;
  }
  const mocked = getMockResponse(req.method, fullPath);
  if (mocked) {
    return mocked;
  }
}

module.exports = getMock;
