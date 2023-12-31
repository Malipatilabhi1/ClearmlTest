import {last} from 'lodash-es';

export const isHtmlPage = (url: string) => {
  if (!url) {
    return false;
  }
  const parsed = new URL(url);
  const ext = last(parsed.pathname.split('.'));
  return ['html', 'htm'].includes(ext);
};
