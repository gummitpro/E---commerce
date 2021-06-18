const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#13c2c2',
              '@border-radius-base': '8px',
              '@table-header-bg': '#ff7a45',
              '@table-header-color': '#fff2e8',
              '@menu-highlight-color': '#ff7a45',
              '@menu-item-active-bg': '#ffbb96',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};