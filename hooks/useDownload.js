import { useEffect, useState } from 'react';
import config from '@/data/config.json';

const APPCAST_BASE = 'https://swift-craft-launcher-api.pages.dev/api/update';
const GITHUB_DOWNLOAD = `${config.links.githubRepo}/releases/download`;
const DOWNLOAD_PROXY = 'https://swift-craft-launcher-api.pages.dev/api/download';

const toProxyUrl = (url) => url.replace(GITHUB_DOWNLOAD, DOWNLOAD_PROXY);

const parseAppcast = (xmlText) => {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  const item = doc.querySelector('item');

  if (!item) return null;

  return {
    version:
      item.querySelector('sparkle\\:shortVersionString, shortVersionString')
        ?.textContent || '',
    minimumSystemVersion:
      item.querySelector('sparkle\\:minimumSystemVersion, minimumSystemVersion')
        ?.textContent || '',
    url: toProxyUrl(item.querySelector('enclosure')?.getAttribute('url') || ''),
  };
};

const fetchAppcast = async (arch) => {
  const filename = arch === 'arm' ? 'appcast-arm64.xml' : 'appcast-x86_64.xml';
  const response = await fetch(`${APPCAST_BASE}/${filename}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Appcast request failed: ${response.status}`);
  }

  return parseAppcast(await response.text());
};

const getWebGLRenderer = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) return '';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);
  } catch {
    return '';
  }
};

const detectArch = async () => {
  if (typeof navigator === 'undefined') return 'arm';

  if (navigator.userAgentData?.getHighEntropyValues) {
    try {
      const { architecture } = await navigator.userAgentData.getHighEntropyValues([
        'architecture',
      ]);

      if (architecture === 'arm') return 'arm';
      if (architecture === 'x86') return 'intel';
    } catch {
      // Fall through to the WebGL renderer check.
    }
  }

  const renderer = getWebGLRenderer();

  if (/apple\s*(m\d|gpu)/i.test(renderer)) return 'arm';
  if (/intel|amd|radeon/i.test(renderer)) return 'intel';

  // Most Macs in use today are Apple Silicon. If the browser hides the
  // architecture, prefer the arm64 build.
  return 'arm';
};

let downloadPromise = null;

const loadDownload = () => {
  if (!downloadPromise) {
    downloadPromise = (async () => {
      const arch = await detectArch();
      const appcast = await fetchAppcast(arch);

      if (!appcast?.url) throw new Error('Appcast has no download URL');

      return { arch, ...appcast };
    })().catch((error) => {
      downloadPromise = null;
      throw error;
    });
  }

  return downloadPromise;
};

const useDownload = () => {
  const [download, setDownload] = useState({
    arch: 'arm',
    downloadUrl: config.links.latestRelease,
    version: '',
    minimumSystemVersion: '',
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    loadDownload()
      .then((result) => {
        if (cancelled) return;

        setDownload({
          arch: result.arch,
          downloadUrl: result.url,
          version: result.version,
          minimumSystemVersion: result.minimumSystemVersion,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setDownload((current) => ({
            ...current,
            loading: false,
            error: true,
          }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return download;
};

export default useDownload;
