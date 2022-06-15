export const orderStatusSolution = {
  apiName: '/decisions',
  status: [
    {
      type: 'partial',
      schemaErrors:
        'https://portal.forter.com/app/developer/integration-tools/all-requests/view/2022-06-09T175604833-e6d99079-v2-accounts-login#content-editor',
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'partial',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      txDetails:
        'https://portal.forter.com/app/dashboard/transactions/id/12768891521587251230/details',
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: null,
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: null,
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'partial',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'partial',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'partial',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: null,
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: null,
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'partial',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: null,
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'partial',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: null,
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'partial',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'partial',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: null,
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    },
    {
      type: 'success',
      insights: [],
      ts: '2022-06-13T13:07:25.500Z'
    }
  ],
  steps: [
    {
      name: 'Javascript snippet',
      info:
        "This involves copying and pasting a JavaScript snippet into all of your website's pages (including checkout). This sends Forter vital behavioral data, which is essential in making accurate fraud decisions."
    },
    {
      name: 'First Order API call (synthetic data)',
      info:
        'Try sending us the first order status request. Did you already check out our collaborative Google Spreadsheet with the full description of all request fields? click here: https://docs.google.com/spreadsheets/d/1-u_zhGk8kEDUKubVwg9I3RMkuKRekIEkdrrLoLtZFbU/edit#gid=1017125005 '
    },
    {
      name: 'Dynamic data order status request',
      info: 'send us a real data order status request'
    }
  ]
};

export const getGeneratedData = () => {
  const apis = [
    {
      title: 'Validation API',
      api: '/validation'
    },
    {
      title: 'Order Status API',
      api: '/order/:id'
    },
    {
      title: 'Claims API',
      api: '/claims'
    },
    {
      title: 'Login API',
      api: '/login'
    },
    {
      title: 'JS Snippet',
      api: '/history'
    },
    {
      title: 'Historical Data',
      api: '/history'
    }
  ];
  for (let api of apis) {
    api.status = Array.from(Array(30).keys()).map((x) => ({
      type: [
        'success',
        'success',
        'success',
        'success',
        null,
        'partial',
        'partial'
      ][Math.floor(Math.random() * 7)],
      insights: [],
      ts: new Date()
    }));
  }
  return apis;
};
