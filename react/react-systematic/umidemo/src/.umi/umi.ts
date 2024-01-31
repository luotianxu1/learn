// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import './core/polyfill';
import 'G:/learn/react/react-systematic/umidemo/src/global.less';
import 'G:/learn/react/react-systematic/umidemo/src/global.tsx';
import { renderClient } from 'G:/learn/react/react-systematic/umidemo/node_modules/.pnpm/@umijs+renderer-react@4.1.0_react-dom@18.1.0_react@18.1.0/node_modules/@umijs/renderer-react';
import { getRoutes } from './core/route';
import { createPluginManager } from './core/plugin';
import { createHistory } from './core/history';
import Loading from 'G:/learn/react/react-systematic/umidemo/src/loading.tsx';
import { ApplyPluginsType } from 'umi';


const publicPath = "/";
const runtimePublicPath = false;

async function render() {
  const pluginManager = createPluginManager();
  const { routes, routeComponents } = await getRoutes(pluginManager);

  // allow user to extend routes
  await pluginManager.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: {
      routes,
      routeComponents,
    },
  });

  const contextOpts = pluginManager.applyPlugins({
    key: 'modifyContextOpts',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });

  const basename = contextOpts.basename || '/';
  const historyType = contextOpts.historyType || 'hash';

  const history = createHistory({
    type: historyType,
    basename,
    ...contextOpts.historyOpts,
  });

  return (pluginManager.applyPlugins({
    key: 'render',
    type: ApplyPluginsType.compose,
    initialValue() {
      const context = {
        routes,
        routeComponents,
        pluginManager,
        rootElement: contextOpts.rootElement || document.getElementById('root'),
        loadingComponent: Loading,
        publicPath,
        runtimePublicPath,
        history,
        historyType,
        basename,
        callback: contextOpts.callback,
      };
      const modifiedContext = pluginManager.applyPlugins({
        key: 'modifyClientRenderOpts',
        type: ApplyPluginsType.modify,
        initialValue: context,
      });
      return renderClient(modifiedContext);
    },
  }))();
}


render();

window.g_umi = {
  version: '4.1.0',
};